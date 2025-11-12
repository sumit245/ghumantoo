import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { spacing, PureWhite, width, typography, layouts, BlueAccent, OrangeAccent } from '../../utils/styles';

const GBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const featurePillsAnim = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    useEffect(() => {
        setIsVisible(true);

        // Main content animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        // Feature pills staggered animation
        const pillAnimations = featurePillsAnim.map((anim, index) =>
            Animated.timing(anim, {
                toValue: 1,
                duration: 500,
                delay: 300 + index * 100,
                useNativeDriver: true,
            })
        );

        Animated.parallel(pillAnimations).start();
    }, []);

    const features = ['Smart Planning', 'Local Insights', 'Best Deals'];

    return (
        <View style={[spacing.m4, spacing.br3,]}>
            <ImageBackground
                source={require('../../assets/travel_india.jpeg')}
                // For remote images, use: source={{ uri: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' }}
                style={[spacing.br2, { backgroundColor: PureWhite, }]}
                imageStyle={spacing.br2}
            >
                {/* Overlay */}
                <View style={layouts.overlay} />

                {/* Content */}
                <Animated.View
                    style={[
                        layouts.container,
                        layouts.colCenter,
                        spacing.ph1,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <View style={[spacing.pt3, spacing.pl3, { maxWidth: width * 0.9 }]}>
                        {/* Main Heading */}
                        <View style={spacing.mb1}>
                            <Text style={[typography.font24, typography.textBold, { lineHeight: 30, color: OrangeAccent }]}>
                                India's First
                            </Text>
                            <Text style={[typography.font24, typography.textBold, { lineHeight: 30, color: PureWhite }]}>
                                AI Powered
                            </Text>
                            <Text style={[typography.font24, typography.textBold, { lineHeight: 30, color: '#3BF682' }]}>
                                Travel Partner
                            </Text>
                        </View>

                        {/* Subheading */}
                        <Text style={[typography.font16, typography.font500, { color: 'rgba(255, 255, 255, 0.9)', lineHeight: 24, marginBottom: 24 }]}>
                            Discover incredible destinations with personalized AI recommendations tailored just for you
                        </Text>

                        {/* Feature Pills */}
                        <View style={[layouts.rowCenter, { flexWrap: 'wrap' }]}>
                            {features.map((feature, index) => (
                                <Animated.View
                                    key={feature}
                                    style={[
                                        spacing.ph1,
                                        spacing.pv05,
                                        spacing.mr2,
                                        spacing.mb2,
                                        {
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: 16,
                                            borderWidth: 1,
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                            opacity: featurePillsAnim[index],
                                            transform: [
                                                {
                                                    translateY: featurePillsAnim[index].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [20, 0],
                                                    }),
                                                },
                                            ],
                                        },
                                    ]}
                                >
                                    <TouchableOpacity activeOpacity={0.8}>
                                        <Text style={[typography.font12, typography.font500, { color: PureWhite }]}>{feature}</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            ))}
                        </View>
                    </View>
                </Animated.View>

                {/* Decorative Elements */}
                <View style={[styles.decorativeCircle, styles.decorativeCircle1]} />
                <View style={[styles.decorativeCircle, styles.decorativeCircle2]} />
            </ImageBackground>
        </View>
    );
};

// Component-specific decorative element styles (not reusable)
const styles = StyleSheet.create({
    decorativeCircle: {
        position: 'absolute',
        borderRadius: 50,
        opacity: 0.2,
    },
    decorativeCircle1: {
        width: 48,
        height: 48,
        backgroundColor: BlueAccent,
        top: 16,
        right: 16,
    },
    decorativeCircle2: {
        width: 32,
        height: 32,
        backgroundColor: OrangeAccent,
        bottom: 24,
        right: 32,
        opacity: 0.3,
    },
});

export default GBanner;