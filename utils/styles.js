import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
import {
  Black1Color,
  DangerColor,
  DarkGray,
  PrimaryColor,
  PureWhite,
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
  pickDropSelector: {
    flexDirection: "row",
    padding: 6,
    height: 60,
    borderBottomColor: "#c7c7c7",
    borderBottomWidth: 1,
    alignItems: "center",
    marginBottom: 4,
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
  },
  ticketCardFooter: {
    height: 224,
    padding: 8,
    marginBottom: 10,
  },

  cardDivider: {
    position: "relative",
    width: width,
    left: -20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

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
    marginVertical: 4,
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

  termsCondition: {
    color: Black1Color,
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: width - 60,
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
    height: 260,
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 22,
    color: BlackColor,
  },

  textContainer: {
    flex: 1,
    marginLeft: 20,
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
    shadowColor: DarkGray,
    elevation: 4,
  },
  extra: {
    marginTop: 20,
    height: 130,
    width: 140,
    borderRadius: 8,
    margin: 4,
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
    height: 60,
    padding: 8,
  },
  headerTitleText: {
    backgroundColor: WhiteColor,
    height: 60,
    padding: 8,
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
  stdText: {
    color: "#E1D9D1",
    fontWeight: "bold",
  },

  checkDiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  heading1: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "flex-start",
    marginHorizontal: 10,
    marginVertical: 14,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    alignItems: "center",
    padding: 4,
  },
  column: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  subHeadingBottomSheet: {
    marginTop: -10,
    fontSize: 16,
    opacity: 0.6,
  },
  stdTextBottomSheet: {
    fontSize: 17,
    lineHeight: 30,
  },

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
    height: 68,
  },
});
