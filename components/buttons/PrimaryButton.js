import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from '../../utils/styles'
import { spacing } from '../../utils/spacing.styles'

export default function PrimaryButton({ style, onClick, isIconButton, iconName, title, textStyle }) {
    return (
        <TouchableOpacity style={[styles.buttonPrimary, spacing.m4, spacing.br1, { ...style }]} onPress={onClick}>
            {
                isIconButton && <Icon name={iconName} size={24} color='#fff' />
            }
            <Text style={[styles.buttonTextPrimary, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}