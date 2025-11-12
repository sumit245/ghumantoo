import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PrimaryColor, layouts } from '../../utils/styles';

/**
 * Centralized Loader component with different variants
 * @param {Object} props
 * @param {'fullscreen' | 'overlay' | 'inline' | 'footer'} [props.variant='fullscreen'] - Loader display variant
 * @param {string} [props.color] - Custom color for the spinner (defaults to PrimaryColor)
 * @param {'small' | 'large'} [props.size='large'] - Size of the activity indicator
 * @param {Object} [props.style] - Additional custom styles
 */
const Loader = ({
    variant = 'fullscreen',
    color = PrimaryColor,
    size = 'large',
    style
}) => {
    const getContainerStyle = () => {
        switch (variant) {
            case 'fullscreen':
                return styles.fullscreenContainer;
            case 'overlay':
                return styles.overlayContainer;
            case 'footer':
                return styles.footerContainer;
            case 'inline':
                return styles.inlineContainer;
            default:
                return styles.fullscreenContainer;
        }
    };

    return (
        <View style={[getContainerStyle(), style]}>
            <ActivityIndicator size={size} color={color} animating />
        </View>
    );
};

const styles = StyleSheet.create({
    fullscreenContainer: {
        ...layouts.container,
        ...layouts.colCenter,
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        ...layouts.colCenter,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    footerContainer: {
        marginVertical: 20,
    },
    inlineContainer: {
        // No specific styles - just a wrapper for the ActivityIndicator
    },
});

export default Loader;
