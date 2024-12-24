package ru.aenetwork.agents.seller.behaviour;

import jade.core.behaviours.OneShotBehaviour;
import ru.aenetwork.agents.seller.SellerAgent;

/**
 * SuccessBehaviour provide agent behaviour after success
 */
public class SuccessBehaviour extends OneShotBehaviour {
    private final SellerAgent agent;
    public SuccessBehaviour(SellerAgent agent) {
        this.agent = agent;
    }

    @Override
    public void action() {
        this.agent.logger.fine("success");
    }
}
