import { View, Text } from 'react-native'
import { styles } from '../../utils/styles'

const Dropping = () => {
    return (
        <View>
            <Text style={styles.headerTitleText}>Dropping Points</Text>
            <Text style={styles.subHeadingBottomSheet}>Allahabad</Text>

            <View style={[styles.row, { padding: 20, justifyContent: 'none' }]}>
                <View style={{ marginRight: 20 }}>
                    <Text style={[styles.stdTextBottomSheet, { fontWeight: 'bold', }]}>20:00</Text>
                    <Text style={{ opacity: .6, }}>6 May</Text>

                </View>


                <View style={{ borderRadius: 50, marginTop: 11, width: 7, height: 7, backgroundColor: 'black', marginRight: 20 }} />

                <View>
                    <Text style={[styles.stdTextBottomSheet, { fontWeight: 'bold' }]}>Prayagraj</Text>
                    <Text style={{ width: 180, fontSize: 12, opacity: .6, }}>Civil Line Road Outside KFC</Text>
                </View>


            </View>
        </View>
    )
}

export default Dropping
