import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
import {
  WarningColor,
  AccentColor,
  Black1Color,
  DangerColor,
  DarkGray,
  PrimaryColor,
  PureWhite,
  SecondaryColor,
  WhiteColor,
  BlackColor,
} from "./colors";

export const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
    backgroundColor: WhiteColor,
  },
  buttonTextPrimary: {
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "600",
    paddingHorizontal: 8,
    color: WhiteColor,
  },
  buttonPrimary: {
    backgroundColor: PrimaryColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 24,
    marginVertical: 14,
  },
  locationContainer: {
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    backgroundColor: PureWhite,
  },
  suggestionItem: {
    padding: 6,
    borderBottomWidth: 1,
    borderColor: "#c7c7c7",
  },

  pickDropSelector: {
    flexDirection: "row",
    padding: 6,
    height: 60,
    borderBottomColor: "#c7c7c7",
    borderBottomWidth: 1,
    alignItems: "center",
    marginBottom: 4,
  },
  labelStyle: {
    fontSize: 12,
  },
  modalContainerStyle: {
    backgroundColor: WhiteColor,
    marginHorizontal: 8,
    borderRadius: 8,
    padding: 20,
  },
  modalCloseIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
  },
  tab: {
    // width: width / 2.5,
    padding: 8,
  },

  ticketCard: {
    backgroundColor: PureWhite,
    marginVertical: 12,
    borderRadius: 8,
    height: 410,
  },
  ticketCardHeader: {
    backgroundColor: PrimaryColor,
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    marginBottom: 0,
  },
  ticketCardFooter: {
    height: 224,
    padding: 8,
    marginBottom: 10,
  },
  BusType: {
    color: "#E1D9D1",
    fontWeight: "bold",
  },

  dividerInTicket: {
    color: "#F1F9F1",
    height: 1,
    marginVertical: 8,
  },

  BusProvider: {
    color: "#E1D9D1",
    fontWeight: "bold",
  },
  cardDivider: {
    position: "relative",
    width: width,
    left: -20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Start of phone text input
  inputStyle: {
    height: 48,
    width: width - 40,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: WhiteColor,
  },
  phoneTextContainerStyle: {
    height: 48,
    width: width - 40,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: WhiteColor,
    borderWidth: 1,
    borderColor: Black1Color,
    padding: 4,
    marginVertical: 4,
  },
  phoneTextInputStyle: {
    fontSize: 20,
    position: "absolute",
    textAlignVertical: "center",
    left: "4%",
    width: width - 60,
  },
  phoneCodeTextStyle: {
    fontSize: 20,
  },

  termsCondition: {
    color: Black1Color,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: width - 60,
    // marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 240,
  },
  phone: {
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 10,
    height: height - 440,
  },

  bottomContainer: {
    height: 200,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 100,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 22,
    color: BlackColor,
  },

  textContainer: {
    flex: 1, // Allow text to take remaining space
    marginLeft: 20, // Added left margin for separation
  },
  text: {
    marginTop: 15,
    marginBottom: 4, // Added bottom margin for separation
    fontWeight: "bold",
    fontSize: 19,
  },
  button: {
    backgroundColor: "#ff8c00",
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 15,
    color: WhiteColor,
    fontWeight: "bold",
    width: 270,
    textAlign: "center",
    fontSize: 20,
  },
  card: {
    backgroundColor: PureWhite,
    height: 100,
    width: 140,
    borderRadius: 8,
    padding: 12,
    shadowColor: DarkGray, // Black shadow
    elevation: 4,
  },
  extra: {
    marginTop: 20,
    height: 130,
    width: 140,
    borderRadius: 8,
    margin: 4,
  },
  tabLink: {
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
  },
  imageDiv: {
    width: 100,
    height: 200,
    borderRadius: 4,
  },
  imageOffers: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
  },

  couponCode: {
    backgroundColor: DangerColor,
    margin: 12,
    textAlign: "center",
    textTransform: "uppercase",
    height: 40,
    padding: 8,
    borderColor: WhiteColor,
    borderStyle: "dotted",
    borderWidth: 4,
    borderRadius: 4,
    color: WhiteColor,
    fontWeight: "bold",
    width: 100,
  },
  headerTitle: {
    backgroundColor: WhiteColor,
    height: 60,
    padding: 8,
  },
  headerTitleText: {
    color: Black1Color,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  icon: {
    paddingTop: 4,
  },

  item: {
    marginHorizontal: 8,
    height: 50,
    backgroundColor: WhiteColor,
    paddingLeft: 4,
    justifyContent: "center",
  },

  tickets: {
    height: 180,
    backgroundColor: PureWhite,
    marginTop: 20,
    marginHorizontal: 12,
    borderRadius: 16,
    padding: 18,
  },
  horizontal: {
    flexDirection: "row",
  },
  vertical: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  second: {
    marginTop: 20,
  },
  right: {
    position: "absolute",
    right: 0,
  },
  departureTime: {
    fontWeight: "bold",
  },

  seats: {
    color: "gray",
  },
  startingFrom: {
    fontWeight: "bold",
  },
  busProvider: {
    fontWeight: "bold",
  },
  busType: {
    color: "gray",
  },
  arrivalTime: {
    fontWeight: "bold",
  },
  ratings: {
    fontWeight: "bold",
    color: WhiteColor,
  },

  filter: {
    maxHeight: 50,
    backgroundColor: WhiteColor,
  },

  filterButton: {
    padding: 4,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    height: 40,
    minWidth: 80,
    marginHorizontal: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  filterIcon: {
    marginRight: 5,
  },

  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginTop: 15,
    paddingBottom: 25,
    width: 310,
  },

  optionName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  optionMethods: {
    flexWrap: "wrap",
    textAlign: "center",
    opacity: 0.6,
  },
  payButton: {
    backgroundColor: "#f99333",
    paddingVertical: 8,
    paddingHorizontal: 8,
    textAlign: "center",
    borderRadius: 5,
  },
  payButtonText: {
    fontSize: 15,
  },

  head: {
    backgroundColor: WhiteColor,
    paddingLeft: 20,
    height: 80,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    color: "#ff8c00",
    paddingRight: 8,
  },

  second: {
    marginTop: 9,
    marginRight: 4,
    backgroundColor: WhiteColor,
    paddingLeft: 20,
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  last: {
    alignItems: "flex-start",
    width: 300,
  },
  divide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "grey",
    marginTop: 10,
    marginBottom: 10,
  },
  lightText: {
    color: "darkgray",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  passengerItem: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 12,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 20,
    backgroundColor: "transparent",
  },
  halfInput: {
    width: "48%",
  },
  continueButton: {
    backgroundColor: "#f99333",
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 12,
  },
  continueButtonText: {
    color: WhiteColor,
    fontSize: 24,
    fontWeight: "bold",
  },
  stdText: {
    color: "#E1D9D1",
    fontWeight: "bold",
  },
  Travelday: {
    color: "#E1D9D1",
    fontWeight: "bold",
  },

  TicketNo: {
    color: "black",
    fontWeight: "bold",
    marginTop: -5,
  },
  PNR: {
    color: "black",
    fontWeight: "bold",
  },
  Fare: {
    color: "black",
    fontWeight: "bold",
  },
  external: {
    paddingTop: 12,
    alignItems: "flex-start",
    marginBottom: 2,
  },
  dividerthin: {
    height: 1,
    color: "#d5dcde",
  },
  confirmation: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
    margin: 12,
  },
  checkDiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  down: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: PrimaryColor,
    height: 250,
  },
  iconImage: {
    height: 80,
    width: 100,
    alignSelf: "center",
    marginTop: 20,
  },

  card1: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: PureWhite,
  },
  row1: {
    flexDirection: "row",
  },
  referral: {
    justifyContent: "space-between",
    marginVertical: 4,
    padding: 6,
    borderColor: "grey",
    borderWidth: 1,
    borderStyle: "dashed",
    marginHorizontal: 30,
    marginVertical: 10,
    flexDirection: "row",
  },
  referBtn: {
    backgroundColor: PrimaryColor,
    paddingHorizontal: 8,
    marginHorizontal: 30,
    height: 40,
    borderRadius: 20,
    marginVertical: 8,
  },
  header2: {
    height: 200,
    backgroundColor: "white",
    marginTop: -150,
    marginHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  wallet: {
    height: 65,
    marginHorizontal: 20,
    borderRadius: 4,
    marginVertical: 15,
    padding: 4,
  },
  heading1: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "flex-start",
    marginHorizontal: 10,
    marginVertical: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
  },

  roundedTable: {
    borderWidth: 1,
    borderColor: "#c7c7c7",
    borderTopLeftRadius: 12,
    padding: 8,
    borderTopRightRadius: 12,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#c7c7c7",
    padding: 4,
  },
  tableDivision: {
    fontWeight: "600",
    marginHorizontal: 8,
    flexWrap: "wrap",
    maxWidth: 100,
  },
  tableHeading: {
    fontWeight: "400",
    margin: 4,
    textAlign: "left",
  },
  driverContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  steeringWheel: {
    height: 32,
    width: 32,
    margin: 4,
    alignSelf: "flex-end",
  },
  deckText: {
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
  },
  seatLayoutContainer: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#c7c7c7",
    width: 340,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  column: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  seatButton: {
    padding: 2,
  },
  seatIcon: {
    height: 56,
    width: 56,
    resizeMode: "contain",
    margin: 2,
  },
  driverContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  seatMapContainer: {
    borderTopColor: "#c7c7c7",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  passengerFloatingBtn: {
    position: "absolute",
    backgroundColor: "#f99333",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  passengerFloatingText: {
    color: Black1Color,
    fontWeight: "600",
  },

  headerPassengerJS: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.8,
    borderBottomColor: "grey",
    paddingBottom: 5,
    marginBottom: 15,
  },

  subHeadingBottomSheet: {
    marginTop: -10,
    fontSize: 16,
    opacity: 0.6,
  },
  stdTextBottomSheet: {
    fontSize: 17,
    lineHeight: 30,
  },
  // Restyling by Sumit R Pratihast
  smallButtonPrimary: {
    height: 28,
    borderRadius: 14,
    marginVertical: 0,
    marginHorizontal: 4,
    top: 8,
  },

  bottomTabBar: {
    backgroundColor: WhiteColor,
    justifyContent: "flex-start",
    fontWeight: "bold",
    height: 68,
  },
});
