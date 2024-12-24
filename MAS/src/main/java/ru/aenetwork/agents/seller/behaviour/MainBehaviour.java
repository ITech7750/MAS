package ru.aenetwork.agents.seller.behaviour;

import jade.core.behaviours.FSMBehaviour;
import ru.aenetwork.agents.seller.SellerAgent;

/**
 * MainBehaviour provide main behaviour of Seller agent
 *
 * @author beldmian
 * @see SellerAgent
 */
public class MainBehaviour extends FSMBehaviour {
    private static final String START = "start";
    private static final String FIRST_ROUND = "first";
    private static final String SECOND_ROUND = "second";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String END = "end";

    /**
     * Constructor of MainBehaviour
     *
     * @param agent Provides agent for that behaviour is used
     */
    public MainBehaviour(SellerAgent agent) {
        registerFirstState(new StartBehaviour(agent), START);
        registerState(new FirstRoundBehaviour(agent), FIRST_ROUND);
        registerState(new SecondRoundBehaviour(agent), SECOND_ROUND);
        registerState(new SuccessBehaviour(agent), SUCCESS);
        registerState(new FailBehaviour(agent), FAIL);
        registerLastState(new EndBehaviour(agent), END);

        registerDefaultTransition(START, FIRST_ROUND);
        registerTransition(FIRST_ROUND, SUCCESS, 0);
        registerTransition(FIRST_ROUND, FAIL, 1);
        registerDefaultTransition(FAIL, SECOND_ROUND);
        registerTransition(SECOND_ROUND, SUCCESS, 0);
        registerTransition(SECOND_ROUND, END, 1);
        registerDefaultTransition(SUCCESS, END);
    }
}
