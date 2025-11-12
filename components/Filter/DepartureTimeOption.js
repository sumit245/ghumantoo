import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PrimaryColor, WhiteColor, LightGray, BlackColor, DarkGray, typography, spacing, ButtonBgLight } from '../../utils/styles';

const DepartureTimeOption = React.memo(({ time, isSelected, onPress }) => (
    <TouchableOpacity
        style={[styles.timeOptionButton, isSelected && styles.selected]}
        onPress={onPress}
    >
        <Icon
            name={time.iconName}
            size={24}
            color={isSelected ? WhiteColor : PrimaryColor}
        />
        <View>
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
                {time.label}
            </Text>
            <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                {time.time}
            </Text>
        </View>
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    timeOptionButton: {
        flexBasis: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        ...spacing.ph3,
        borderRadius: 10,
        ...spacing.bw1,
        borderColor: LightGray,
        backgroundColor: ButtonBgLight,
        justifyContent: 'flex-start',
    },
    selected: {
        backgroundColor: PrimaryColor,
        borderColor: PrimaryColor,
    },
    label: {
        ...typography.font14Bold,
        color: BlackColor,
    },
    labelSelected: {
        ...typography.textBold,
        color: WhiteColor,
    },
    timeText: {
        ...typography.font12,
        color: DarkGray,
    },
    timeTextSelected: {
        color: WhiteColor,
        opacity: 0.9,
    },
});

export default DepartureTimeOption;
