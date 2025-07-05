import { View, Text } from "react-native";
import { height, styles, width } from "../../utils/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryColor, Black1Color, LightGray, DarkGray, WhiteColor } from "../../utils/colors";
import { typography } from "../../utils/typography";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useCallback, useRef, useState } from "react";
import { fetchCounters } from "../../actions/busActions";


export default function GCityTextInput({ icon, label, placeholder, onChangeText, value }) {
  const searchRef = useRef()
  const dropdownController = useRef(null)
  const [loading, setLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', q)
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setLoading(true)
    const items = await fetchCounters(filterToken)
    const suggestions = items
      .map(item => ({
        id: item.city_id,
        title: item.city_name,
      }))
    setSuggestionsList(suggestions)
    setLoading(false)
  }, [])

  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])


  return (
    <View style={styles.pickDropSelector}>
      <Icon name={icon} size={28} color={DarkGray} />
      <View style={{ marginHorizontal: 2 }}>
        <Text style={[typography.font16, { marginLeft: 12 }]}>{label}</Text>
        <AutocompleteDropdown
          // Props to control the auto suggestion
          ref={searchRef}
          controller={controller => {
            dropdownController.current = controller
          }}
          dataSet={suggestionsList}
          useFilter={false}
          debounce={600}
          matchFrom="start"
          onChangeText={getSuggestions}
          onSelectItem={item => {
            item && onChangeText(item.id)
          }}
          onClear={onClearPress}
          loading={loading}
          closeOnSubmit={false}
          // Props for Text Input
          textInputProps={{
            placeholderTextColor: Black1Color,
            cursorColor: PrimaryColor,
            multiline: false,
            style: styles.title,
            placeholder: placeholder,
            maxLength: 48,
            numberOfLines: 1,
          }}
          // Style for input container set background transparent to match parent style
          inputContainerStyle={{
            backgroundColor: 'transparent',
            width: width - 100
          }}
          // Style for right buttons (arrow and clear button)
          rightButtonsContainerStyle={{
            right: 40,
            alignSelf: 'center',
          }}
          // Style for opening container must match with parent
          suggestionsListContainerStyle={{
            backgroundColor: WhiteColor,
            borderColor: LightGray,
            borderWidth: 1,
            elevation: 1
          }}
          suggestionsListMaxHeight={height * 0.6}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => (
            <View style={{ height: 48, justifyContent: 'flex-start', padding: 4, flexDirection: 'row', alignItems: 'center' }}>
              <Icon name={icon} size={20} color={DarkGray} />
              <Text style={{ paddingHorizontal: 4, fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}
