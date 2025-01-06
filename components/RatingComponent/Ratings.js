import { View, Text } from 'react-native'
import { styles } from '../../utils/styles'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Ratings = ({star, percent}) => {
    return (
        <View style={styles.row}>
            <Text style={{fontSize:16,fontWeight:600}}>{star} <AntDesign name='star' size={15} /></Text>

            <View style={{ width: '75%', backgroundColor: 'lightgrey', borderRadius: 10, height: 5, marginTop: 8 }}>
                <View style={{ width: `${percent}%`, backgroundColor: 'black', height: 5, borderRadius: 10 }} />
            </View>
            <Text style={{fontSize:16,fontWeight:500}}>{percent}%</Text>
        </View>
    )
}

export default Ratings
