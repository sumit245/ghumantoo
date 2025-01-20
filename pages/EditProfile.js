import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RadioButton } from "react-native-paper";
import { AccentColor, WhiteColor } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../actions/userActions";
import { styles } from "../utils/styles";
import PrimaryButton from "../components/buttons/PrimaryButton";
import GPhoneInput from "../components/GPhoneInput";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

export default function EditProfile() {
  const [checked, setChecked] = useState("second");
  const [editable, setEditable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");

  // Use useSelector hook to retrieve data from store
  const { email_id, mobile_number, name } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const saveDetails = () => {
    setEditable(false);
    dispatch(
      editProfile({ mobile_number: phoneNumber, name: uname, email_id: email })
    );
  };

  if (!editable) {
    return (
      <View style={{ flex: 1, backgroundColor: "lightgrey" }}>
        <View
          style={[
            spacing.mh2,
            spacing.br3,
            spacing.mt2,
            spacing.p3,
            { backgroundColor: WhiteColor, height: 300 },
          ]}
        >
          <View style={styles.row}>
            <Text style={[typography.font16, typography.textBold]}>
              PERSONAL DETAILS
            </Text>
            <PrimaryButton
              style={{ marginTop: -12 }}
              textStyle={[typography.font16, { Color: AccentColor }]}
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

            <View style={[spacing.ml3]}>
              <Text style={[typography.font20, typography.textBold]}>
                {name}
              </Text>
              <Text
                style={[
                  {
                    color:
                      checked === "first" || checked === "second"
                        ? "black"
                        : "gray",
                  },
                ]}
              >
                Gender: {checked === "first" ? "Male" : "Female"}
              </Text>

              <Text style={[typography.font14]}>{mobile_number}</Text>
              <Text style={[typography.font14]}>{email_id}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={[
            spacing.mh2,
            spacing.br3,
            spacing.mt2,
            spacing.p3,
            { backgroundColor: WhiteColor, height: 460 },
          ]}
        >
          <Text style={[typography.font18, typography.textBold]}>
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

              <Text style={[typography.font14]}>Gender</Text>
              <View style={[styles.row, spacing.mb2]}>
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

              <Text style={[typography.font14]}>Mobile Number</Text>
              <GPhoneInput onChangeText={setPhoneNumber} />
              <Text style={[typography.font14]}>Email ID</Text>
              <TextInput
                placeholder="Email ID"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <PrimaryButton
            style={[spacing.mh2]}
            title="Save Changes"
            onClick={() => saveDetails()}
          />
        </View>
      </View>
    );
  }
}
