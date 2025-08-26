import React, { useState } from 'react';
import { View, useWindowDimensions, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import UpcomingTrips from '../components/tabBar/TabBarComponent';
import PastTrips from '../components/tabBar/TabBarComponent';
import { PrimaryColor, SecondaryColor, White1Color, WhiteColor } from '../utils/colors';
import { typography } from '../utils/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from 'react-native-paper';

// The SceneMap function maps your route keys to the components for each tab.
// This is lazy-loaded, so components are only mounted when they are focused.
const renderScene = ({ route }) => {
  switch (route.key) {
    case 'upcoming':
      return <UpcomingTrips />;
    case 'past':
      return <PastTrips />;
    default:
      return null;
  }
};

export default function BookingsScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'upcoming', title: 'Upcoming',tripCount: 5 }, // Example trip count
    { key: 'past', title: 'Past' },
  ]);

  // This function customizes the appearance of the tab bar.
  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.6
            ),
          });

          const isFocused = index === i;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)} // Correctly use the setIndex function
            >
              <View style={styles.tabLabelContainer}>
                <Animated.Text style={[styles.label, { opacity }]}>
                  {route.title}
                </Animated.Text>
                {/* Render badge only for the upcoming tab and if count > 0 */}
                {route.key === 'upcoming' && route.tripCount > 0 && (
                  <Badge style={styles.badge}>{route.tripCount}</Badge>
                )}
              </View>
              {/* Render the indicator for the active tab */}
              {isFocused && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar} // Use our custom tab bar
        lazy // Enable lazy rendering for performance
        renderLazyPlaceholder={() => (
          <View style={styles.lazyPlaceholder}>
            <Text>Loading Trips...</Text>
          </View>
        )}

      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteColor,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: WhiteColor,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  tabLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.font16,
    color: PrimaryColor,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badge: {
    backgroundColor: PrimaryColor,
    marginLeft: 8,
    alignSelf: 'center',
  },
  indicator: {
    backgroundColor: PrimaryColor,
    height: 3,
    width: '60%', // Smaller indicator
    position: 'absolute',
    bottom: 0,
    borderRadius: 2,
  },
  lazyPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});