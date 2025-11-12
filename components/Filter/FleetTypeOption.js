import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PrimaryColor, LightGray, BlackColor, WhiteColor, typography, spacing, ButtonBgLight } from '../../utils/styles';

const FleetTypeOption = React.memo(({ type, isSelected, onPress }) => (
    <TouchableOpacity
        style={[styles.optionButton, isSelected && styles.selected]}
        onPress={onPress}
    >
        <Text style={[styles.text, isSelected && styles.textSelected]}>{type}</Text>
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    optionButton: {
        ...spacing.pv25,
        ...spacing.ph3,
        borderRadius: 20,
        ...spacing.bw1,
        borderColor: LightGray,
        backgroundColor: ButtonBgLight,
    },
    selected: {
        backgroundColor: PrimaryColor,
        borderColor: PrimaryColor,
    },
    text: {
        ...typography.font14Bold,
        color: BlackColor,
    },
    textSelected: {
        ...typography.textBold,
        color: WhiteColor,
    },
});

export default FleetTypeOption;
