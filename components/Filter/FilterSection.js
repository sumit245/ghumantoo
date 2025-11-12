import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlackColor, typography, spacing, BorderGray } from '../../utils/styles';

const FilterSection = React.memo(({ title, children, style }) => (
    <View style={[styles.section, style]}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
    </View>
));

const styles = StyleSheet.create({
    section: {
        ...spacing.p5,
        borderBottomWidth: 1,
        borderBottomColor: BorderGray,
    },
    sectionTitle: {
        ...typography.font18Bold,
        color: BlackColor,
        ...spacing.mb3,
    },
});

export default FilterSection;
