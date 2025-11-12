import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import {
    PureWhite,
    TextDark,
    TextMuted,
    BorderLight,
    ErrorRed,
    typography,
    spacing,
    layouts,
} from '../../utils/styles';

/**
 * Parse contact numbers from string
 * Handles comma-separated or space-separated numbers
 */
const parseContactNumbers = (contactString) => {
    if (!contactString) return [];

    const normalized = contactString.trim().replace(/\s+/g, ' ');

    if (normalized.includes(',')) {
        return normalized
            .split(',')
            .map((num) => num.trim())
            .filter((num) => num.length > 0);
    }

    const parts = normalized.split(/\s+/).filter((part) => part.length > 0);
    const numberParts = parts.filter((part) => /\d{7,}/.test(part));

    if (numberParts.length > 1) {
        return numberParts;
    }

    return [normalized];
};

/**
 * PointItem Component (Memoized)
 * 
 * Renders a single boarding/dropping point with selection state
 * 
 * @param {Object} item - Point data
 * @param {Boolean} isSelected - Whether point is selected
 * @param {Function} onSelect - Selection callback
 */
const PointItem = React.memo(({ item, isSelected, onSelect }) => {
    // Parse contact numbers (memoized)
    const contactNumbers = useMemo(
        () => parseContactNumbers(item.CityPointContactNumber),
        [item.CityPointContactNumber]
    );

    const isSingleNumber = contactNumbers.length <= 1;
    const formattedTime = useMemo(
        () => dayjs(item.CityPointTime).format('hh:mm A'),
        [item.CityPointTime]
    );

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
        >
            <View style={styles.radioCircle}>
                {isSelected && <View style={styles.selectedRadio} />}
            </View>

            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.CityPointName}</Text>
                <Text style={styles.itemAddress}>{item.CityPointAddress}</Text>
            </View>

            <View style={styles.itemTimeContainer}>
                <Text style={styles.itemTime}>{formattedTime}</Text>
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
});

PointItem.displayName = 'PointItem';

const styles = StyleSheet.create({
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
    itemTime: {
        ...typography.font16Bold,
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
});

export default PointItem;
