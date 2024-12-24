package ru.aenetwork.grpc;

import io.grpc.aenetwork.agents.AgentsGrpc;
import io.grpc.aenetwork.agents.AgentsOuterClass;
import io.grpc.stub.StreamObserver;
import jade.wrapper.AgentController;
import jade.wrapper.ContainerController;
import jade.wrapper.StaleProxyException;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class AgentsServer extends AgentsGrpc.AgentsImplBase {
    public final ContainerController cc;

    public AgentsServer(ContainerController cc) {
        this.cc = cc;
    }

    @Override
    public void createAgents(AgentsOuterClass.CreateAgentsRequest request, StreamObserver<AgentsOuterClass.CreateAgentsResponse> responseObserver) {
        ArrayList<AgentController> buyers = new ArrayList<>();
        ArrayList<AgentController> sellers = new ArrayList<>();

        List<AgentsOuterClass.AgentDescription> agentDescriptions = request.getAgentsList();

        agentDescriptions.forEach((agent) -> {
            AgentController ac = createAgent(agent);
            switch (agent.getClassName()) {
                case "ru.aenetwork.agents.buyer.BuyerAgent":
                    buyers.add(ac);
                    break;
                case "ru.aenetwork.agents.seller.SellerAgent":
                    sellers.add(ac);
                    break;
            }
        });
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        for (AgentController agent: sellers) {
            try {
                agent.start();
            } catch (StaleProxyException e) {
                e.printStackTrace();
            }
        }
        for (AgentController agent: buyers) {
            try {
                agent.start();
            } catch (StaleProxyException e) {
                e.printStackTrace();
            }
        }
        AgentsOuterClass.CreateAgentsResponse.Builder builder = AgentsOuterClass.CreateAgentsResponse.newBuilder();
        builder.setOk(true);
        responseObserver.onNext(builder.build());
        responseObserver.onCompleted();
    }
    public AgentController createAgent(AgentsOuterClass.AgentDescription description) {
        if (this.cc != null) {
            try {
                return cc.createNewAgent(description.getName(), description.getClassName(), description.getArgsList().toArray());
            } catch (StaleProxyException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
