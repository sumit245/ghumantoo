import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LightGray, DarkGray, BlackColor, typography, spacing } from '../../utils/styles';
import Loader from '../customs/Loader';

export default function SecondaryButton({
    style,
    onClick,
    isIconButton,
    iconName,
    title,
    textStyle,
    loading,
    disabled
}) {
    return (
        <TouchableOpacity
            style={[
                {
                    backgroundColor: LightGray,
                    borderWidth: 1,
                    borderColor: DarkGray,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                spacing.pv3,
                spacing.br1,
                style,
            ]}
            onPress={onClick}
            disabled={loading || disabled}
        >
            {loading ? (
                <Loader variant="inline" size="small" color={BlackColor} />
            ) : (
                <>
                    {isIconButton && <Icon name={iconName} size={24} color={BlackColor} />}
                    <Text style={[typography.font16, { color: BlackColor, fontWeight: '600' }, textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}
