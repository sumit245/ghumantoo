import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import GPhoneInput from '../GPhoneInput';
import PrimaryButton from '../buttons/PrimaryButton';
import { WhiteColor, typography, spacing, styles as globalStyles } from '../../utils/styles';

const ProfileEditForm = React.memo(({
    name,
    gender,
    phoneNumber,
    email,
    onNameChange,
    onGenderChange,
    onPhoneChange,
    onEmailChange,
    onSave,
}) => (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text style={styles.title}>PERSONAL DETAILS</Text>

            <View style={[globalStyles.row, { paddingTop: 20 }]}>
                <View>
                    <TextInput
                        placeholder="Name"
                        style={globalStyles.input}
                        value={name}
                        onChangeText={onNameChange}
                    />

                    <Text style={styles.label}>Gender</Text>
                    <View style={[globalStyles.row, spacing.mb2]}>
                        <View style={[styles.genderOption, { borderColor: gender === 'first' ? 'red' : 'gray' }]}>
                            <Text style={styles.label}>Male</Text>
                            <RadioButton
                                value="first"
                                status={gender === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => onGenderChange('first')}
                                color="red"
                            />
                        </View>
                        <View style={[styles.genderOption, { borderColor: gender === 'second' ? 'red' : 'gray' }]}>
                            <Text style={styles.label}>Female</Text>
                            <RadioButton
                                value="second"
                                status={gender === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => onGenderChange('second')}
                                color="red"
                            />
                        </View>
                    </View>

                    <Text style={styles.label}>Mobile Number</Text>
                    <GPhoneInput onChangeText={onPhoneChange} />

                    <Text style={styles.label}>Email ID</Text>
                    <TextInput
                        placeholder="Email ID"
                        style={globalStyles.input}
                        value={email}
                        onChangeText={onEmailChange}
                    />
                </View>
            </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <PrimaryButton
                style={spacing.mh2}
                title="Save Changes"
                onClick={onSave}
            />
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
        height: 460,
    },
    title: {
        ...typography.font18,
        ...typography.textBold,
        color: '#17171f',
    },
    label: {
        ...typography.font14,
        color: '#17171f',
    },
    genderOption: {
        ...spacing.pl2,
        ...spacing.bw1,
        ...spacing.mt2,
        ...spacing.br5,
        flexDirection: 'row',
        width: '48%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default ProfileEditForm;
