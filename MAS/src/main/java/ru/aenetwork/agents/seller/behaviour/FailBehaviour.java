package ru.aenetwork.agents.seller.behaviour;

import jade.core.behaviours.OneShotBehaviour;
import ru.aenetwork.agents.seller.SellerAgent;

/**
 * FailBehaviour provide agent behavior after fail in first round
 *
 * @author beldmian
 */
public class FailBehaviour extends OneShotBehaviour {
    private final SellerAgent agent;

    /**
     * Constructor of FailBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public FailBehaviour(SellerAgent agent) {
        this.agent = agent;
    }

    /**
     * action overriding existing method action of OneShotBehaviour
     */
    @Override
    public void action() {
        this.agent.logger.info("failed running");
    }
}
