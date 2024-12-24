package ru.aenetwork.agents.buyer.behaviour;

import jade.core.behaviours.OneShotBehaviour;
import ru.aenetwork.agents.buyer.BuyerAgent;

/**
 * StartBehaviour provides agent behaviour after success
 */
public class SuccessBehaviour extends OneShotBehaviour {
    private final BuyerAgent agent;

    /**
     * Constructor of SuccessBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public SuccessBehaviour(BuyerAgent agent) {
        this.agent = agent;
    }

    /**
     * Overrides action method of behaviour
     */
    @Override
    public void action() {
        this.agent.logger.fine("success");
    }
}
