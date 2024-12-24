package ru.aenetwork.agents.seller.behaviour;

import jade.core.behaviours.OneShotBehaviour;
import ru.aenetwork.agents.seller.SellerAgent;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * EndBehaviour provides behaviour for ending seller agent work
 *
 * @author beldmian
 */
public class EndBehaviour extends OneShotBehaviour {
    private final SellerAgent agent;

    /**
     * Constructor of EndBehaviour
     *
     * @param agent Provides agent for that behaviour is
     */
    public EndBehaviour(SellerAgent agent) {
        this.agent = agent;
    }

    /**
     * action overriding existing method action of OneShotBehaviour
     */
    @Override
    public void action() {
        this.agent.logger.info("end running");
        agent.doDelete();

        if (!this.agent.choose.equals("")) {
            return;
        }
        DealResult res = new DealResult(this.agent.getLocalName());
        String req = this.agent.gson.toJson(res);
        try {
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
        } catch (Exception e) {
            this.agent.logger.throwing("EndBehaviour", "action", e);
        }
    }
    public static class DealResult {
        public final String seller;

        /**
         * Constructor of DealResult class
         *
         * @param seller seller of the deal
         */
        public DealResult(String seller) {
            this.seller = seller;
        }
    }
}
