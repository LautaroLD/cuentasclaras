/* eslint-disable react/prop-types */
import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from 'react-native-elements'

export default function Button ({ text, action, primary }: { text: string, action: () => void, primary?: boolean }): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.buttonBase(primary)} onPress={action} >
      <Text style={styles.textBase(primary)}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonBase (primary: boolean) {
    return {
      width: '60%',
      minWidth: '60%',
      paddingVertical: 13,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 25,
      backgroundColor: primary && '#000080'
    }
  },
  textBase (primary: boolean) {
    return {
      fontSize: 15,
      fontWeight: primary ? 'bold' : 'normal',
      color: primary ? '#fff' : '#000'
    }
  }
})
