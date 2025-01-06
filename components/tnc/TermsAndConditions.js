import { Linking, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../utils/styles'
import { PrimaryColor } from '../../utils/colors'

export default function TermsAndConditions({ text }) {
    return (
        <Text style={styles.termsCondition}>
            {text}
            <TouchableOpacity onPress={() => Linking.openURL("https://vindhyashrisolutions.com/policy/69/privacy-policy")}>
                <Text style={{ textDecorationLine: 'underline', color: PrimaryColor, fontSize: 12, textAlignVertical: 'top', position: 'relative', top: 4 }}> Terms and Conditions </Text>
            </TouchableOpacity>
            {" "}and
            <TouchableOpacity onPress={() => Linking.openURL("https://vindhyashrisolutions.com/policy/71/terms-and-conditions")}>
                <Text style={{ textDecorationLine: 'underline', color: PrimaryColor, fontSize: 12, textAlignVertical: 'bottom' }}> Privacy Policy</Text>
            </TouchableOpacity>
        </Text>
    )
}