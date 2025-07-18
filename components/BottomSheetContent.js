import { View, Text, FlatList, SafeAreaView } from "react-native"
import { styles } from "../utils/styles"
import WhyThisBus from "./BottomSheetVerticalData/WhyThisBus"
import BusRoutes from "./BottomSheetVerticalData/BusRoute"
import Boarding from "./BottomSheetVerticalData/Boarding"
import Dropping from "./BottomSheetVerticalData/Dropping"
import Rest from "./BottomSheetVerticalData/Rest"
import Reviews from "./BottomSheetVerticalData/Reviews"
import Cancellation from "./BottomSheetVerticalData/Cancellation"
import OtherPolicies from "./BottomSheetVerticalData/OtherPolicies"

const HorizontalData = [
    {
        id: '1',
        title: 'Why book this bus?',
        verticalData: <WhyThisBus />,
    },
    {
        id: '2',
        title: 'Bus route',
        verticalData: <BusRoutes />,
    },
    {
        id: '3',
        title: 'Boarding Point',
        verticalData: <Boarding />,
    },
    {
        id: '4',
        title: 'Dropping points',
        verticalData: <Dropping />,
    },
    {
        id: '5',
        title: 'Rest Stops',
        verticalData: <Rest />,
    },
    {
        id: '7',
        title: 'Reviews',
        verticalData: <Reviews />
    },
    {
        id: '8',
        title: 'Cancellation policy',
        verticalData: <Cancellation />
    },
    {
        id: '9',
        title: 'Other Policies',
        verticalData: <OtherPolicies />
    },
]


const BottomSheetContent = () => {
    return (
        <View>
            <SafeAreaView >
                <FlatList
                    data={HorizontalData}
                    renderItem={({ item }) => {
                        return (
                            <View style={[styles.tableRow, { padding: 11, }]}>
                                <Text style={{ fontSize: 16 }}>{item.title}</Text>
                            </View>

                        )
                    }}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>

            <SafeAreaView style={{ padding: 20 }}>
                <FlatList
                    style={{ marginBottom: 80 }}
                    showsVerticalScrollIndicator={false}
                    data={HorizontalData}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ paddingVertical: 20, borderBottomColor: '#c7c7c7', borderBottomWidth: 1, }}>
                                {item.verticalData}
                            </View>
                        )
                    }}
                />
            </SafeAreaView>

        </View>
    )
}

export default BottomSheetContent
