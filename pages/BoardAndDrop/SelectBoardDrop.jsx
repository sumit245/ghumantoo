import dayjs from 'dayjs';
import React, { useState, useMemo } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
    PureWhite,
    ErrorRed,
    GrayBackground,
    TextDark,
    TextMuted,
    LightGrayText,
    BorderLight,
    ButtonBgGray,
    typography,
    spacing,
    layouts,
} from '../../utils/styles';

const PointItem = ({ item, isSelected, onSelect }) => {
    // Process contact numbers: split by comma or space if multiple, otherwise show as single
    const getContactNumbers = (contactString) => {
        if (!contactString) return [];
        // First, normalize the string by removing extra spaces
        const normalized = contactString.trim().replace(/\s+/g, ' ');

        // Check if there are commas first
        if (normalized.includes(',')) {
            // Split by comma if comma-separated
            return normalized.split(',').map(num => num.trim()).filter(num => num.length > 0);
        } else {
            // If no commas, check if there are multiple numbers (more than 10 digits suggests multiple numbers)
            // Split by spaces, but only if there are multiple distinct number-like sequences
            const parts = normalized.split(/\s+/).filter(part => part.length > 0);

            // If parts contain numbers (at least 7 digits), treat each as a separate number
            const numberParts = parts.filter(part => /\d{7,}/.test(part));

            if (numberParts.length > 1) {
                // Multiple numbers detected
                return numberParts;
            } else {
                // Single number or single combined string
                return [normalized];
            }
        }
    };

    const contactNumbers = getContactNumbers(item.CityPointContactNumber);
    const isSingleNumber = contactNumbers.length <= 1;

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect(item)}>
            <View style={styles.radioCircle}>
                {isSelected && <View style={styles.selectedRadio} />}
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.CityPointName}</Text>
                <Text style={styles.itemAddress}>{item.CityPointAddress}</Text>
            </View>
            <View style={styles.itemTimeContainer}>
                <Text style={styles.itemTime}>{dayjs(item.CityPointTime).format('hh:mm A')}</Text>
                {item.CityPointContactNumber && (
                    <View style={styles.contactContainer}>
                        <Icon name="call-outline" size={12} color="#666" style={styles.contactIcon} />
                        {isSingleNumber ? (
                            <Text style={styles.singleContactText} numberOfLines={1}>
                                {contactNumbers[0]}
                            </Text>
                        ) : (
                            <View style={styles.contactNumbersContainer}>
                                {contactNumbers.map((number, index) => (
                                    <Text key={index} style={styles.contactNumberText} numberOfLines={1}>
                                        {number}
                                    </Text>
                                ))}
                            </View>
                        )}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

// --- Main Screen Component ---
export default function SelectPointsScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('boarding'); // 'boarding' or 'dropping'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBoardingPoint, setSelectedBoardingPoint] = useState(null);
    const [selectedDroppingPoint, setSelectedDroppingPoint] = useState(null);
    const { boardingPoints, droppingPoints, originCity, destinationCity, date_of_journey, selectedBus, departureTime } = useSelector(state => state.bus);

    const dispatch = useDispatch();

    const isBoardingTab = activeTab === 'boarding';

    // Memoized filtering to prevent re-calculation on every render
    const filteredData = useMemo(() => {
        const data = isBoardingTab ? boardingPoints : droppingPoints;
        if (!searchQuery) {
            return data;
        }
        return data.filter(
            (item) =>
                item.CityPointName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.CityPointAddress.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, isBoardingTab]);

    const handleSelect = (item) => {
        if (isBoardingTab) {
            setSelectedBoardingPoint(item);
            setActiveTab('dropping'); // Automatically switch to dropping tab
        } else {
            setSelectedDroppingPoint(item);
        }
    };

    const handleReset = () => {
        setSelectedBoardingPoint(null);
        setSelectedDroppingPoint(null);
        setActiveTab('boarding'); // Go back to the first tab
    };

    const handleProceed = async () => {
        await dispatch({ type: 'SET_SELECTED_BOARDING_POINT', payload: selectedBoardingPoint });
        await dispatch({ type: 'SET_SELECTED_DROPPING_POINT', payload: selectedDroppingPoint });
        // Navigate to the passenger details screen, passing the selected points
        navigation.navigate('AddPassenger', {
            boardingPoint: selectedBoardingPoint,
            droppingPoint: selectedDroppingPoint,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>{originCity} → {destinationCity}</Text>
                    <Text style={styles.headerSubtitle}>
                        {dayjs(date_of_journey).format('ddd DD MMM YYYY')}, {dayjs(departureTime).format('hh:mm A')} | {selectedBus}
                    </Text>
                </View>
            </View>

            {/* Tab Switcher */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, isBoardingTab && styles.activeTab]}
                    onPress={() => setActiveTab('boarding')}
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
                    onPress={() => setActiveTab('dropping')}
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
                            isSelected={
                                isBoardingTab
                                    ? selectedBoardingPoint?.CityPointIndex === item.CityPointIndex
                                    : selectedDroppingPoint?.CityPointIndex === item.CityPointIndex
                            }
                            onSelect={handleSelect}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {/* Footer with action buttons */}
            {selectedBoardingPoint && selectedDroppingPoint && (
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.footerButton, styles.resetButton]}
                        onPress={handleReset}
                    >
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.footerButton, styles.proceedButton]}
                        onPress={handleProceed}>
                        <Text style={styles.proceedButtonText}>Proceed</Text>
                    </TouchableOpacity>
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
    header: {
        ...layouts.rowCenter,
        ...spacing.p4,
        backgroundColor: PureWhite,
        paddingTop: 0,
    },
    headerTitle: {
        ...typography.font18Bold,
        ...spacing.ml4,
        color: TextDark,
    },
    headerSubtitle: {
        ...typography.font12,
        color: TextMuted,
        ...spacing.ml4,
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
    itemContainer: {
        ...layouts.rowCenter,
        backgroundColor: PureWhite,
        ...spacing.p4,
        ...spacing.br2,
        ...spacing.mb3,
        ...spacing.bw1,
        borderColor: BorderLight,
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        ...layouts.colCenter,
        ...spacing.mr4,
    },
    selectedRadio: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: ErrorRed,
    },
    itemDetails: {
        flex: 1,
        flexShrink: 1,
        minWidth: 0,
    },
    itemName: {
        ...typography.font14Bold,
        ...spacing.mb1,
        color: TextDark,
    },
    itemAddress: {
        ...typography.font12,
        color: TextMuted,
    },
    itemTimeContainer: {
        alignItems: 'flex-end',
        flexShrink: 0,
        ...spacing.ml2,
        minWidth: 90,
    },
    contactContainer: {
        ...layouts.rowCenter,
        alignItems: 'flex-start',
        ...spacing.mt1,
        flexShrink: 0,
    },
    contactIcon: {
        marginRight: 4,
        marginTop: 2,
        flexShrink: 0,
    },
    contactNumbersContainer: {
        flex: 0,
        flexShrink: 0,
        alignItems: 'flex-start',
    },
    contactNumberText: {
        ...typography.font12,
        color: TextMuted,
        marginLeft: 0,
        lineHeight: 16,
        minWidth: 80,
    },
    singleContactText: {
        ...typography.font12,
        color: TextMuted,
        marginLeft: 0,
        flexShrink: 0,
    },
    itemTime: {
        ...typography.font16Bold,
    },
    itemDate: {
        ...typography.font12,
        color: TextMuted,
        marginLeft: 0,
        flexShrink: 1,
    },
    footer: {
        ...layouts.footer,
    },
    footerButton: {
        flex: 1,
        ...spacing.pv3,
        ...spacing.br2,
        ...layouts.colCenter,
    },
    resetButton: {
        backgroundColor: ButtonBgGray,
        ...spacing.mr2,
    },
    resetButtonText: {
        ...typography.font16Bold,
        color: ErrorRed,
    },
    proceedButton: {
        backgroundColor: ErrorRed,
    },
    proceedButtonText: {
        ...typography.font16Bold,
        color: PureWhite,
    },
});
