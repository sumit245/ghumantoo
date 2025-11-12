/**
 * SeatLayout Module Exports
 * 
 * Centralized exports for all seat layout components and utilities
 * Allows for clean imports throughout the application
 */

// Main orchestrator component
export { default } from './SeatLayout';

// Sub-components (can be used independently)
export { default as Seat } from './Seat';
export { default as Deck } from './Deck';

// Custom hook
export { useSeatLayoutData } from './useSeatLayoutData';

// Constants and configuration
export { SEAT_COLORS, SEAT_TYPES, SEAT_DIMENSIONS, AISLE_WIDTH } from './constants';
