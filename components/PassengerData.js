import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { styles } from "../utils/styles";
import { RadioButton } from "react-native-paper";

const PassengerData = ({ heading, passenger, child, navContinue }) => {
  const navigation = useNavigation();

  const [passengerData, setPassengerData] = useState([
    { id: "1", name: "", gender: "", age: "" },
  ]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.passengerItem}>
        <Text style={styles.passengerHeading}>
          {passenger} {item.id}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={item.name}
          onChangeText={(text) => handleChange(item.id, "name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={item.age}
          onChangeText={(text) => handleChange(item.id, "age", text)}
        />
        <Text
          style={{
            marginRight: 10,
            opacity: 0.6,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Gender
        </Text>
        <RadioButton.Group
          onValueChange={(value) => handleChange(item.id, "gender", value)}
          value={item.gender}
        >
          <View style={[styles.row, { padding: 0 }]}>
            <View style={styles.radioButton}>
              <Text style={{ fontSize: 14.8 }}>Male</Text>
              <RadioButton value="male" />
            </View>
            <View style={styles.radioButton}>
              <Text>Female</Text>
              <RadioButton value="female" />
            </View>
          </View>
          {!child && (
            <View style={styles.radioButton}>
              <Text style={{ fontSize: 14.8 }}>Other</Text>
              <RadioButton value="Other" />
            </View>
          )}
        </RadioButton.Group>
      </View>
    );
  };

  const handleChange = (id, field, value) => {
    const updatedPassengerData = passengerData.map((passenger) => {
      if (passenger.id === id) {
        return { ...passenger, [field]: value };
      }
      return passenger;
    });
    setPassengerData(updatedPassengerData);
  };

  const addPassenger = () => {
    const newPassenger = {
      id: (passengerData.length + 1).toString(),
      name: "",
      gender: "",
      age: "",
    };
    setPassengerData((prevState) => [...prevState, newPassenger]);
  };

  return (
    <View style={[styles.container, { marginHorizontal: 0, backgroundColor: '#c8c8c8', padding: 20, marginTop: 0 }]}>
      <View style={styles.headerPassengerJS}>
        <EvilIcons name="user" size={20} />
        <Text style={styles.headerText}>{heading} Information</Text>
      </View>
      <FlatList
        data={passengerData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      ></FlatList>
      {!child && (
        <TouchableOpacity
          style={[styles.passengerFloatingBtn, { bottom: 150, right: 20, }]}
        // onPress={() => navigation.navigate("Children Details")}
        >

          <Text style={styles.passengerFloatingText}>Traveling with a child?</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.passengerFloatingBtn, { bottom: 90, right: 20, }]}
        onPress={addPassenger}
      >

        <Text style={styles.passengerFloatingText}>Add {passenger}</Text>
      </TouchableOpacity>

      {/* Continue button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          navigation.navigate(navContinue);
        }}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>


    </View>
  );
};


export default PassengerData;
