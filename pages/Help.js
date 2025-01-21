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
import {
  PrimaryColor,
  PureWhite,
  Black1Color,
  BlackColor,
} from "../utils/colors";
import { List } from "react-native-paper";
import { faqs } from "../faker/faqs";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

export default function Help() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };
  return (
    <SafeAreaView style={[styles.container, spacing.ph1]}>
      <View style={[spacing.p3]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              typography.font24,
              typography.textBold,
              { color: PrimaryColor },
            ]}
          >
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
            spacing.mv1,
            spacing.pv2,
            spacing.br2,
            { backgroundColor: PureWhite },
          ]}
        >
          <Text
            style={[
              typography.font14,
              typography.textBold,
              spacing.pb2,
              spacing.p2,
            ]}
          >
            View all issues
          </Text>
          <Icon name="chevron-forward" size={20} />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Text style={[typography.font22, { color: Black1Color }]}>
            FAQs(Select a help topic)
          </Text>
        </View>
        {faqs.map((faq) => (
          <View
            key={faq.id}
            style={[
              spacing.br2,
              spacing.mb2,
              spacing.p3,
              {
                backgroundColor: PureWhite,
              },
            ]}
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
                  style={[typography.font14, typography.textBold, spacing.ml1]}
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
              <Text
                style={[typography.font12, spacing.mt2, { color: BlackColor }]}
              >
                {faq.description}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
