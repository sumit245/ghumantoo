import React from 'react'
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../utils/styles";
import { PureWhite } from "../utils/colors";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

export default function RateUs() {
  return (
    <>
      <Text style={[typography.font24, typography.textBold, spacing.ml4]}>Rate Us</Text>

      <View
        style={[
          spacing.mv3,
          spacing.mh3,
          spacing.br3,
          {
            flexDirection: "row",
            elevation: 1,
            alignItems: "center",
            backgroundColor: PureWhite,
          },
        ]}
      >
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/009/155/973/original/rate-us-feedback-label-3d-design-illustration-vector.jpg",
          }}
          style={[styles.imageDiv]}
          resizeMode="contain"
        />

        <View style={{ flex: 1, padding: 12 }}>
          <Text style={[styles.title, spacing.mv1]}>Enjoying ghumantoo?</Text>
          <Text
            style={[typography.font16, spacing.mb1, { flexWrap: "wrap", maxWidth: '100%' }]}
          >
            Share your experience with us and help spread the word!
          </Text>
          <TouchableOpacity style={[styles.buttonPrimary, spacing.br2]}>
            <Text style={styles.buttonTextPrimary}>Rate now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
