import React from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from '../../utils/styles'
import { spacing } from '../../utils/spacing.styles'

export default function PrimaryButton({ style, onClick, isIconButton, iconName, title, textStyle, loading }) {
    return (
        <TouchableOpacity
            style={[styles.buttonPrimary, spacing.m4, spacing.br1, { ...style }]}
            onPress={onClick}
            disabled={loading} // Disable button when loading
        >
            {loading ? (
                <ActivityIndicator color="#fff" animating size="small" /> // Show indicator if loading is true
            ) : (
                <>
                    {isIconButton && <Icon name={iconName} size={24} color='#fff' />}
                    <Text style={[styles.buttonTextPrimary, textStyle]}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    )
}