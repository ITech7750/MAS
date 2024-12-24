package ru.aenetwork.agents.seller.behaviour;

import jade.core.AID;
import jade.core.behaviours.Behaviour;
import jade.domain.DFService;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.domain.FIPAException;
import jade.lang.acl.ACLMessage;
import jade.lang.acl.MessageTemplate;
import ru.aenetwork.agents.info.Buyer;
import ru.aenetwork.agents.info.Seller;
import ru.aenetwork.agents.seller.SellerAgent;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;

/**
 * FirsRoundBehaviour provide agent behaviour of first round
 */
public class FirstRoundBehaviour extends Behaviour {
    private static final int SUCCESS = 0;
    private static final int FAIL = 1;

    private final SellerAgent agent;
    private int endCode = FAIL;
    private boolean isEnded = false;
    private ArrayList<BuyerResponse> buyers;
    private AID chasedBuyer;
    private final ArrayList<AID> activeBuyers = new ArrayList<>();

    /**
     * Constructor of FirstRoundBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public FirstRoundBehaviour(SellerAgent agent) {
        this.agent = agent;
    }

    @Override
    public void action() {
        this.agent.logger.info("round one");

        getAllBuyers();
        receiveResponse();
        inform();
        waitForResponse();
        performMath();
        waitAccept();
    }

    /**
     * Gets all buyers from df service of JADE
     */
    public void getAllBuyers() {
        this.agent.logger.info("getting buyers");
        this.buyers = new ArrayList<>();

        DFAgentDescription template = new DFAgentDescription();
        ServiceDescription sd = new ServiceDescription();
        sd.setType("buyer");
        template.addServices(sd);

        try {
            DFAgentDescription[] result = DFService.search(myAgent, template);
            for (DFAgentDescription res: result) {
                agent.buyers.add(res.getName());
            }
        }
        catch (FIPAException fe) {
            this.agent.logger.throwing("FirstRoundBehaviour", "getAllBuyers", fe);
        }
    }

    /**
     * waits for response with buyers data
     */
    private void receiveResponse() {
        this.agent.logger.info("receiving response");
        MessageTemplate mt = MessageTemplate.MatchPerformative(ACLMessage.REQUEST);
        while (buyers.size() != agent.buyers.size()) {
            ACLMessage in = agent.receive(mt);
            if (in != null) {
                Buyer res = agent.gson.fromJson(in.getContent(), Buyer.class);
                AID id = in.getSender();
                buyers.add(new BuyerResponse(res, id));
            }
        }
    }

    /**
     * Informing all buyers about seller's data
     */
    public void inform() {
        this.agent.logger.info("informing");
        ACLMessage msg = new ACLMessage(ACLMessage.INFORM);
        msg.setContent(agent.gson.toJson(agent.seller));
        for (BuyerResponse buyer : buyers) {
            msg.addReceiver(buyer.id);
        }
        agent.send(msg);
    }

    /**
     * Waiting for response from Buyer agent, and then executing math logic
     */
    public void waitForResponse() {
        this.agent.logger.info("waiting for response");
        MessageTemplate mt = MessageTemplate.MatchPerformative(ACLMessage.CFP);

        long end = System.currentTimeMillis() + 20000;
        while (System.currentTimeMillis() < end) {
//        while (true) {
            ACLMessage in = agent.receive(mt);
            if (in != null) {
                if (in.getContent().equals("BUY")) {
                    this.activeBuyers.add(in.getSender());
                }
            }
        }
    }

    /**
     * Performing math for choosing the best buyer to contract
     */
    private void performMath() {
        this.agent.logger.info("performing math");
        ArrayList<Buyer> buyersList = new ArrayList<>();
        for (BuyerResponse buyer: this.buyers) {
            for (AID id: this.activeBuyers) {
                if (buyer.id.getLocalName().equals(id.getLocalName())) {
                    buyersList.add(buyer.buyer);
                }
            }
        }
        MathRequest req = new MathRequest("seller", this.agent.seller, buyersList);
        String json = this.agent.gson.toJson(req);

        HttpClient httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        HttpRequest request = HttpRequest.newBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .uri(URI.create(System.getProperty("API_PATH")+"/glop"))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .setHeader("Content-Type", "application/json")
                .build();
        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            MathResponse resp = this.agent.gson.fromJson(response.body(), MathResponse.class);

            Buyer choseBuyer;
            if (resp.goodList.size() > 0) {
                choseBuyer = resp.goodList.get(0);
            } else {
                choseBuyer = resp.badList.get(0);
            }
            for (BuyerResponse buyer: this.buyers) {
                if (choseBuyer.name.equals(buyer.buyer.name)) {
                    this.chasedBuyer = buyer.id;
                }
            }
            ACLMessage msg = new ACLMessage(ACLMessage.PROPOSE);
            msg.addReceiver(this.chasedBuyer);
            msg.setContent("OK");
            this.agent.send(msg);
        } catch (IOException | InterruptedException e) {
            this.agent.logger.throwing("FirstRoundBehaviour", "performMath", e);
        }
    }

    /**
     * provide agent waiting for ACCEPT_PROPOSAL and REJECT_PROPOSAL message
     */
    private void waitAccept() {
        this.agent.logger.info("waiting accept");
        MessageTemplate mt = MessageTemplate.or(MessageTemplate.MatchPerformative(ACLMessage.ACCEPT_PROPOSAL),
                MessageTemplate.MatchPerformative(ACLMessage.REJECT_PROPOSAL));
        long end = System.currentTimeMillis() + 10000;
        while (System.currentTimeMillis() < end) {
            ACLMessage in = agent.receive(mt);
            if (in != null) {
                if (in.getContent().equals("ACCEPT")) {
                    endCode = SUCCESS;
                    this.agent.choose = in.getSender().getLocalName();
                } else {
                    endCode = FAIL;
                }
                break;
            }
        }
        isEnded = true;
    }

    /**
     * Overriding default end function to provide end code for FSMBehaviour
     * @return code of ending: 1 - fail, 0 - success
     */
    @Override
    public int onEnd() {
        return endCode;
    }

    @Override
    public boolean done() {
        return isEnded;
    }

    /**
     * BuyerResponse provide "cell" for data of buyer
     *
     * @author beldmian
     */
    static class BuyerResponse {
        public final Buyer buyer;
        public final AID id;

        /**
         * BuyerResponse constructor
         * @param buyer Provide access to buyer data
         * @param id Provide access to id of buyer agent in JADE
         */
        public BuyerResponse(Buyer buyer, AID id) {
            this.buyer = buyer;
            this.id = id;
        }
    }

    static class MathRequest {
        public final String type;
        public final Seller single;
        public final ArrayList<Buyer> list;

        public MathRequest(String type, Seller single, ArrayList<Buyer> list) {
            this.type = type;
            this.single = single;
            this.list = list;
        }
    }

    static class MathResponse {
        public final ArrayList<Buyer> goodList = new ArrayList<>();
        public final ArrayList<Buyer> badList = new ArrayList<>();
    }
}
