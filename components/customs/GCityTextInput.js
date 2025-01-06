import { View, Text, TextInput } from "react-native";
import { styles, width } from "../../utils/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryColor, Black1Color } from "../../utils/colors";

const GCityTextInput = ({ icon, label, placeholder, onChangeText, value }) => (
  <View style={styles.pickDropSelector}>
    <Icon name={icon} size={28} color="#777" />
    <View style={{ marginHorizontal: 10 }}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        style={[styles.title]}
        placeholder={placeholder}
        clearTextOnFocus={true}
        placeholderTextColor={Black1Color}
        cursorColor={PrimaryColor}
        maxLength={48}
        multiline={false}
        numberOfLines={1}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  </View>
);

export default GCityTextInput;
