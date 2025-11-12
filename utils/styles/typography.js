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
} from "../colors";

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

    // Bold font size combinations
    font14Bold: {
        fontSize: 14,
        fontWeight: "bold",
    },
    font16Bold: {
        fontSize: 16,
        fontWeight: "bold",
    },
    font18Bold: {
        fontSize: 18,
        fontWeight: "bold",
    },

    // Additional font weights
    fontSemiBold: {
        fontWeight: "600",
    },
    font500: {
        fontWeight: "500",
    },
    font800: {
        fontWeight: "800",
    },
    font6: {
        fontSize: 6,
    },
    font8: {
        fontSize: 8
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
