import { View, Text, StyleSheet} from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Boarding = () => {
  return (
    <View style = {styles.wrapper}>
        <View style = {styles.selectedBoarding}>
            <Text style = {{paddingLeft:12, marginVertical:10}}>Your Selected Boarding Point</Text>
            <View style = {{borderBottomColor:'grey',borderBottomWidth:1}}></View>

            <View style = {{flex:1,flexDirection:'row',alignItems:'center',paddingHorizontal:15, marginTop:-15}}>
                <View style = {{marginRight:10, marginTop:-18}}>
                    <Text style= {{fontWeight:'bold',fontSize:18}}>20:20</Text>
                    <Text style={{textAlign:'center', opacity:0.6}}>29 Apr</Text>
                </View>

                <View style = {{width:200}}>
                    <Text style= {{fontWeight:'bold',textAlign:'center',fontSize:15}}>ISBT Kashmiri Gate</Text>
                    <Text style = {{flexWrap:'wrap',textAlign:'center',opacity:0.6}}>Kashmiri Gate Metro Station Gate No. 5</Text>
                </View>
                <FontAwesome
                    style = {{paddingLeft:45}}
                    name = 'circle-thin'
                    size = {20}
                />
            </View>
        </View>

        <View style = {styles.otherBoardings}>
            <Text style = {{paddingLeft:12, marginVertical:10}}>Your Selected Boarding Point</Text>
            <View style = {{}}></View>

            <View style = {{flex:1,flexDirection:'row',alignItems:'center',paddingHorizontal:15,borderTopColor:'grey',borderTopWidth:1}}>
                <View style = {{marginRight:10, marginTop:-18}}>
                    <Text style= {{fontWeight:'bold',fontSize:18}}>20:20</Text>
                    <Text style={{textAlign:'center', opacity:0.6}}>29 Apr</Text>
                </View>

                <View style = {{width:200}}>
                    <Text style= {{fontWeight:'bold',textAlign:'center',fontSize:15}}>ISBT Kashmiri Gate</Text>
                    <Text style = {{flexWrap:'wrap',textAlign:'center',opacity:0.6}}>Kashmiri Gate Metro Station Gate No. 5</Text>
                </View>
                <FontAwesome
                    style = {{paddingLeft:45}}
                    name = 'circle-thin'
                    size = {20}
                />
            </View>
            <View style = {{flex:1,flexDirection:'row',alignItems:'center',paddingHorizontal:15,borderTopColor:'grey',borderTopWidth:1}}>
                <View style = {{marginRight:10, marginTop:-18}}>
                    <Text style= {{fontWeight:'bold',fontSize:18}}>21:00</Text>
                    <Text style={{textAlign:'center', opacity:0.6}}>29 Apr</Text>
                </View>

                <View style = {{width:200}}>
                    <Text style= {{fontWeight:'bold',textAlign:'center',fontSize:15}}>Akshardham Metro Station</Text>
                    <Text style = {{flexWrap:'wrap',textAlign:'center',opacity:0.6}}>Akshardham Metro Station Pillar No.36 Above Flyover</Text>
                </View>
                <FontAwesome
                    style = {{paddingLeft:45}}
                    name = 'circle-thin'
                    size = {20}
                />
            </View>
        </View>
        

    </View>
  )
}

const styles = StyleSheet.create({
    wrapper:{
        paddingHorizontal:5,
        paddingVertical:20
    },

    selectedBoarding:{
        width:"100%",
        height:130,
        borderRadius:18,
        borderColor:'black',
        borderWidth:1,
        backgroundColor:'#ffffff'
    },

    otherBoardings:{
        height:200,
        marginTop:15,
        width:"100%",
        borderRadius:18,
        borderColor:'black',
        borderWidth:1,
        backgroundColor:'#ffffff',
    }
})

export default Boarding
