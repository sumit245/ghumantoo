import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Boarding from "./Boarding"
import Dropping from "./Dropping"
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const BoardingAndDropping = () => {

    const [activeButton, setActiveButton] = useState("boarding")

    const handlePress = (point) => {
        setActiveButton(point)
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:40,width:'100%',backgroundColor:'#ffbf00',height:70}}>
        <EvilIcons
        style={{marginLeft:10}}
                    name='chevron-left'
                    size={25}
                />
            <Text style={{fontSize:18,marginLeft:10}}>Select Boarding & Dropping Points</Text>
        </View>
            <View style={{top: 10 }}>
                <View style={styles.head}>
                    <TouchableOpacity
                        style={[styles.headBtn, activeButton === 'boarding' && styles.activeBtn]}
                        onPress={() => { handlePress('boarding') }}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Boarding Points</Text>
                        <Text style={{ textAlign: 'center', opacity: .6 }}>ISBT Kashmiri Gate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.headBtn, activeButton === 'dropping' && styles.activeBtn]}
                        onPress={() => { handlePress('dropping') }}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Dropping Points</Text>
                        <Text style={{ textAlign: 'center', opacity: .6 }}>Prayagraj</Text>
                    </TouchableOpacity>
                </View >

                <View style={{ backgroundColor: "#E6E6EA", height: 521 }}>
                    {activeButton==='boarding'?<Boarding/>:<Dropping/>}
                </View>
            </View>

            <View style={{position:'absolute',width:'100%',height:80,elevation:2, bottom: 0,backgroundColor:"#fff"}}>
                <TouchableOpacity style = {{backgroundColor:"#F99333",marginHorizontal:50,marginVertical:19,borderRadius:18}}>
                    <Text style = {{textAlign:'center',marginVertical:8,fontSize:19}}>Proceed</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    head: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 70,
    },

    headBtn: {
        flex: 1,
        marginTop: 10,

    },

    activeBtn: {
        borderBottomColor: "#F99333",
        borderBottomWidth: 2,
    },
})

export default BoardingAndDropping
