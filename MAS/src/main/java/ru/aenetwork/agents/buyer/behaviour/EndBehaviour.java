package ru.aenetwork.agents.buyer.behaviour;

import jade.core.behaviours.OneShotBehaviour;
import ru.aenetwork.agents.buyer.BuyerAgent;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * Class for buyer agent behaviour on end of work
 *
 * 
 */
public class EndBehaviour extends OneShotBehaviour {
    private final BuyerAgent agent;

    /**
     * Constructor of EndBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public EndBehaviour(BuyerAgent agent) {
        this.agent = agent;
    }

    /**
     * Overrides basic action method of behaviour
     */
    @Override
    public void action() {
        this.agent.logger.info("end running");
        try {
            sendHTTP();
        } catch (Exception e) {
            e.printStackTrace();
        }
        agent.doDelete();
    }

    /**
     * Send HTTP request to
     *
     * @throws IOException Exception while processing request
     * @throws InterruptedException Exception if request is interrupted
     */
    private void sendHTTP() throws IOException, InterruptedException {
        DealResult res = new DealResult(this.agent.choose, this.agent.getLocalName());
        String req = this.agent.gson.toJson(res);
        HttpClient httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        HttpRequest request = HttpRequest.newBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(req))
                .uri(URI.create(System.getProperty("API_PATH")+"/result"))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .setHeader("Content-Type", "application/json")
                .build();
        httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    }
    public static class DealResult {
        public final String seller;
        public final String buyer;

        /**
         * Constructor of DealResult class
         *
         * @param seller seller of the deal
         * @param buyer buyer of the deal
         */
        public DealResult(String seller, String buyer) {
            this.seller = seller;
            this.buyer = buyer;
        }
    }
}
