import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { styles } from "../utils/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RadioButton } from "react-native-paper";
import { Black1Color } from "../utils/colors";
import PrimaryButton from "../components/buttons/PrimaryButton";
import GPhoneInput from "../components/GPhoneInput";
import { useNavigation } from "@react-navigation/native";
import TextInput from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../actions/userActions";

export default function EditableContent({ setEditable }) {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checked, setChecked] = useState("second");
  const [uname, setUname] = useState("");
  // Use useSelector hook to retrieve data from store
  const { email_id, mobile_number, name } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const saveDetails = () => {
    setEditable(false);
    // use useDispatch hook to save data to the store and call a function
    dispatch(editProfile({ mobile_number: phoneNumber, name: uname }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "lightgrey" }}>
      <View style={[styles.main1, { height: 460 }]}>
        <Text style={[styles.stdText, { color: "black" }]}>
          PERSONAL DETAILS
        </Text>

        <View style={[styles.row, { paddingTop: 20 }]}>
          <View>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={uname}
              onChangeText={setUname}
            />
            <Text style={[styles.stdText, { fontSize: 18, color: "#555" }]}>
              Gender
            </Text>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <View style={styles.radioButton}>
                <Text style={{ fontSize: 14.8 }}>Male</Text>
                <RadioButton
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                />
              </View>
              <View style={styles.radioButton}>
                <Text style={{ fontSize: 14.5 }}>Female</Text>
                <RadioButton
                  value="second"
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked("second")}
                />
              </View>
            </View>
            <Text style={styles.text1}>Mobile Number</Text>

            <GPhoneInput onChangeText={setPhoneNumber} />
          </View>
        </View>

        <View style={[styles.row, { justifyContent: "flex-end" }]}>
          <PrimaryButton
            style={{ backgroundColor: "transparent", marginTop: -6 }}
            textStyle={{
              color: "dodgerblue",
              fontSize: 16,
              fontWeight: "bold",
            }}
            title="DONE"
            onClick={() => saveDetails()}
          />
          <PrimaryButton
            style={{ backgroundColor: "transparent", marginTop: -6 }}
            textStyle={{
              color: "dodgerblue",
              fontSize: 16,
              fontWeight: "bold",
            }}
            title="CANCEL"
            onClick={() => setEditable(false) && showEditButton(true)}
          />
        </View>
      </View>
      <PrimaryButton
        style={{ backgroundColor: "#fff", marginHorizontal: 8 }}
        textStyle={{ color: "#777" }}
        title="Change Email"
        onClick={() => navigation.navigate("UpdateEmail")}
      />
    </View>
  );
}
