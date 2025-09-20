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

const PointItem = ({ item, isSelected, onSelect }) => (
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
                    <Icon name="call-outline" size={12} color="#666" />
                    <Text style={styles.itemDate}>
                        {item.CityPointContactNumber.split(' ').join(', ')}
                    </Text>
                </View>
            )}
        </View>
    </TouchableOpacity>
);

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

// --- Stylesheet ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#666',
        marginLeft: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#D32F2F',
    },
    tabText: {
        fontSize: 16,
        color: '#aaa',
    },
    activeTabText: {
        color: '#D32F2F',
        fontWeight: 'bold',
    },
    contentArea: {
        flex: 1,
        padding: 16,
    },
    selectTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#eee',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    selectedRadio: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#D32F2F',
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemAddress: {
        fontSize: 12,
        color: '#666',
    },
    itemTimeContainer: {
        alignItems: 'flex-end',
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '60%',
        // flexWrap: 'wrap',   
        marginTop: 4,
    },
    itemTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemDate: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    footer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    footerButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButton: {
        backgroundColor: '#f1f1f1',
        marginRight: 10,
    },
    resetButtonText: {
        color: '#D32F2F',
        fontSize: 16,
        fontWeight: 'bold',
    },
    proceedButton: {
        backgroundColor: '#D32F2F',
    },
    proceedButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
