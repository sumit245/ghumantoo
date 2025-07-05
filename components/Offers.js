import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { info } from "./OfferInfo";
import { styles } from "../utils/styles";
import { AccentColor, SecondaryColor, WhiteColor } from "../utils/colors";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

export default function Offers() {
  return (
    <>
      <Text style={[typography.font24, typography.textBold, spacing.ml4]}>Coupons</Text>
      <Text style={[typography.font16, spacing.ml4]}>
        Get best deals with heavy discount
      </Text>


      <ScrollView
        style={[spacing.mv3, spacing.ml3]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {info.map(({ id, imageUrl, heading, validity, couponCode }) => (
          <TouchableOpacity
            key={id}
            style={[
              spacing.br3,
              spacing.mr4,
              {
                flexDirection: "row",
                width: 340,
                height: 200,
                alignItems: "center",
                backgroundColor: AccentColor,
              },
            ]}
          >
            <Image
              source={{ uri: imageUrl }}
              style={[styles.imageDiv, spacing.mh2]}
              resizeMode="contain"
            />
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={[
                  typography.font16,
                  spacing.ml3,
                  { fontWeight: "bold", color: WhiteColor, flexWrap: 'wrap', marginBottom: 5, textTransform: 'capitalize' },
                ]}
              >
                {heading} valid till {validity}
              </Text>
              <Text style={styles.couponCode}>{couponCode}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
