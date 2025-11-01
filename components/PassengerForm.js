import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { spacing } from '../utils/spacing.styles';
import { styles } from '../utils/styles';
import { typography } from '../utils/typography';
import { DangerColor } from '../utils/colors';

const PassengerForm = ({
    name,
    setName,
    age,
    setAge,
    phone,
    setPhone,
    setAddress,
    checked,
    setChecked,
}) => {
    return (
        <>
            <Text style={styles.passenger.sectionTitle}>Contact Details</Text>
            <Text style={styles.passenger.section}>Ticket details will be send to </Text>

            <View style={{ marginVertical: 4 }}>
                <Text style={[styles.passenger.label, { marginBottom: 4 }]}>Passenger Name
                    <Text style={{ color: DangerColor }}>*</Text></Text>
                <TextInput
                    style={styles.passenger.passengerInput}
                    placeholder="Passenger Name"
                    onChangeText={(text) => {
                        const alphabeticText = text.replace(/[^A-Za-z\s]/g, "");
                        setName(alphabeticText);
                    }}
                    value={name}
                />
            </View>

            <View style={{ marginVertical: 4 }}>
                <Text style={[styles.passenger.label, { marginBottom: 4 }]}>Passenger Age
                    <Text style={{ color: DangerColor }}>*</Text></Text>
                <TextInput
                    style={styles.passenger.passengerInput}
                    placeholder="Passenger Age"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, "");
                        setAge(numericText);
                    }}
                    value={age}
                />
            </View>

            <View style={{ marginVertical: 4 }}>
                <Text style={[styles.passenger.label, { marginBottom: 4 }]}>Phone Number
                    <Text style={{ color: DangerColor }}>*</Text></Text>
                <View style={styles.passenger.inputGroup}>
                    <TextInput
                        style={styles.passenger.input}
                        placeholder="Country Code"
                        defaultValue="+91 (IND)"
                        editable={false}
                    />
                    <TextInput
                        style={[styles.passenger.input, styles.passenger.number]}
                        placeholder="Phone"
                        keyboardType="numeric"
                        maxLength={10}
                        onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
                        value={phone}
                    />
                </View>
            </View>

            <View style={{ marginVertical: 4 }}>
                <Text style={[typography.font14]}>Gender</Text>
                <View style={[styles.passenger.row, spacing.mb2]}>
                    <View
                        style={[
                            spacing.pl2,
                            spacing.bw1,
                            spacing.mt2,
                            spacing.br5,
                            {
                                flexDirection: "row",
                                width: "48%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderColor: checked === "first" ? "red" : "gray",
                            },
                        ]}
                    >
                        <Text style={[typography.font14]}>Male</Text>
                        <RadioButton
                            value="first"
                            status={checked === "first" ? "checked" : "unchecked"}
                            onPress={() => setChecked("first")}
                            color="red"
                        />
                    </View>
                    <View
                        style={[
                            spacing.pl2,
                            spacing.bw1,
                            spacing.mt2,
                            spacing.br5,
                            spacing.p1,
                            {
                                flexDirection: "row",
                                width: "48%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderColor: checked === "second" ? "red" : "gray",
                            },
                        ]}
                    >
                        <Text style={[typography.font14]}>Female</Text>
                        <RadioButton
                            value="second"
                            status={checked === "second" ? "checked" : "unchecked"}
                            onPress={() => setChecked("second")}
                            color="red"
                        />
                    </View>
                </View>
            </View>

            <View style={{ marginVertical: 4 }}>
                <Text style={[styles.passenger.label, { marginBottom: 4 }]}>Address
                    <Text style={{ color: DangerColor }}>*</Text>
                </Text>
                <View style={styles.passenger.inputGroup}>
                    <TextInput
                        style={[styles.passenger.passengerInput, { flex: 1, height: 80 }]}
                        placeholder="Address"
                        numberOfLines={4}
                        multiline={true}
                        maxLength={100}
                        onChangeText={(text) => setAddress(text)}
                    />
                </View>
            </View>
        </>
    );
};

export default PassengerForm;
