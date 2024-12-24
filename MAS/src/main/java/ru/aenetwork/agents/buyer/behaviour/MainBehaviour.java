package ru.aenetwork.agents.buyer.behaviour;

import jade.core.behaviours.FSMBehaviour;
import ru.aenetwork.agents.buyer.BuyerAgent;

/**
 * MainBehaviour provide complex behaviour for BuyerAgent
 */
public class MainBehaviour extends FSMBehaviour {
    private static final String START = "start";
    private static final String FIRST_ROUND = "first";
    private static final String SECOND_ROUND = "second";
    private static final String FINAL_ROUND = "final";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String END = "end";

    /**
     * Constructor of MainBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public MainBehaviour(BuyerAgent agent) {
        registerFirstState(new StartBehaviour(agent), START);
        registerState(new FirstRoundBehaviour(agent), FIRST_ROUND);
        registerState(new SecondRoundBehaviour(agent), SECOND_ROUND);
        registerState(new FinalRoundBehaviour(agent), FINAL_ROUND);
        registerState(new SuccessBehaviour(agent), SUCCESS);
        registerState(new FailBehaviour(agent), FAIL);
        registerLastState(new EndBehaviour(agent), END);

        registerDefaultTransition(START, FIRST_ROUND);
        registerTransition(FIRST_ROUND, SUCCESS, 0);
        registerTransition(FIRST_ROUND, FAIL, 1);
        registerDefaultTransition(FAIL, SECOND_ROUND);
        registerTransition(SECOND_ROUND, SUCCESS, 0);
        registerTransition(SECOND_ROUND, FINAL_ROUND, 1);
        registerDefaultTransition(FINAL_ROUND, SUCCESS);
        registerDefaultTransition(SUCCESS, END);
    }

}
