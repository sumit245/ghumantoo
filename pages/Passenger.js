import { View, Text } from "react-native";
import PassengerData from "../components/PassengerData";

const Passenger = () => {
  return (
    <View style={{ flex: 1 }}>
      <PassengerData
        heading="Passengers'"
        passenger="Passenger"
        child={false}
        navContinue="ConfirmationPage"
      />
    </View>
  );
};

export default Passenger;
