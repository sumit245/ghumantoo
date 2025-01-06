import { View, Text } from 'react-native'
import { height, styles } from '../../utils/styles'


const Boarding = () => {
    return (
        <View >
            <Text style={styles.headerTitleText}>Boarding Points</Text>
            <Text style={styles.subHeadingBottomSheet}>Delhi</Text>

            <View style={[styles.row, { padding: 20, justifyContent: 'none' }]}>
                <View style={{ marginRight: 20 }}>
                    <Text style={[styles.stdTextBottomSheet, { fontWeight: 'bold', }]}>20:00</Text>
                    <Text style={{ opacity: .6, marginBottom: 20 }}>6 May</Text>


                    <Text style={[styles.stdTextBottomSheet, { fontWeight: 'bold', }]}>20:40</Text>
                    <Text style={{ opacity: .6 }}>6 May</Text>
                </View>

                <View style={{ borderRadius: 5, marginTop: 11, height: 75, backgroundColor: 'lightgrey', marginRight: 20 }}>
                    <View style={{ width: 7, backgroundColor: 'black', height: 7, borderRadius: 50, marginBottom: 65 }}></View>
                    <View style={{ width: 7, backgroundColor: 'black', height: 7, borderRadius: 50 }}></View>
                </View>

                <View>
                    <Text style={[styles.stdTextBottomSheet, { fontWeight: 'bold' }]}>ISBT Kashmiri Gate</Text>
                    <Text style={{ width: 180, fontSize: 12, opacity: .6, marginBottom: 8 }}>Parking No. 1 Near Kashmiri Gate Metro Gate No. 1, Delhi</Text>
                    <Text style={[styles.stdTextBottomSheet, { fontWeight: 'bold' }]}>Gautam Buddha Gate Chilla Border</Text>
                    <Text style={{ width: 180, fontSize: 12, opacity: .6 }}>Gautam Buddha Gate, Chilla</Text>
                </View>


            </View>


        </View>
    )
}

export default Boarding
