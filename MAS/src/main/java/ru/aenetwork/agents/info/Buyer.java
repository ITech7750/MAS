package ru.aenetwork.agents.info;

/**
 * Buyer class provide a "cell" for seller data in buyer agent
 */
public class Buyer {
    public final String name;
    public final double maxConsumeOfEnergy;
    public final double minConsumeOfEnergy;
    public final double priceForEnergy;
    public final int monthsOfEnergy;

    /**
     * Constrictor for Buyer class
     *
     * @param name               name of agent
     * @param maxConsumeOfEnergy maximum consumption of energy
     * @param minConsumeOfEnergy minimum consumption of energy
     * @param priceForEnergy     wanted price for energy
     * @param monthsOfEnergy     wanted months of energy
     */
    public Buyer(String name, double maxConsumeOfEnergy, double minConsumeOfEnergy, double priceForEnergy, int monthsOfEnergy) {
        this.name = name;
        this.maxConsumeOfEnergy = maxConsumeOfEnergy;
        this.minConsumeOfEnergy = minConsumeOfEnergy;
        this.priceForEnergy = priceForEnergy;
        this.monthsOfEnergy = monthsOfEnergy;
    }
}
