package util;

import jade.util.Logger;

import java.util.logging.LogRecord;

public class Formatter extends java.util.logging.Formatter {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";

    @Override
    public String format(LogRecord record) {
        String color = ANSI_WHITE;
        switch (record.getLevel().toString()) {
            case "INFO":
                color = ANSI_CYAN;
                break;
            case "FINE":
                color = ANSI_GREEN;
                break;
            case "WARNING":
                color = ANSI_YELLOW;
                break;
        }
        return String.format(color+"[%s:%s] %s\n"+ANSI_RESET, record.getLoggerName(), record.getLevel(), record.getMessage());
    }
}
