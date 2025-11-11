import PhoneInput from "react-native-phone-number-input";
import { styles, width, Black1Color, PrimaryColor, typography } from "../utils/styles";

export default function GPhoneInput({ onChangeText }) {
  return (
    <PhoneInput
      defaultCode="IN"
      textInputProps={{
        returnKeyType: "done",
        keyboardType: "number-pad",
        selectionColor: PrimaryColor,
        placeholderTextColor: Black1Color,
        maxLength: 10,
      }}
      autoFocus={true}
      layout="second"
      containerStyle={[styles.phoneTextContainerStyle, { width: width - 40 }]}
      textInputStyle={styles.phoneTextInputStyle}
      codeTextStyle={[typography.font16, { color: '#17171f' }]}
      onChangeFormattedText={(text) => onChangeText(text)}
    />
  );
}
