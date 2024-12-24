package ru.aenetwork.agents.info;

/**
 * Seller class provide a "cell" for seller data in seller agent
 */
public class Seller {
    public final String name;
    public final double produceOfEnergy;
    public final double minEnergyForContract;
    public final double priceForEnergy;
    public final int monthsOfEnergy;

    /**
     * Constructor of Seller class
     *
     * @param name                 name of agent
     * @param produceOfEnergy      Amount of energy, that seller produces
     * @param minEnergyForContract minimal energy for contract
     * @param priceForEnergy       Price for 1 MW/h of this seller
     * @param monthsOfEnergy       Amount of months for that this seller want contract to bes
     */
    public Seller(String name, double produceOfEnergy, double minEnergyForContract, double priceForEnergy, int monthsOfEnergy) {
        this.name = name;
        this.produceOfEnergy = produceOfEnergy;
        this.minEnergyForContract = minEnergyForContract;
        this.priceForEnergy = priceForEnergy;
        this.monthsOfEnergy = monthsOfEnergy;
    }
}
