import { View, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { type FixedExpense } from '../types'
import { Ionicons } from '@expo/vector-icons'
import { AppContext } from '../context/AppContext'
import { Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function ItemFixedExpenses ({ item, index }: { item: FixedExpense, index: number }): React.JSX.Element {
  const {
    title,
    value,
    date,
    id,
    color
  } = item
  const navigation = useNavigation()
  const [openDetails, setOpenDetails] = useState(false)
  const { formatAsMoney, removeFixedExpenses } = useContext(AppContext)
  return (
    <TouchableOpacity
      key={'expense-' + index}
      onPress={() => {
        setOpenDetails(!openDetails)
      }}>
      <View style={{ flexDirection: 'column', width: '100%', borderBottomColor: 'gray', borderBottomWidth: 1, padding: 20 }}>
        <View style={{ flexDirection: 'row', width: '100%', gap: 20, alignItems: 'center' }}>
          <View style={{ backgroundColor: color, width: 30, height: 30, borderRadius: 11 }}></View>
          <Text style={{ marginRight: 'auto', fontSize: 20 }}>{title}</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('EditExpense', {
              title,
              value,
              date: date.toString(),
              id,
              color
            })
          }
          }>
            <Ionicons name="pencil" size={25} color='gray' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            removeFixedExpenses(id)
          }
          }>
            <Ionicons name="trash" size={25} color='gray' />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', gap: 20, alignItems: 'center', justifyContent: 'space-between', marginTop: 10, display: openDetails ? 'flex' : 'none' }}>
          <View style={{ marginRight: 'auto' }}>
            <Text style={{ fontSize: 15 }}>Fecha de pago: {new Date(date).toLocaleDateString()}</Text>
            <Text style={{ fontSize: 15 }}>Monto: {formatAsMoney(value)}</Text>
          </View>
        </View>
        <Ionicons style={{ position: 'absolute', bottom: '0%', alignSelf: 'center' }} name={openDetails ? 'chevron-up-outline' : 'chevron-down-outline'} size={15} color='gray' />
      </View>
    </TouchableOpacity>
  )
}
