import { View, Text } from "react-native";
import { styles } from "../../utils/styles";
import Entypo from 'react-native-vector-icons/Entypo'

const Review = ({ icon, text, good }) => {
  return (
    <View style={{ margin: 5, backgroundColor: good ? 'lightgreen' : 'lightgrey', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10 }}>
      <Text>{icon && <Entypo name={good ? 'thumbs-up' : 'thumbs-down'} />} {text}</Text>
    </View>
  )
}

export default Review
