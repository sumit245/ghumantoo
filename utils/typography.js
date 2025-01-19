import { StyleSheet } from "react-native";
import {
  PrimaryColor,
  SecondaryColor,
  AccentColor,
  WarningColor,
  DangerColor,
  SuccessColor,
  WhiteColor,
  DarkGray,
  BlackColor,
} from "./colors";
export const typography = StyleSheet.create({
  textPrimary: {
    color: PrimaryColor,
  },
  textSecondary: {
    color: SecondaryColor,
  },
  textLight: {
    color: AccentColor,
  },
  textDark: {
    color: BlackColor,
  },
  textDanger: {
    color: DangerColor,
  },
  textInfo: {
    color: SuccessColor,
  },
  textWarning: {
    color: WarningColor,
  },
  textSuccess: {
    color: WhiteColor,
  },
  textPrimaryTransparent: {
    color: DarkGray,
  },
  textBold: {
    fontWeight: "bold",
  },

  font10: {
    fontSize: 10,
  },

  font12: {
    fontSize: 12,
  },

  font14: {
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
  },
  font18: {
    fontSize: 18,
  },
  font20: {
    fontSize: 20,
  },
  font22: {
    fontSize: 22,
  },
  font24: {
    fontSize: 24,
  },
  font26: {
    fontSize: 26,
  },
  font40: {
    fontSize: 40,
  },
  // uppercase,lowercase,capitalize
  textCapitalize: {
    textTransform: "capitalize",
  },
});
