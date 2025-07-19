import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { typography } from "../utils/typography";

// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { styles } from "../utils/styles";

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const paymentOptions = [
    { id: "1", name: "Credit Card", methods: "Visa,MasterCard,Maestro" },
    { id: "2", name: "Debit Card", methods: "Visa,MasterCard,Maestro" },
    { id: "3", name: "Wallets", methods: "Amazon,Paytm,Phonepe" },
    { id: "4", name: "Net Banking", methods: "HDFC,SBI,BOB,ICICI" },
    { id: "5", name: "UPI Payments", methods: "Google Pay,Mobikwik" },
  ];

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.paymentOption}>
      <TouchableOpacity onPress={() => handleOptionSelect(item.id)}>
        <FontAwesome
          style={{ paddingLeft: 5 }}
          name={selectedOption === item.id ? "dot-circle-o" : "circle-thin"}
          size={20}
        />
      </TouchableOpacity>
      <View style={{ width: "60%" }}>
        <Text style={styles.optionName}>{item.name}</Text>
        <Text style={styles.optionMethods}>{item.methods}</Text>
      </View>
      {selectedOption === item.id && (
        <TouchableOpacity style={styles.payButton}>
          <Text style={[typography.font14]}>
            Pay <MaterialIcons name="currency-rupee" size={12} />
            2799
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={style1.container}>
      <FlatList
        data={paymentOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          paddingTop: 8,
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          height: 75,
          width: "100%",
          backgroundColor: "#F9F9F9",
          justifyContent: "space-between",
          paddingRight: 5,
        }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              style={{ marginTop: 4, marginRight: -3 }}
              name="currency-rupee"
              size={21}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>2799</Text>
            <Text style={{ fontSize: 10, top: 8, opacity: 0.6 }}>
              [Exclusive Tax]
            </Text>
          </View>
          <View
            style={{
              marginLeft: 7,
              borderBottomWidth: 1,
              borderBottomColor: "grey",
              width: 80,
            }}
          >
            <Text style={{ fontSize: 12 }}>For 4/4 Seats</Text>
          </View>
        </View>

        <View style={{ fontSize: 14 }}>
          <TouchableOpacity
            style={{
              paddingVertical: 15,
              backgroundColor: "#f99333",
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
          >
            <Text>Trip Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 60,
  },
});

export default Payment;
