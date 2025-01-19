import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../utils/styles";
import { PureWhite } from "../utils/colors";
import { typography } from "../utils/typography";

export default function RateUs() {
  return (
    <>
      <View style={styles.headerTitle}>
        {/* <Text style={styles.headerTitleText}>Rate Us</Text> */}
        <Text style={[typography.font20, typography.textBold]}>Rate Us</Text>
      </View>

      <View
        style={[
          styles.mainCard,
          { backgroundColor: PureWhite, justifyContent: "none" },
        ]}
      >
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/009/155/973/original/rate-us-feedback-label-3d-design-illustration-vector.jpg",
          }}
          style={[styles.imageDiv]}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.title}>Enjoying ghumantoo?</Text>
          <Text
            style={[styles.labelStyle, { flexWrap: "wrap", maxWidth: 200 }]}
          >
            Share your experience with us and help spread the word!
          </Text>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonTextPrimary}>Rate now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
