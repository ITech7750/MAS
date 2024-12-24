package ru.aenetwork.agents.buyer.behaviour;

import jade.core.behaviours.OneShotBehaviour;
import ru.aenetwork.agents.buyer.BuyerAgent;

/**
 * StartBehaviour provides agent behaviour on start
 */
public class StartBehaviour extends OneShotBehaviour {
    private final BuyerAgent agent;

    /**
     * Constructor of StartBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public StartBehaviour(BuyerAgent agent) {
        this.agent = agent;
    }

    /**
     * Overrides action method of behaviour
     */
    @Override
    public void action() {
        this.agent.logger.info("starting");
    }
}
