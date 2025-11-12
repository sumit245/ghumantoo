import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import {
    PureWhite,
    ErrorRed,
    GrayBackground,
    TextDark,
    LightGrayText,
    BorderLight,
    typography,
    spacing,
    layouts,
} from '../../utils/styles';
import Header from '../../components/customs/Header';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import ButtonContainer from '../../components/buttons/ButtonContainer';
import PointItem from '../../components/BoardDrop/PointItem';
import { useSelectBoardDrop } from '../../hooks/useSelectBoardDrop';

/**
 * SelectBoardDrop Screen (Presentational Component)
 * 
 * Displays boarding and dropping point selection.
 * All business logic extracted to useSelectBoardDrop custom hook.
 */
export default function SelectPointsScreen() {
    // Extract all state and methods from custom hook
    const {
        activeTab,
        searchQuery,
        filteredData,
        isBoardingTab,
        originCity,
        destinationCity,
        date_of_journey,
        selectedBus,
        departureTime,
        setSearchQuery,
        handleSelect,
        handleReset,
        handleProceed,
        switchTab,
        isPointSelected,
        canProceed,
    } = useSelectBoardDrop();

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title={`${originCity} → ${destinationCity}`}
                subtitle={`${dayjs(date_of_journey).format('ddd DD MMM YYYY')}, ${dayjs(departureTime).format('hh:mm A') || ""} | ${selectedBus}`}
            />

            {/* Tab Switcher */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, isBoardingTab && styles.activeTab]}
                    onPress={() => switchTab('boarding')}
                >
                    <Icon
                        CityPointName="checkmark-circle"
                        size={18}
                        color={isBoardingTab ? '#D32F2F' : '#aaa'}
                        style={{ marginRight: 8 }}
                    />
                    <Text style={[styles.tabText, isBoardingTab && styles.activeTabText]}>
                        Boarding Points
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, !isBoardingTab && styles.activeTab]}
                    onPress={() => switchTab('dropping')}
                >
                    <Icon
                        CityPointName="checkmark-circle-outline"
                        size={18}
                        color={!isBoardingTab ? '#D32F2F' : '#aaa'}
                        style={{ marginRight: 8 }}
                    />
                    <Text style={[styles.tabText, !isBoardingTab && styles.activeTabText]}>
                        Dropping Points
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Main Content Area */}
            <View style={styles.contentArea}>
                <Text style={styles.selectTitle}>
                    Select your {isBoardingTab ? 'Boarding' : 'Dropping'} point
                </Text>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Icon CityPointName="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={`Search for ${isBoardingTab ? 'Boarding' : 'Dropping'} Point`}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* List of Points */}
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.CityPointIndex}
                    renderItem={({ item }) => (
                        <PointItem
                            item={item}
                            isSelected={isPointSelected(item)}
                            onSelect={handleSelect}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {/* Footer with action buttons */}
            {canProceed && (
                <View style={[spacing.p2, spacing.borderTop]}>
                    <ButtonContainer>
                        <SecondaryButton
                            onClick={handleReset}
                            title="Reset"
                        />
                        <PrimaryButton
                            onClick={handleProceed}
                            title="Proceed"
                        />
                    </ButtonContainer>
                </View>
            )}
        </SafeAreaView>
    );
}

// Component-specific boarding/dropping point selection styles
const styles = StyleSheet.create({
    container: {
        ...layouts.container,
        backgroundColor: GrayBackground,
    },
    tabContainer: {
        ...layouts.rowTab,
    },
    tab: {
        flex: 1,
        ...layouts.rowCenter,
        justifyContent: 'center',
        ...spacing.pv4,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: ErrorRed,
    },
    tabText: {
        ...typography.font16,
        color: LightGrayText,
    },
    activeTabText: {
        ...typography.textBold,
        color: ErrorRed,
    },
    contentArea: {
        ...layouts.container,
        ...spacing.p4,
    },
    selectTitle: {
        ...typography.font16Bold,
        ...spacing.mb4,
        color: TextDark,
    },
    searchContainer: {
        ...layouts.rowCenter,
        backgroundColor: PureWhite,
        ...spacing.br2,
        ...spacing.ph3,
        ...spacing.mb4,
        ...spacing.bw1,
        borderColor: BorderLight,
    },
    searchIcon: {
        ...spacing.mr2,
    },
    searchInput: {
        flex: 1,
        height: 48,
        ...typography.font16,
    },

});
