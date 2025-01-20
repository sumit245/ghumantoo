import { View, Text } from "react-native";
import { styles } from "../utils/styles";

export const faqs = [
  {
    id: "1",
    title: "How do I book a bus ticket with Ghumantoo?",
    description:
      "You can easily book a bus ticket by visiting our website or using our mobile app. Simply select your travel route, choose your preferred bus, and follow the prompts to complete your booking.",
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
    title: "Can I modify or cancel my booking?",
    description:
      "Yes, you can modify or cancel your booking through your account on our website or app. Please check our cancellation policy for details on any applicable fees or timelines.",
    icon: "exclamation-thick",
    component: () => <></>,
  },
  {
    id: "3",
    title: "How can I contact customer support?",
    description:
      "You can reach our customer support team through the contact form on our website, or by calling our helpline . We’re available 24/7 to assist you with any inquiries.",
    icon: "offer",
    component: () => <></>,
  },
  {
    id: "4",
    title: "Do I need to carry a physical ticket?",
    description:
      "No, you do not need a physical ticket. Upon booking, you will receive a confirmation email and SMS with your booking details. Just show the e-ticket on your mobile device when boarding the bus.",
    icon: "share-variant-outline",
    component: () => <></>,
  },
  {
    id: "5",
    title: "What payment methods do you accept?",
    description:
      "We accept a variety of secure payment options, including credit/debit cards, net banking, and popular digital wallets, ensuring a safe transaction for our customers.",
    icon: "wallet",
    component: () => <></>,
  },
];
