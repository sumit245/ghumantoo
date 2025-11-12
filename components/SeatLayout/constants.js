/**
 * Seat Layout Constants
 * 
 * Centralized configuration for seat colors, types, and dimensions
 */

// Seat color themes based on state
export const SEAT_COLORS = {
    available: { bg: '#dcfce7', border: '#22c55e' },
    selected: { bg: 'red', border: 'black' },
    disabled: { bg: '#f1f5f9', border: '#94a3b8' },
    female: { bg: '#fce7f3', border: '#db2777' },
};

// Seat type identifiers
export const SEAT_TYPES = {
    VERTICAL: ['vseat', 'bvseat'],
    SEATER: ['bseat', 'nseat', 'rseat', 'brseat'],
    FEMALE: ['rseat', 'brseat'],
};

// Seat dimensions
export const SEAT_DIMENSIONS = {
    VERTICAL: {
        width: 70,
        height: 60,
    },
    SEATER: {
        width: 40,
        height: 40,
    },
    SLEEPER: {
        width: 40,
        height: 60,
    },
};

// Aisle configuration
export const AISLE_WIDTH = 20;
