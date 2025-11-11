import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { PureWhite, LightGray, BlackColor, DarkGray, spacing, typography, layouts } from "../utils/styles";

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
    <View style={[layouts.container, spacing.ph3, { backgroundColor: PureWhite }]}>
      <View style={[layouts.rowCenter, spacing.mt4, spacing.mb3, { borderBottomWidth: 1, borderBottomColor: LightGray, paddingBottom: 8 }]}>
        <View style={[layouts.rowCenter, spacing.ph3, { borderRadius: 24, backgroundColor: PureWhite, height: 55, flex: 1 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={24}
              color={BlackColor}
              style={spacing.mr2}
            />
          </TouchableOpacity>
          <TextInput
            style={[typography.font14, { flex: 1, color: BlackColor }]}
            placeholder="Search Boarding Point"
            placeholderTextColor={DarkGray}
            value={city}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {!selectedCity && (
        <ScrollView style={[spacing.mt3, spacing.pv2]}>
          {filteredData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => selectCity(item.city)}
              style={[spacing.pv2, { borderBottomWidth: 1, borderBottomColor: LightGray }]}
            >
              <Text style={typography.font16}>
                {item.city
                  .split(new RegExp(`(${city})`, "gi"))
                  .map((part, index) => (
                    <Text
                      key={index}
                      style={
                        part.toLowerCase() === city.toLowerCase()
                          ? [typography.font16, typography.textBold, { color: BlackColor }]
                          : [typography.font16, { color: DarkGray }]
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

export default SearchCity;
