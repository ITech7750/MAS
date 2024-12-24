package ru.aenetwork.agents.buyer;

import com.google.gson.Gson;
import jade.core.AID;
import jade.core.Agent;
import jade.domain.DFService;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.domain.FIPAException;
import ru.aenetwork.agents.buyer.behaviour.MainBehaviour;
import ru.aenetwork.agents.info.Buyer;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * BuyerAgent is a JADE agent for buyer
 *
 * @author beldmian
 */
public class BuyerAgent extends Agent {
    public Buyer buyer;
    public ArrayList<AID> sellers;
    public Gson gson;
    public String choose;
    public Logger logger;

    /**
     * Overriding existing setup method from Agent class
     */
    protected void setup() {
        logger = Logger.getLogger(getLocalName());
        logger.setLevel(Level.FINE);
        register();
        init();
        addBehaviour(new MainBehaviour(this));
        logger.info("settled");
    }

    /**
     * Register provide Agent registration on df service
     */
    private void register() {
        logger.info("registering");

        DFAgentDescription dfd = new DFAgentDescription();
        dfd.setName(getAID());
        ServiceDescription sd = new ServiceDescription();
        sd.setType("buyer");
        sd.setName(this.getLocalName());
        dfd.addServices(sd);
        try {
            DFService.register(this, dfd);
        }
        catch (FIPAException fe) {
            fe.printStackTrace();
        }
    }

    /**
     * init method provide initialization for Agent
     */
    private void init() {
        logger.info("initialize");

        Object[] args = getArguments();

        this.gson = new Gson();

        sellers = new ArrayList<>();
        buyer = new Buyer(this.getLocalName(), (float)args[0], (float)args[1], (float)args[2], (int)Math.round((float)args[3]));
    }

    /**
     * Overriding existing method of Agent to provide proper de-registration
     */
    @Override
    protected void takeDown() {
        logger.info("taking down");

        try {
            DFService.deregister(this);
        }
        catch (FIPAException fe) {
            logger.throwing("BuyerAgent", "takeDown", fe);
        }
    }

}
