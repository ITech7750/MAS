package ru.aenetwork.agents.buyer.behaviour;

import jade.core.AID;
import jade.core.behaviours.Behaviour;
import jade.domain.DFService;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.domain.FIPAException;
import jade.lang.acl.ACLMessage;
import jade.lang.acl.MessageTemplate;
import ru.aenetwork.agents.buyer.BuyerAgent;
import ru.aenetwork.agents.info.Buyer;
import ru.aenetwork.agents.info.Seller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

/**
 * FirstRoundBehaviour provide agent behaviour in first round
 */
public class SecondRoundBehaviour extends Behaviour {
    private final BuyerAgent agent;
    private final ArrayList<SellerResponse> sellers;
    private final ArrayList<AID> goodList;
    private int endCode = 1;
    private boolean isEnded;

    /**
     * Constructor of FirstRoundBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public SecondRoundBehaviour(BuyerAgent agent) {
        this.agent = agent;
        sellers = new ArrayList<>();
        goodList = new ArrayList<>();
    }

    @Override
    public void action() {
        this.agent.sellers = new ArrayList<>();
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        this.agent.logger.info("round two");
        getAllSellers();
        sendData();
        receiveResponse();
        preformMath();
        sendResultToSeller();
        waitForSellerDecision();
    }

    private void getAllSellers() {
        this.agent.logger.info("getting all sellers");
        DFAgentDescription template = new DFAgentDescription();
        ServiceDescription sd = new ServiceDescription();
        sd.setType("seller");
        template.addServices(sd);

        try {
            DFAgentDescription[] result = DFService.search(myAgent, template);
            for (DFAgentDescription res: result) {
                agent.sellers.add(res.getName());
            }
        }
        catch (FIPAException fe) {
            this.agent.logger.throwing("FirstRoundBehaviour", "getAllSellers", fe);
        }
    }

    private void sendData() {
        this.agent.logger.info("sending data");
        ACLMessage req = new ACLMessage(ACLMessage.REQUEST);
        for(AID seller: agent.sellers) {
            req.addReceiver(seller);
        }
        req.setContent(agent.gson.toJson(agent.buyer));
        agent.send(req);
    }

    private void receiveResponse() {
        this.agent.logger.info("receiving response");
        MessageTemplate mt = MessageTemplate.MatchPerformative(ACLMessage.INFORM);
        while (sellers.size() != agent.sellers.size()) {
            ACLMessage msg = agent.receive(mt);
            if (msg != null) {
                Seller seller = agent.gson.fromJson(msg.getContent(), Seller.class);
                AID id = msg.getSender();
                SellerResponse resp = new SellerResponse(seller, id);
                sellers.add(resp);
            }
        }
    }

    private void preformMath() {
        this.agent.logger.info("performing math");
        ArrayList<Seller> sellersList = new ArrayList<>();
        for (SellerResponse resp: this.sellers) {
            sellersList.add(resp.seller);
        }
        MathRequest req = new MathRequest("buyer", this.agent.buyer, sellersList);
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

            ArrayList<Seller> chosenList = resp.goodList;
            if (resp.goodList.size() == 0 ) {
                chosenList = resp.badList;
            }
            for (Seller seller: chosenList) {
                for (SellerResponse id: this.sellers) {
                    if (seller.name.equals(id.seller.name)) {
                        this.goodList.add(id.id);
                    }
                }
            }
        } catch (IOException | InterruptedException e) {
            this.agent.logger.throwing("FirstRoundBehaviour", "preformMath", e);
        }
    }

    private void sendResultToSeller() {
        this.agent.logger.info("sending result");
        ACLMessage msg = new ACLMessage(ACLMessage.CFP);
        for (AID id: goodList) {
            msg.addReceiver(id);
        }
        msg.setContent("BUY");
        agent.send(msg);
    }

    private void waitForSellerDecision() {
        this.agent.logger.info("waiting for decision");
        long end = System.currentTimeMillis() + 10000;
        while (System.currentTimeMillis() < end) {
            MessageTemplate mt = MessageTemplate.MatchPerformative(ACLMessage.PROPOSE);
            ACLMessage resp = agent.receive(mt);
            if (resp != null ) {
                if (resp.getContent().equals("OK")) {
                    ACLMessage accept = new ACLMessage(ACLMessage.ACCEPT_PROPOSAL);
                    accept.addReceiver(resp.getSender());
                    accept.setContent("ACCEPT");
                    agent.send(accept);
                    endCode = 0;
                    this.agent.choose = resp.getSender().getLocalName();
                } else {
                    endCode = 1;
                }
                break;
            }
        }
        isEnded = true;
    }

    @Override
    public boolean done() {
        return isEnded;
    }

    public int onEnd() {
        return endCode;
    }

    static class SellerResponse {
        public final Seller seller;
        public final AID id;
        public SellerResponse(Seller seller, AID id) {
            this.seller = seller;
            this.id = id;
        }
    }

    static class MathRequest {
        public final String type;
        public final Buyer single;
        public final ArrayList<Seller> list;

        public MathRequest(String type, Buyer single, ArrayList<Seller> list) {
            this.type = type;
            this.single = single;
            this.list = list;
        }
    }

    static class MathResponse {
        public final ArrayList<Seller> goodList = new ArrayList<>();
        public final ArrayList<Seller> badList = new ArrayList<>();
    }
}
