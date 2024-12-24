package ru.aenetwork.agents.seller.behaviour;

import jade.core.behaviours.OneShotBehaviour;
import ru.aenetwork.agents.seller.SellerAgent;

/**
 * StartBehaviour provides agent behaviour on start
 */
public class StartBehaviour extends OneShotBehaviour {
    private final SellerAgent agent;

    /**
     * Constructor of StartBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public StartBehaviour(SellerAgent agent) {
        this.agent = agent;
    }

    /**
     * action overrides agent action
     */
    @Override
    public void action() {
        this.agent.logger.info("starting agent");
    }
}
