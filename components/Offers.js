import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import { styles } from "../utils/styles";
import { WhiteColor } from "../utils/colors";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

// Helper to generate random gradients
const darkGradients = [
  ['#2c3e50', '#4ca1af'],
  ['#434343', '#000000'],
  ['#616161', '#9bc5c3'],
  ['#de6262', '#ffb88c'],
  ['#0f2027', '#203a43', '#2c5364'],
  ['#485563', '#29323c'],
];

const getRandomGradient = () => {
  return darkGradients[Math.floor(Math.random() * darkGradients.length)];
};

export default function Offers() {
  const { activeCoupons } = useSelector(state => state.bus);

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
        {activeCoupons?.map((coupon, index) => {
          const discountText = coupon.discount_type === 'fixed'
            ? `Get flat ₹${coupon.coupon_value} off`
            : `Get ${coupon.coupon_value}% off`;

          const heading = coupon.coupon_threshold > 0
            ? `${discountText} on a minimum booking of ₹${coupon.coupon_threshold}.`
            : `${discountText} on your booking.`;

          const validity = dayjs(coupon.expiry_date).format('DD MMM YYYY');
          const bannerImageUrl = coupon.banner_image_url;
          const stickerImageUrl = coupon.sticker_image_url;
          const randomGradient = useMemo(() => getRandomGradient(), []);

          const CardContent = () => (
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", padding: 12 }}>
              {stickerImageUrl && (
                <Image
                  source={{ uri: stickerImageUrl }}
                  style={[styles.imageDiv, { height: 80, width: 80, borderRadius: 12 }]}
                  resizeMode="cover"
                />
              )}
              <View style={{ flex: 1, justifyContent: "center", paddingLeft: 12 }}>
                <Text
                  style={[
                    typography.font16,
                    { fontWeight: "bold", color: WhiteColor, flexWrap: 'wrap', marginBottom: 5, textTransform: 'capitalize' },
                  ]}
                >
                  {heading}
                </Text>
                <Text style={[typography.font12, { color: WhiteColor, marginBottom: 10 }]}>Valid till {validity}</Text>
                <Text style={styles.couponCode}>{coupon.coupon_code}</Text>
              </View>
            </View>
          );

          return (
            <TouchableOpacity key={index} style={{ width: 340, height: 160, marginRight: 16, borderRadius: 18, overflow: 'hidden' }}>
              {bannerImageUrl ? (
                <ImageBackground
                  source={{ uri: bannerImageUrl }}
                  style={{ flex: 1, justifyContent: 'center' }}
                  resizeMode="cover"
                >
                  <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
                    <CardContent />
                  </View>
                </ImageBackground>
              ) : (
                <LinearGradient
                  colors={randomGradient}
                  style={{ flex: 1 }}
                  start={{ x: 0.0, y: 0.25 }}
                  end={{ x: 0.5, y: 1.0 }}
                >
                  <CardContent />
                </LinearGradient>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
}
