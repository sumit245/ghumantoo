import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const SearchCity = () => {
  const [city, setCity] = useState("");
  const [cachedData, setCachedData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigation = useNavigation();

  const getDataFromCache = () => {
    setCachedData([
      { id: "1", city: "Bangalore" },
      { id: "2", city: "Chennai" },
      { id: "3", city: "Hyderabad" },
      { id: "4", city: "Mumbai" },
      { id: "5", city: "Delhi" },
      { id: "6", city: "Satna" },
    ]);
  };

  useEffect(() => {
    getDataFromCache();
  }, []);

  const handleSearch = (text) => {
    setCity(text);
    setSelectedCity(null);
  };

  const selectCity = (selectedCity) => {
    setCity(selectedCity);
    setSelectedCity(selectedCity);
  };

  const filteredData =
    city.length > 0 && !selectedCity
      ? cachedData.filter((item) =>
          item.city.toLowerCase().startsWith(city.toLowerCase())
        )
      : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Search Boarding Point"
            placeholderTextColor="#aaa"
            value={city}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {!selectedCity && (
        <ScrollView style={styles.scrollView}>
          {filteredData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => selectCity(item.city)}
              style={styles.cityItem}
            >
              <Text style={styles.suggestionText}>
                {item.city
                  .split(new RegExp(`(${city})`, "gi"))
                  .map((part, index) => (
                    <Text
                      key={index}
                      style={
                        part.toLowerCase() === city.toLowerCase()
                          ? styles.matchedText
                          : styles.unmatchedText
                      }
                    >
                      {part}
                    </Text>
                  ))}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    height: 55,
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "black",
  },
  scrollView: {
    marginTop: 12,
    paddingVertical: 8,
  },
  cityItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionText: {
    fontSize: 16,
  },
  matchedText: {
    color: "black",
    fontWeight: "bold",
  },
  unmatchedText: {
    color: "gray",
  },
});

export default SearchCity;
