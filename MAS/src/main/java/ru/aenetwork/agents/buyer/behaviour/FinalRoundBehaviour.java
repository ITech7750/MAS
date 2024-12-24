package ru.aenetwork.agents.buyer.behaviour;

import jade.core.behaviours.OneShotBehaviour;
import ru.aenetwork.agents.buyer.BuyerAgent;

/**
 * FinalRoundBehaviour provide agent behaviour in final round
 */
public class FinalRoundBehaviour extends OneShotBehaviour {
    private final BuyerAgent agent;

    /**
     * Constructor of FinalRoundBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public FinalRoundBehaviour(BuyerAgent agent) {
        this.agent = agent;
    }

    /**
     * overriding basic action of behaviour
     */
    @Override
    public void action() {
        this.agent.logger.info("contracts with central company");
        this.agent.choose = "central";
    }
}
