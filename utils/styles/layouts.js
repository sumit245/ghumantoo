import { StyleSheet } from 'react-native';

// Common layout primitives to reduce duplication
export const layouts = StyleSheet.create({
	// Row with center alignment
	rowCenter: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	// Row spaced between
	rowBetween: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	// Column center
	colCenter: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	// Fullscreen container
	container: {
		flex: 1,
	},

	// Tab container pattern
	rowTab: {
		flexDirection: "row",
		backgroundColor: "#fff",
	},

	// Overlay pattern for absolute positioning
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 12,
	},

	// Footer pattern
	footer: {
		flexDirection: "row",
		borderTopWidth: 1,
		borderTopColor: "#eee",
	},
});


