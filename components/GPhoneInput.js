import PhoneInput from "react-native-phone-number-input";
import { styles, width } from "../utils/styles";
import { Black1Color, PrimaryColor } from "../utils/colors";

export default function GPhoneInput({ onChangeText }) {
    return (
        <PhoneInput
            defaultCode="IN"
            textInputProps={{
                returnKeyType: 'done',
                keyboardType: 'number-pad',
                selectionColor: PrimaryColor,
                placeholderTextColor: Black1Color,
                maxLength: 10,
            }}
            autoFocus={true}
            layout="second"
            containerStyle={[styles.phoneTextContainerStyle, { width: width - 40 }]}
            textInputStyle={styles.phoneTextInputStyle}
            codeTextStyle={styles.phoneCodeTextStyle}
            onChangeFormattedText={(text) => onChangeText(text)}
        />
    )
}