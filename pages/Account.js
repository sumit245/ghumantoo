import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { height, styles } from "../utils/styles";
import {
  DangerColor,
  DarkGray,
  PrimaryColor,
  PureWhite,
} from "../utils/colors";
import Wallet from "./Wallet";
import Cards from "./Cards";
import ReferAndEarn from "./ReferAndEarn";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

const DATA = [
  {
    id: "3",
    title: "Wallet",
    icon: "wallet-outline",
    whereTo: "Wallet",
  },
  {
    id: "7",
    title: "Refer & Earn",
    icon: "share-social-outline",
    whereTo: "ReferAndEarn",
  },
  {
    id: "11",
    title: "About Us",
    icon: "information-circle-outline",
  },
  {
    id: "12",
    title: "Settings",
    icon: "settings-outline",
  },
];

const Item = ({ title, icon, onPress }) => (
  <TouchableOpacity
    style={[
      styles.row,
      {
        marginVertical: 0.8,
        padding: 8,
        backgroundColor: PureWhite,
        height: 63,
        alignItems: "center",
      },
    ]}
    onPress={onPress}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Icon name={icon} color={PrimaryColor} size={24} style={{ padding: 8 }} />
      <Text>{title}</Text>
    </View>
    <Icon name="chevron-forward" color={DarkGray} size={24} />
  </TouchableOpacity>
);

export default function Account() {
  const { email_id, mobile_number, name } = useSelector((state) => state.user);

  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={[
        styles.container,
        spacing.ph1,
        spacing.mb1,
        {
          justifyContent: "space-between",
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.row,
          spacing.br2,
          spacing.p2,
          {
            backgroundColor: PrimaryColor,
            height: height / 6,
            alignItems: "center",
          },
        ]}
        onPress={() => navigation.navigate("editProfile")}
      >
        <View
          style={[
            styles.row,
            {
              alignItems: "center",
            },
          ]}
        >
          <Icon name="person-circle-outline" size={48} color={PureWhite} />
          <View>
            <Text
              style={[
                typography.font20,
                typography.textBold,
                { color: PureWhite },
              ]}
            >
              {name}
            </Text>
            <Text style={[typography.font12, { color: PureWhite }]}>
              {mobile_number}
            </Text>
            <Text style={[typography.font12, { color: PureWhite }]}>
              {email_id}
            </Text>
          </View>
        </View>
        <Icon name="chevron-forward" size={32} color={PureWhite} />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        {DATA.map((item) => (
          <Item
            key={item.id}
            title={item.title}
            icon={item.icon}
            onPress={() => navigation.navigate(item.whereTo)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => console.log("Logout")}
      >
        <Icon name="power" color={DangerColor} size={32} style={[spacing.p1]} />
        <Text
          style={[
            typography.font20,
            typography.textBold,
            {
              color: DarkGray,
            },
          ]}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
