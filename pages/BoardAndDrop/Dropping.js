import { View, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Dropping = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.selectedBoarding}>
                <Text style={{ paddingLeft: 12, marginVertical: 10 }}>Your Selected Boarding Point</Text>
                <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}></View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: -15 }}>
                    <View style={{ marginRight: 10, marginTop: -18 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>06:15</Text>
                        <Text style={{ textAlign: 'center', opacity: 0.6 }}>30 Apr</Text>
                    </View>

                    <View style={{ width: 200 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center',fontSize:15}}>Allhabad KFC</Text>
                        <Text style={{ flexWrap: 'wrap', textAlign: 'center', opacity: 0.6 }}>Allhabad Civil Line KFC Resturant</Text>
                    </View>
                    <FontAwesome
                        style={{ paddingLeft: 45 }}
                        name='circle-thin'
                        size={20}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 5,
        paddingVertical: 20
    },

    selectedBoarding: {
        width: "100%",
        height: 130,
        borderRadius: 18,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#ffffff'
    },
})

export default Dropping
