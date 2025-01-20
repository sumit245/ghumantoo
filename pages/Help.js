import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../utils/styles";
import { PrimaryColor, PureWhite, BlackColor } from "../utils/colors";
import { List } from "react-native-paper";
import { faqs } from "../faker/faqs";
import { typography } from "../utils/typography";

export default function Help() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };
  return (
    <SafeAreaView
      style={[styles.container, { marginHorizontal: 8, paddingHorizontal: 2 }]}
    >
      <View style={styles.headerTitle}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[styles.headerTitleText, { color: PrimaryColor }]}>
            Ghumantoo: Buddy
          </Text>
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
        <TouchableOpacity
          style={[
            styles.row,
            {
              marginVertical: 2,
              paddingVertical: 12,
              backgroundColor: PureWhite,
            },
          ]}
        >
          <Text style={[styles.bottomText, { padding: 4 }]}>
            View all issues
          </Text>
          <Icon name="chevron-forward" size={20} />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>FAQs(Select a help topic)</Text>
        </View>
        {faqs.map((faq) => (
          <View
            key={faq.id}
            style={{
              marginBottom: 8,
              backgroundColor: PureWhite,
              borderRadius: 8,
              padding: 12,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => toggleExpand(faq.id)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon color={PrimaryColor} icon={faq.icon} />
                <Text
                  style={[
                    typography.font14,
                    typography.textBold,
                    {
                      marginLeft: 4,
                    },
                  ]}
                >
                  {faq.title}
                </Text>
              </View>
              <Icon
                name={
                  expandedId === faq.id ? "chevron-down" : "chevron-forward"
                }
                size={20}
                color={BlackColor}
              />
            </TouchableOpacity>
            {expandedId === faq.id && (
              <Text style={{ marginTop: 8, color: "#555", fontSize: 12 }}>
                {faq.description}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
