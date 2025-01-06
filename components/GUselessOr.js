import { View, Text } from 'react-native'
import { styles } from '../utils/styles'

export default function GUselessOr() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
        </View>
    )
}