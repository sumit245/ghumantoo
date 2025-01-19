import { View, Text } from "react-native";
import { styles } from "../utils/styles";

export const faqs = [
  {
    id: "1",
    title: "New bus booking help",
    description: "Bus availablity/Child fare...",
    icon: "bus",
    component: () => (
      <View style={{ backgroundColor: "#fff", margin: 8, padding: 8 }}>
        <Text style={styles.title}>Welcome to Ghumantoo</Text>
        <Text style={styles.title}>No Tension Faltoo, Just Go Ghumantoo</Text>
      </View>
    ),
  },
  {
    id: "2",
    title: "Technical Issues",
    description: "Need some technical help?",
    icon: "exclamation-thick",
    component: () => <></>,
  },
  {
    id: "3",
    title: "Offers",
    description: "Need help with offers?",
    icon: "offer",
    component: () => <></>,
  },
  {
    id: "4",
    title: "Ghumantoo Referral Help",
    description: "Need help with ghumantoo referral...",
    icon: "share-variant-outline",
    component: () => <></>,
  },
  {
    id: "5",
    title: "Ghumantoo Wallet Help",
    description: "Need any help with ghumantoo wallet...",
    icon: "wallet",
    component: () => <></>,
  },
];
