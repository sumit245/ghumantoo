import { StyleSheet } from 'react-native';
import { DangerColor, SuccessColor, WarningColor, PureWhite } from './colors';
import { spacing } from './spacing';

export const message = StyleSheet.create({
	// Semantic message styles for consistent status UI
	dangerContainer: {
		backgroundColor: DangerColor,
		borderRadius: 8,
		padding: 12,
	},
	successContainer: {
		backgroundColor: SuccessColor,
		borderRadius: 8,
		padding: 12,
	},
	warningContainer: {
		backgroundColor: WarningColor,
		borderRadius: 8,
		padding: 12,
	},
	textLight: {
		color: PureWhite,
	},
	// Convenience: combined presets
	DangerMessage: {
		backgroundColor: DangerColor,
		borderRadius: 8,
		padding: 12,
		color: PureWhite,
	},
	SuccessMessage: {
		backgroundColor: SuccessColor,
		borderRadius: 8,
		padding: 12,
		color: PureWhite,
	},
	WarningMessage: {
		backgroundColor: WarningColor,
		borderRadius: 8,
		padding: 12,
		color: PureWhite,
	},
}); 


