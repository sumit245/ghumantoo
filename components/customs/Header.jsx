import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { PureWhite, TextDark, TextMuted, typography, spacing, layouts } from '../../utils/styles';

/**
 * Reusable custom header component for consistent navigation experience
 * @param {Object} props
 * @param {string} props.title - Main header title text
 * @param {string} [props.subtitle] - Optional subtitle text below the title
 * @param {Function} [props.onBackPress] - Custom back button handler (defaults to navigation.goBack())
 * @param {boolean} [props.showBackButton=true] - Whether to show the back button
 */
const Header = ({
    title,
    subtitle,
    onBackPress,
    showBackButton = true
}) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={[layouts.rowCenter, spacing.p4, { backgroundColor: PureWhite, paddingTop: 0 }]}>
            {showBackButton && (
                <TouchableOpacity onPress={handleBackPress}>
                    <Icon name="arrow-left" size={24} color={TextDark} />
                </TouchableOpacity>
            )}
            <View>
                <Text style={[typography.font18Bold, spacing.ml4, { color: TextDark }]}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={[typography.font12, spacing.ml4, { color: TextMuted }]}>
                        {subtitle}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default Header;
