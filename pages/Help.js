import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../utils/styles";
import { PrimaryColor, PureWhite } from "../utils/colors";
import { List } from 'react-native-paper';
import { faqs } from "../faker/faqs";

export default function Help() {
  return (
    <SafeAreaView style={[styles.container, { marginHorizontal: 8, paddingHorizontal: 2 }]}>

      <View style={styles.headerTitle}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.headerTitleText, { color: PrimaryColor }]}>Ghumantoo: Buddy</Text>
          <TouchableOpacity>
            <Icon
              name="chatbubble-ellipses-outline"
              size={24}
              color={PrimaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <TouchableOpacity style={[styles.row, { marginVertical: 2, paddingVertical: 12, backgroundColor: PureWhite }]}>
          <Text style={[styles.bottomText, { padding: 4 }]}>View all issues</Text>
          <Icon name="chevron-forward" size={20} />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>FAQs(Select a help topic)</Text>
        </View>

        <List.AccordionGroup>
          {
            faqs.map((faq, index) => (
              <List.Accordion
                key={index}
                id={faq.id}
                title={faq.title}
                description={faq.description}
                left={props => <List.Icon {...props} color={PrimaryColor} icon={faq.icon} />}>
                <List.Item>
                  {faq.component}
                </List.Item>
              </List.Accordion>
            ))
          }
        </List.AccordionGroup>

      </ScrollView>
    </SafeAreaView>
  );
}