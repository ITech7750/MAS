package ru.aenetwork.agents.seller;

import com.google.gson.Gson;
import jade.core.AID;
import jade.core.Agent;
import jade.domain.DFService;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.domain.FIPAException;
import ru.aenetwork.agents.info.Seller;
import ru.aenetwork.agents.seller.behaviour.MainBehaviour;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * SellerAgent class provide JADE agent for seller
 *
 * @author beldmian
 */
public class SellerAgent extends Agent {
    public Seller seller;
    public Gson gson;
    public ArrayList<AID> buyers;
    public Logger logger;
    public String choose = "";

    /**
     * setup function setups agent for working
     */
    protected void setup() {
        logger = Logger.getLogger(this.getLocalName());
        logger.setLevel(Level.FINE);
        register();
        init();
        addBehaviour(new MainBehaviour(this));
        logger.info("settled");
    }

    /**
     * Provide registration for df agent in JADE
     */
    private void register() {
        logger.info( "register");

        DFAgentDescription dfd = new DFAgentDescription();
        dfd.setName(getAID());
        ServiceDescription sd = new ServiceDescription();
        sd.setType("seller");
        sd.setName(this.getLocalName());
        dfd.addServices(sd);
        try {
            DFService.register(this, dfd);
        }
        catch (FIPAException fe) {
            logger.throwing("SellerAgent", "register", fe);
        }
    }

    /**
     * Initialize all variables of agent
     */
    private void init() {
        logger.info("initialize");

        Object[] args = getArguments();

        this.gson = new Gson();

        buyers = new ArrayList<>();
        seller = new Seller(this.getLocalName(), (float)args[0], (float)args[1], (float)args[2], (int)Math.round((float)args[3]));
    }

    /**
     * takeDown function provide properly take down of agent after delete
     */
    @Override
    protected void takeDown() {
        logger.info("taking down");

        try {
            DFService.deregister(this);
        }
        catch (FIPAException fe) {
            logger.throwing("SellerAgent", "takeDown", fe);
        }
    }

}
