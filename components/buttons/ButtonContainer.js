import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../utils/styles';

/**
 * ButtonContainer - Responsive container for buttons with automatic width distribution
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button components
 * @param {Object} [props.style] - Additional container styles
 * 
 * Usage:
 * - 1 button: takes full width
 * - 2 buttons: each takes 48% width with equal spacing
 * - 3 buttons: each takes 32% width with equal spacing
 * - 4+ buttons: wraps to next row automatically
 */
const ButtonContainer = ({ children, style }) => {
    const childArray = React.Children.toArray(children);
    const buttonCount = childArray.length;

    // Calculate button width based on count
    // 1 button: 100%, 2 buttons: 48%, 3 buttons: 32%
    const getButtonWidth = () => {
        if (buttonCount === 1) return '100%';
        if (buttonCount === 2) return '48%';
        if (buttonCount === 3) return '32%';
        return '48%'; // Default for 4+ buttons (will wrap)
    };

    const buttonWidth = getButtonWidth();

    return (
        <View style={[styles.container, style]}>
            {childArray.map((child, index) => (
                <View key={index} style={[styles.buttonWrapper, { width: buttonWidth }]}>
                    {child}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonWrapper: {
        ...spacing.mv1, // Vertical margin for spacing between rows
    },
});

export default ButtonContainer;
