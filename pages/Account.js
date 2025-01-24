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
    <SafeAreaView style={[styles.container, { marginHorizontal: 0, justifyContent: 'space-between' }]}>

      <TouchableOpacity
        style={[
          styles.row,
          {
            marginVertical: 8,
            padding: 8,
            backgroundColor: PureWhite,
            height: height / 4,
            alignItems: "center",
          },
        ]}
        onPress={() => navigation.navigate("editProfile")}
      >
        <View
          style={[
            styles.row,
            {
              marginVertical: 0.8,
              padding: 8,
              backgroundColor: PureWhite,
              alignItems: "center",
            },
          ]}
        >
          <Icon name="person-circle-outline" size={48} color={PrimaryColor} />
          <View>
            <Text style={styles.labelStyle}>{name}</Text>
            <Text style={styles.labelStyle}>{mobile_number}</Text>
            <Text style={styles.labelStyle}>{email_id}</Text>
          </View>
        </View>
        <Icon name="chevron-forward" size={32} color={DarkGray} />
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
        <Icon
          name="power"
          color={DangerColor}
          size={32}
          style={{ padding: 4 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: DarkGray,
            padding: 4,
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
