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
}); 


