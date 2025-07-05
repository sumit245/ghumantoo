import { Linking, Text } from 'react-native'
import { styles } from '../../utils/styles'
import { PrimaryColor } from '../../utils/colors'

export default function TermsAndConditions({ text }) {
    return (
        <Text style={styles.termsCondition}>
            {text}
            <Text style={{ textDecorationLine: 'underline', color: PrimaryColor, fontWeight: 600, }} onPress={() => Linking.openURL("https://vindhyashrisolutions.com/policy/69/privacy-policy")}> Terms and Conditions </Text>
            {" "}and{" "}
            <Text style={{ textDecorationLine: 'underline', color: PrimaryColor, fontWeight: 600, }} onPress={() => Linking.openURL("https://vindhyashrisolutions.com/policy/71/terms-and-conditions")}> Privacy Policy</Text>
        </Text>
    )
}