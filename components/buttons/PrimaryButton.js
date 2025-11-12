import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles, spacing } from '../../utils/styles'
import Loader from '../customs/Loader'

export default function PrimaryButton({ style, onClick, isIconButton, iconName, title, textStyle, loading, disabled }) {
    return (
        <TouchableOpacity
            style={[styles.buttonPrimary, spacing.br1, style]}
            onPress={onClick}
            disabled={loading || disabled} // Disable button when loading
        >
            {loading ? (
                <Loader variant="inline" size="small" color="#fff" />
            ) : (
                <>
                    {isIconButton && <Icon name={iconName} size={24} color='#fff' />}
                    <Text style={[styles.buttonTextPrimary, textStyle]}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    )
}