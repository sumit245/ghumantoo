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
import { spacing } from '../../utils/spacing.styles';
import { PureWhite } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

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
        <View style={[spacing.mh4,spacing.br3,]}>
            <ImageBackground
                source={require('../../assets/travel_india.jpeg')}
                // For remote images, use: source={{ uri: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' }}
                style={[spacing.br2,{backgroundColor:PureWhite,}]}
                imageStyle={spacing.br2}
            >
                {/* Overlay */}
                <View style={styles.overlay} />

                {/* Content */}
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <View style={styles.textContainer}>
                        {/* Main Heading */}
                        <View style={styles.headingContainer}>
                            <Text style={[styles.heading, styles.gradientText2]}>
                                India's First
                            </Text>
                            <Text style={[styles.heading, styles.whiteText]}>
                                AI Powered
                            </Text>
                            <Text style={[styles.heading, styles.gradientText1]}>
                                Travel Partner
                            </Text>
                        </View>

                        {/* Subheading */}
                        <Text style={styles.subheading}>
                            Discover incredible destinations with personalized AI recommendations tailored just for you
                        </Text>

                        {/* Feature Pills */}
                        <View style={styles.pillsContainer}>
                            {features.map((feature, index) => (
                                <Animated.View
                                    key={feature}
                                    style={[
                                        styles.pill,
                                        {
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
                                        <Text style={styles.pillText}>{feature}</Text>
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

const styles = StyleSheet.create({
    
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 12,
        background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5), transparent)',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    textContainer: {
        paddingTop: 12,
        paddingLeft:12,
        maxWidth: width * 0.9,
    },
    headingContainer: {
        marginBottom: 4
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    gradientText1: {
        color: '#3BF682', // Primary blue
    },
    whiteText: {
        color: '#FFFFFF',
    },
    gradientText2: {
        color: '#F97316', // Accent orange
    },
    subheading: {
        fontSize: width > 768 ? 24 : width > 640 ? 20 : width > 480 ? 18 : 16,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
        lineHeight: width > 768 ? 32 : width > 640 ? 28 : width > 480 ? 26 : 24,
        marginBottom: 24,
    },
    pillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 0,
    },
    pill: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        marginRight: 8,
        marginBottom: 8,
    },
    pillText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
    decorativeCircle: {
        position: 'absolute',
        borderRadius: 50,
        opacity: 0.2,
    },
    decorativeCircle1: {
        width: 48,
        height: 48,
        backgroundColor: '#3B82F6',
        top: 16,
        right: 16,
    },
    decorativeCircle2: {
        width: 32,
        height: 32,
        backgroundColor: '#F97316',
        bottom: 24,
        right: 32,
        opacity: 0.3,
    },
});

export default GBanner;