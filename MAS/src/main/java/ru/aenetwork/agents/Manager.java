package ru.aenetwork.agents;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import jade.core.Profile;
import jade.core.ProfileImpl;
import jade.core.Runtime;
import jade.wrapper.ContainerController;
import ru.aenetwork.grpc.AgentsServer;
import util.Formatter;

import java.io.*;
import java.util.logging.*;

/**
 * Manager is a management service that provides access to JADE by HTTP
 */
public class Manager {
    public static final String HOST = "127.0.0.1";
    public static final String PORT = "7778";
    public static ContainerController cc;
    public static final Logger logger = Logger.getLogger("Manager");
    /**
     * Main function of Manager that starts Main-Container of JADE and web server to accept HTTP Requests
     *
     * @param args Command line arguments for Manager
     */
    public static void main(String[] args) {
        System.setProperty("API_PATH", "https://testpythonaenet.herokuapp.com");
        Logger global = Logger.getGlobal();
        ConsoleHandler handler = new ConsoleHandler();
        handler.setFormatter(new Formatter());
        global.addHandler(handler);

        Manager.logger.addHandler(handler);
        Logger rootLogger = LogManager.getLogManager().getLogger("");
        for (Handler h : rootLogger.getHandlers()) {
            rootLogger.removeHandler(h);
        }
        rootLogger.addHandler(handler);
        rootLogger.setLevel(Level.INFO);


        setupMainContainer();
        startGrpc();
    }

    private static void startGrpc() {
        Server server = ServerBuilder.forPort(7070).addService(new AgentsServer(cc)).build();
        try {
            logger.info("gRPC server starting");
            server.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Make setup of JADE by creating runtime instance and Main-Container
     */
    public static void setupMainContainer() {
        Runtime rt = Runtime.instance();
        Profile p = new ProfileImpl();
        p.setParameter(Profile.GUI, "false");
        p.setParameter(Profile.MAIN_HOST, HOST);
        p.setParameter(Profile.MAIN_PORT, PORT);
        cc = rt.createMainContainer(p);
    }
}
