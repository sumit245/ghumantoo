import React from 'react'
import { View, Text, Image, TouchableOpacity, Linking, Alert } from "react-native";
import { styles, PureWhite, typography, spacing } from "../utils/styles";

export default function RateUs() {
  const storeUrl = 'https://play.google.com/store/apps/details?id=com.dashandots.vindhyashribus';

  const handleRatePress = async () => {
    const supported = await Linking.canOpenURL(storeUrl);
    await Linking.openURL(storeUrl);
    if (supported) {
    } else {
      Alert.alert(`Don't know how to open this URL: ${storeUrl}`);
    }
  };

  return (
    <>
      <Text style={[typography.font24, typography.textBold, spacing.ml4, { color: '#17171f' }]}>Rate Us</Text>

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
          <Text style={[styles.title, spacing.mv1, { color: '#17171f' }]}>Enjoying ghumantoo?</Text>
          <Text
            style={[typography.font16, spacing.mb1, { flexWrap: "wrap", maxWidth: '100%', color: '#17171f' }]}
          >
            Share your experience with us and help spread the word!
          </Text>
          <TouchableOpacity onPress={handleRatePress} style={[styles.buttonPrimary, spacing.br2]}>
            <Text style={styles.buttonTextPrimary}>Rate now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
