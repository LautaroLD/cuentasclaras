import { View, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

import { AppContext } from '../context/AppContext'
import ItemFixedExpenses from './ItemFixedExpenses'
import { type FixedExpense } from '../types'

export default function ListFixedExpenses (): React.JSX.Element {
  const { user, calculateDifference } = useContext(AppContext)
  const { fixedExpenses } = user
  const [sort, setSort] = useState(true)

  const free = (): FixedExpense => {
    return {
      value: calculateDifference(),
      title: 'Disponible',
      color: '#6664',
      id: '0',
      date: ''
    }
  }

  const [ListSorted, setListSorted] = useState([...fixedExpenses, free()])
  useEffect(() => {
    setListSorted([...fixedExpenses, free()])
    setSorted()
  }, [fixedExpenses])
  function setSorted (): void {
    switch (sort) {
      case true:
      setListSorted(fixedExpenses.sort((a, b) => a.value - b.value))
        break
      case false:
        setListSorted(fixedExpenses.sort((a, b) => b.value - a.value))
        break
    }
    setSort(!sort)
  }
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity style={{ width: 'auto', marginLeft: 'auto', marginRight: '5%', borderWidth: 1, borderColor: '#666', padding: 3, borderRadius: 10 }} onPress={setSorted}>
        <Ionicons name='swap-vertical-outline' size={25} color='#666'/>
      </TouchableOpacity>
      {
        ListSorted?.map((item, index) =>
          <ItemFixedExpenses key={'expense-' + index} item={item} index={index}/>
        )
      }
    </View>
  )
}
