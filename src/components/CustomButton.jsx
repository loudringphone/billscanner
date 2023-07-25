import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
export default function CustomButton({library, title, onPress, icon, color}) {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            {library == 'Ionicons' ?
                <Ionicons name={icon} size={28} color={color ? color : 'white'}/>
            :
                <Entypo name={icon} size={28} color={color ? color : 'white'}/>
            }
            <Text style={[styles.text, { color: color ? color : 'white' }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles =  StyleSheet.create({
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
    },
})