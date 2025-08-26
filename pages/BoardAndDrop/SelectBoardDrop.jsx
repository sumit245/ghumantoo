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

// --- Mock Data (In a real app, this would come from props or a Redux store) ---
const MOCK_DATA = {
    boardingPoints: [
        {
            id: 'bp1',
            name: 'JAI BHAWANI TRAVELS NEW BUS STAND',
            address: 'NEW BUS STAND, SAMDARIYA COMLEX, BLOCK - A SHOP 34',
            time: '19:00',
            date: '03 Aug',
        },
        {
            id: 'bp2',
            name: 'OLD BUS STAND REWA',
            address: 'BHARAT TRAVELS, NEAR SATNA BUS STAND GATE, REVANCHAL BUS STAND',
            time: '19:20',
            date: '03 Aug',
        },
        {
            id: 'bp3',
            name: 'RAILWAY STATION SQUARE',
            address: 'ABOVE FLYOVER BRIDGE RAILWAY STATION SQUARE',
            time: '19:30',
            date: '03 Aug',
        },
        {
            id: 'bp4',
            name: 'CHORAHTA',
            address: 'CHORAHTA',
            time: '19:40',
            date: '03 Aug',
        },
    ],
    droppingPoints: [
        {
            id: 'dp1',
            name: 'SATNA BUS STAND',
            address: 'NEAR GOLDEN GRILL HOTEL',
            time: '21:00',
            date: '03 Aug',
        },
        {
            id: 'dp2',
            name: 'RIICO CHOWK',
            address: 'NEAR RIICO INDUSTRIAL AREA',
            time: '21:15',
            date: '03 Aug',
        },
    ],
};

// --- Sub-Component for a single list item ---
const PointItem = ({ item, isSelected, onSelect }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect(item)}>
        <View style={styles.radioCircle}>
            {isSelected && <View style={styles.selectedRadio} />}
        </View>
        <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemAddress}>{item.address}</Text>
        </View>
        <View style={styles.itemTimeContainer}>
            <Text style={styles.itemTime}>{item.time}</Text>
            <Text style={styles.itemDate}>{item.date}</Text>
        </View>
    </TouchableOpacity>
);

// --- Main Screen Component ---
export default function SelectPointsScreen({navigation}) {
    const [activeTab, setActiveTab] = useState('boarding'); // 'boarding' or 'dropping'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBoardingPoint, setSelectedBoardingPoint] = useState(null);
    const [selectedDroppingPoint, setSelectedDroppingPoint] = useState(null);

    const isBoardingTab = activeTab === 'boarding';

    // Memoized filtering to prevent re-calculation on every render
    const filteredData = useMemo(() => {
        const data = isBoardingTab ? MOCK_DATA.boardingPoints : MOCK_DATA.droppingPoints;
        if (!searchQuery) {
            return data;
        }
        return data.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, isBoardingTab]);

    const handleSelect = (item) => {
        if (isBoardingTab) {
            setSelectedBoardingPoint(item);
        } else {
            setSelectedDroppingPoint(item);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Rewa → Satna</Text>
                    <Text style={styles.headerSubtitle}>
                        Sun 03 Aug 2025, 19:20 | Jai Bhawani Travels
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
                        name="checkmark-circle"
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
                        name="checkmark-circle-outline"
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
                    <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
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
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PointItem
                            item={item}
                            isSelected={
                                isBoardingTab
                                    ? selectedBoardingPoint?.id === item.id
                                    : selectedDroppingPoint?.id === item.id
                            }
                            onSelect={handleSelect}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
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
    itemTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemDate: {
        fontSize: 12,
        color: '#666',
    },
});
