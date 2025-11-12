import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryButton from '../buttons/PrimaryButton';
import { WhiteColor, AccentColor, typography, spacing, styles as globalStyles } from '../../utils/styles';

const ProfileDisplay = React.memo(({ name, gender, mobile, email, onEdit }) => (
    <View style={styles.container}>
        <View style={globalStyles.row}>
            <Text style={styles.title}>PERSONAL DETAILS</Text>
            <PrimaryButton
                style={{ marginTop: -12 }}
                textStyle={[typography.font16, { Color: AccentColor }]}
                title="Edit"
                onClick={onEdit}
            />
        </View>
        <View style={[globalStyles.row, { justifyContent: 'flex-start', marginTop: 20 }]}>
            <Icon name="account-circle" size={40} />
            <View style={spacing.ml3}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.detail}>
                    Gender: {gender === 'first' ? 'Male' : 'Female'}
                </Text>
                <Text style={styles.detail}>{mobile}</Text>
                <Text style={styles.detail}>{email}</Text>
            </View>
        </View>
    </View>
));

const styles = StyleSheet.create({
    container: {
        ...spacing.mh2,
        ...spacing.br3,
        ...spacing.mt2,
        ...spacing.p3,
        backgroundColor: WhiteColor,
        height: 300,
    },
    title: {
        ...typography.font16,
        ...typography.textBold,
        color: '#17171f',
    },
    name: {
        ...typography.font20,
        ...typography.textBold,
        color: '#17171f',
    },
    detail: {
        ...typography.font14,
        color: '#17171f',
    },
});

export default ProfileDisplay;
