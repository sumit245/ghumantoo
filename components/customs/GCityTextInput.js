// file: ../components/customs/GCityTextInput.js

import React, { useRef, useState, useCallback } from 'react';
import { View, Text } from "react-native";
import { height, styles, width } from "../../utils/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryColor, Black1Color, LightGray, DarkGray, WhiteColor } from "../../utils/colors";
import { typography } from "../../utils/typography";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { fetchCounters } from "../../actions/busActions";

// FIX: Renamed props for clarity.
// 'value' is now 'selectedItem' (expects { id, title })
// 'onChangeText' is now 'onSelectItem' (the callback)
export default function GCityTextInput({ icon, label, placeholder, onSelectItem, selectedItem }) {
  const dropdownController = useRef(null);
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);

  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase();
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    const items = await fetchCounters(filterToken);
    const suggestions = items.map(item => ({
      id: item.city_id,
      title: item.city_name,
    }));
    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const handleSelectItem = item => {
    if (item) {
      onSelectItem(item); // Pass the entire { id, title } object up
    }
  };

  const handleClear = () => {
    setSuggestionsList(null);
    onSelectItem(null); // Notify parent that the selection was cleared
  };

  return (
    <View style={styles.pickDropSelector}>
      <Icon name={icon} size={28} color={DarkGray} />
      <View style={{ marginHorizontal: 2 }}>
        <Text style={[typography.font16, { marginLeft: 12 }]}>{label}</Text>
        <AutocompleteDropdown
          // FIX: Use the `initialValue` prop to set the displayed text from the parent's state.
          // This makes the component "controlled".
          initialValue={selectedItem}
          controller={controller => {
            dropdownController.current = controller;
          }}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={handleSelectItem}
          onClear={handleClear}
          loading={loading}
          useFilter={false}
          debounce={600}
          // Other props remain the same...
          textInputProps={{
            placeholderTextColor: LightGray,
            cursorColor: PrimaryColor,
            style: styles.title,
            placeholder: placeholder,
          }}
          inputContainerStyle={{
            backgroundColor: 'transparent',
            width: width - 100
          }}
          suggestionsListContainerStyle={{
            backgroundColor: WhiteColor,
            borderColor: LightGray,
            borderWidth: 1,
            elevation: 1
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item) => (
            <View style={{ height: 48, justifyContent: 'flex-start', padding: 4, flexDirection: 'row', alignItems: 'center' }}>
              <Icon name={icon} size={20} color={DarkGray} />
              <Text style={{ paddingHorizontal: 4, fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}