import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { info } from "./OfferInfo";
import { styles } from "../utils/styles";
import { PureWhite, AccentColor } from "../utils/colors";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

export default function Offers() {
  return (
    <>
      <View style={styles.headerTitle}>
        <Text style={[typography.font20, typography.textBold]}>Coupons</Text>
        <Text style={styles.labelStyle}>
          Get best deals with heavy discount
        </Text>
      </View>

      <ScrollView
        style={{ marginVertical: 12 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {info.map(({ id, imageUrl, heading, validity, couponCode }) => (
          <TouchableOpacity
            key={id}
            style={[
              spacing.br3,
              spacing.mh1,
              {
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: 340,
                height: 200,
                alignItems: "center",
                backgroundColor: AccentColor,
              },
            ]}
          >
            <Image
              source={{ uri: imageUrl }}
              style={[styles.imageOffers, styles.imageDiv]}
              resizeMode="contain"
            />
            <View>
              <Text
                style={[
                  styles.labelStyle,
                  { color: PureWhite, fontWeight: "bold" },
                ]}
              >
                {heading}
              </Text>
              <Text
                style={[
                  styles.labelStyle,
                  { color: PureWhite, fontWeight: "bold" },
                ]}
              >
                Valid till {validity}
              </Text>
              <Text style={styles.couponCode}>{couponCode}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
