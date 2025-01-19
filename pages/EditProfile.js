import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RadioButton } from "react-native-paper";
import { Black1Color } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../actions/userActions";
import { styles } from "../utils/styles";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/buttons/PrimaryButton";
import GPhoneInput from "../components/GPhoneInput";

export default function EditProfile() {
  const navigation = useNavigation();

  const [checked, setChecked] = useState("second");
  const [editable, setEditable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uname, setUname] = useState("");

  // Use useSelector hook to retrieve data from store
  const { email_id, mobile_number, name } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const saveDetails = () => {
    setEditable(false);
    // use useDispatch hook to save data to the store and call a function
    dispatch(editProfile({ mobile_number: phoneNumber, name: uname }));
  };

  if (!editable) {
    return (
      <View style={{ flex: 1, backgroundColor: "lightgrey" }}>
        <View style={styles.main1}>
          <View style={styles.row}>
            <Text style={[styles.stdText, { color: Black1Color }]}>
              PERSONAL DETAILS
            </Text>
            <PrimaryButton
              style={{ backgroundColor: "transparent", marginTop: -12 }}
              textStyle={{
                color: "dodgerblue",
                fontSize: 16,
                fontWeight: "bold",
              }}
              title="Edit"
              onClick={() => setEditable(true)}
            />
          </View>
          <View
            style={[
              styles.row,
              { justifyContent: "flex-start", marginTop: 20 },
            ]}
          >
            <Icon name="account-circle" size={40} />

            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text1}>{name}</Text>
              <Text style={styles.text1}>19</Text>
              <Text style={styles.text1}>Gender</Text>
              <View style={[styles.row, { padding: 0 }]}>
                <Text style={styles.male}>Male</Text>
                <RadioButton
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                  disabled
                />
                <Text style={styles.male}>Female</Text>
                <RadioButton
                  value="second"
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked("second")}
                  disabled
                />
              </View>
              <Text style={styles.text1}>Mobile Number</Text>
              <Text style={styles.text1}>{mobile_number}</Text>
            </View>
          </View>
        </View>
        <PrimaryButton
          style={{ backgroundColor: "#fff", marginHorizontal: 8 }}
          textStyle={{ color: "#777" }}
          title="Change Email"
        />
      </View>
    );
  } else {
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
          onClick={() => navigation.navigate()}
        />
      </View>
    );
  }
}

//     marginHorizontal: 8,
//     height: 300,
//     marginTop: 20,
//     padding: 12,
//     borderRadius: 15,
//   },
//   title: {
//     height: 100,
//     backgroundColor: "orange",
//   },
//   headerTitleText: {
//     alignItems: "center",
//     fontSize: 20,
//     marginTop: 39,
//     marginLeft: 14,
//     fontWeight: "bold",
//   },
//   first: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   second: {
//     flexDirection: "row",
//     margin: 20,
//     padding: 10,
//   },
//   btnPhone: {
//     height: 60,
//     width: 290,
//     borderColor: "#c7c7c7",
//     borderWidth: 1,
//     // backgroundColor: "#fff",
//     borderRadius: 12,
//     // alignItems: "center",
//     flexDirection: "row",
//     // justifyContent: "space-evenly",
//     marginVertical: 5,
//   },
//   text: {
//     marginBottom: 7,
//     color: "darkgray",
//   },
//   edit: {
//     color: "dodgerblue",
//     fontWeight: "bold",
//   },
//   heading: {
//     color: "gray",
//     margin: 8,
//   },
//   radio: {
//     flexDirection: "row",
//   },
//   email: {
//     backgroundColor: WhiteColor,
//     height: 50,
//     marginTop: 50,
//     marginHorizontal: 8,
//     justifyContent: "center",
//   },
//   textemail: {
//     fontSize: 16,
//     marginHorizontal: 8,
//     color: "grey",
//   },

//   phone: {
//     width: 100, // Set the width of the PhoneInput component's containe
//     height: 50,
//   },
//   down: {
//     flexDirection: "row",
//   },
//   done: {
//     color: "dodgerblue",
//     marginHorizontal: 18,
//     fontWeight: "bold",
//   },

//   male: {
//     color: "gray",
//     marginTop: 6,
//   },
//   female: {
//     marginTop: 6,
//   },
//   input: {
//     height: 55,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 15,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     fontSize: 18,
//   },
// });
