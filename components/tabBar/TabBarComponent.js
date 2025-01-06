import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { styles } from '../../utils/styles'
import { PrimaryColor, PureWhite } from '../../utils/colors'
import TicketComponent from '../TicketComponent'
import { Tickets } from '../../faker/tickets'


export default function TabBarComponent({ tabs }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [data, setData] = useState(Tickets)

    const toggleTabIndex = () => {
        setTabIndex(tabIndex === 0 ? 1 : 0);
        setData(tabIndex === 0 ? Tickets : [])
    };

    return (
        <>
            <View style={styles.tabContainer}>
                {
                    Array.isArray(tabs) && tabs.map((tab, index) => (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            key={index}
                            style={[
                                styles.tab,
                                {
                                    borderBottomColor: tab.index === tabIndex ? PrimaryColor : "#ededed",
                                    borderBottomWidth: tab.index === tabIndex ? 4 : 0,
                                },
                            ]}
                            onPress={toggleTabIndex}
                        >
                            <Text style={styles.tabLink}>{tab.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <TicketComponent
                        Traveldate={item.Traveldate}
                        Travelday={item.Travelday}
                        Transportname={item.Transportname}
                        Departuretime={item.Departuretime}
                        DepartureAddress={item.DepartureAddress}
                        TimeDuration={item.TimeDuration}
                        ArrivalTime={item.ArrivalTime}
                        ArrivalAddress={item.ArrivalAddress}
                        TicketNo={item.TicketNo}
                        PNR={item.PNR}
                        Fare={item.Fare}
                        BusProvider={item.BusProvider}
                        BusType={item.BusType}
                        PickUpPoint={item.PickUpPoint}
                        DropPoint={item.DropPoint}
                    />
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => (
                    <View style={{ backgroundColor: PureWhite, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: PrimaryColor, fontSize: 20 }}>Oops!!! No Details Available </Text>
                    </View>
                )}
            />
        </>
    )
}