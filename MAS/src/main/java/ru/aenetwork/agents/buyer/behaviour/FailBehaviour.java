package ru.aenetwork.agents.buyer.behaviour;

import jade.core.behaviours.OneShotBehaviour;
import ru.aenetwork.agents.buyer.BuyerAgent;

/**
 * FailBehaviour provide agent behaviour if agent fails
 *

 */
public class FailBehaviour extends OneShotBehaviour {
    private final BuyerAgent agent;

    /**
     * Constructor of FailBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public FailBehaviour(BuyerAgent agent) {
        this.agent = agent;
    }

    /**
     * overrides basic action of behaviour
     */
    @Override
    public void action() {
        this.agent.logger.info("failed");
    }
}
