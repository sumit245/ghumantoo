import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { styles } from '../../utils/styles';
import { Black1Color } from '../../utils/colors';

const WhyThisBus = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Text style={styles.headerTitleText}>Why Travel With Us</Text>
            <TouchableOpacity style={[{ borderRadius: 15, padding: 20, backgroundColor: '#fff' }]} onPress={toggleExpanded}>


                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <Entypo name='location' size={20} color={Black1Color} />
                    <Text style={{ fontWeight: 'bold' }}>Live Location Tracking</Text>
                    <Entypo name={expanded ? 'chevron-thin-up' : 'chevron-thin-down'} size={14} color={Black1Color} />
                </View>


                {expanded && (
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: 300, width: 200, fontSize: 16, marginHorizontal: 45, }}>You can now track your bus and plan your commute to the boarding point! Family members and friends can also check the bus location to coordinate pick-ups and rest assured about your safety.</Text>
                    </View>
                )}



            </TouchableOpacity>
        </>
    );
};

export default WhyThisBus;
