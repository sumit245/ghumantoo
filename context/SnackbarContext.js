import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Snackbar } from 'react-native-paper';
import { spacing } from '../utils/styles';

/**
 * Snackbar Context for Global Notifications
 * 
 * Provides a centralized way to show notifications throughout the app
 * Replaces Alert.alert() with a more user-friendly snackbar interface
 * 
 * @example
 * const { showSnackbar } = useSnackbar();
 * showSnackbar('Success message', 'success');
 * showSnackbar('Error occurred', 'error');
 */

const SnackbarContext = createContext();

// Variant configurations for different message types
const VARIANT_CONFIGS = {
    success: {
        backgroundColor: '#4CAF50', // Green
        duration: 3000,
    },
    error: {
        backgroundColor: '#F44336', // Red
        duration: 4000,
    },
    warning: {
        backgroundColor: '#FF9800', // Orange
        duration: 3500,
    },
    info: {
        backgroundColor: '#2196F3', // Blue
        duration: 3000,
    },
    default: {
        backgroundColor: '#323232', // Dark gray
        duration: 3000,
    },
};

export const SnackbarProvider = ({ children }) => {
    const [snackbarState, setSnackbarState] = useState({
        visible: false,
        message: '',
        variant: 'default',
        action: null,
    });

    /**
     * Show a snackbar notification
     * @param {string} message - The message to display
     * @param {('success'|'error'|'warning'|'info'|'default')} variant - The type of notification
     * @param {Object} action - Optional action button config { label: string, onPress: function }
     */
    const showSnackbar = useCallback((message, variant = 'default', action = null) => {
        setSnackbarState({
            visible: true,
            message,
            variant,
            action,
        });
    }, []);

    /**
     * Hide the currently visible snackbar
     */
    const hideSnackbar = useCallback(() => {
        setSnackbarState(prev => ({ ...prev, visible: false }));
    }, []);

    /**
     * Show success notification (shorthand)
     */
    const showSuccess = useCallback((message, action) => {
        showSnackbar(message, 'success', action);
    }, [showSnackbar]);

    /**
     * Show error notification (shorthand)
     */
    const showError = useCallback((message, action) => {
        showSnackbar(message, 'error', action);
    }, [showSnackbar]);

    /**
     * Show warning notification (shorthand)
     */
    const showWarning = useCallback((message, action) => {
        showSnackbar(message, 'warning', action);
    }, [showSnackbar]);

    /**
     * Show info notification (shorthand)
     */
    const showInfo = useCallback((message, action) => {
        showSnackbar(message, 'info', action);
    }, [showSnackbar]);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            showSnackbar,
            hideSnackbar,
            showSuccess,
            showError,
            showWarning,
            showInfo,
        }),
        [showSnackbar, hideSnackbar, showSuccess, showError, showWarning, showInfo]
    );

    const config = VARIANT_CONFIGS[snackbarState.variant] || VARIANT_CONFIGS.default;

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
            <Snackbar
                visible={snackbarState.visible}
                onDismiss={hideSnackbar}
                duration={config.duration}
                style={[
                    spacing.mh2,
                    {
                        backgroundColor: config.backgroundColor,
                        opacity: 0.95,
                        alignSelf: 'center',
                    },
                ]}
                action={
                    snackbarState.action || {
                        label: 'OK',
                        onPress: hideSnackbar,
                    }
                }
            >
                {snackbarState.message}
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

/**
 * Hook to access snackbar functionality
 * @returns {Object} Snackbar methods
 */
export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
