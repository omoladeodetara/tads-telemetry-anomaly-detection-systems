// src/utils/constants.ts

export const ALERT_THRESHOLDS = {
    temperature: {
        high: 75,
        low: 15,
    },
    power: {
        high: 1000,
        low: 100,
    },
};

export const PROCESSING_LIMITS = {
    maxLatency: 1000, // in milliseconds
    maxDataPoints: 10000,
};

export const SYSTEM_UPTIME = 99.9; // in percentage