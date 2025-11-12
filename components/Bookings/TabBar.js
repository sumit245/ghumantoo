import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Badge } from 'react-native-paper';
import { PrimaryColor, PureWhite, spacing, typography, layouts } from '../../utils/styles';

const TabBar = React.memo(({ routes, position, index, onTabPress }) => {
    const inputRange = routes.map((_, i) => i);

    return (
        <View style={styles.tabBar}>
            {routes.map((route, i) => {
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.6)),
                });
                const isFocused = index === i;

                return (
                    <TouchableOpacity
                        key={route.key}
                        style={styles.tabItem}
                        onPress={() => onTabPress(i)}
                    >
                        <View style={styles.tabLabelContainer}>
                            <Animated.Text style={[styles.label, { opacity }]}>
                                {route.title}
                            </Animated.Text>
                            {route.tripCount > 0 && (
                                <Badge style={styles.badge}>{route.tripCount}</Badge>
                            )}
                        </View>
                        {isFocused && <View style={styles.indicator} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
});

const styles = StyleSheet.create({
    tabBar: {
        ...layouts.rowTab,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        ...spacing.pv4,
    },
    tabLabelContainer: {
        ...layouts.rowCenter,
        justifyContent: 'center',
    },
    label: {
        ...typography.font16Bold,
        color: PrimaryColor,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    badge: {
        backgroundColor: PrimaryColor,
        ...spacing.ml2,
        alignSelf: 'center',
    },
    indicator: {
        backgroundColor: PrimaryColor,
        height: 3,
        width: '60%',
        position: 'absolute',
        bottom: 0,
        ...spacing.br1,
    },
});

export default TabBar;
