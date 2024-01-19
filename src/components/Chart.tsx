import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { AppContext } from '../context/AppContext'
import Ionicons from '@expo/vector-icons/Ionicons'
import ListFixedExpenses from './ListFixedExpenses'
import { Text } from 'react-native-elements'
import { type NavigationProp } from '@react-navigation/native'

const Chart = ({ navigation }: { navigation: NavigationProp<ReactNavigation.RootParamList> }): React.JSX.Element => {
  const [warmDifference, setWarmDifference] = useState('')

  const { user, calculateDifference, formatAsMoney, getTotalExpenses } = useContext(AppContext)

  const { budget, fixedExpenses } = user
  const [difference, setDifference] = useState(0)
  const [pieData, setPieData] = useState([...fixedExpenses, {
    value: calculateDifference(),
    title: 'Disponible',
    color: '#6664'
  }])
  const [percent, setPercent] = useState(getTotalExpenses(true))
  useEffect(() => {
    setDifference(calculateDifference())
  }, [user])

  useEffect(() => {
    if (calculateDifference() <= budget / 2 && calculateDifference() > budget / 5) {
      setWarmDifference('¡Los gastos alcanzaron el 50% del presupuesto!')
    } else if (calculateDifference() <= budget / 5 && calculateDifference() > 0) {
      setWarmDifference('¡Los gastos alcanzaron el 80% del presupuesto!')
    } else if (calculateDifference() <= 0) {
      setWarmDifference('¡Ya no hay presupuesto disponible!')
    } else {
      setWarmDifference('')
    }
    setPercent(getTotalExpenses(true))
    setPieData([...fixedExpenses, {
      value: calculateDifference(),
      title: 'Disponible',
      color: '#6664'
    }])
  }, [fixedExpenses, budget])

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 30, alignItems: 'center', gap: 20 }}>
      {(warmDifference.length > 0) &&
        <Text style={{ color: 'red' }}>{warmDifference}</Text>

      }
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>Mi presupuesto</Text>
        <Text style={{ fontSize: 30 }}>{formatAsMoney(budget)}</Text>
      </View>
      <PieChart
        radius={100}
        donut
        innerRadius={50}
        data={pieData}
        centerLabelComponent={() =>
          <Text style={{ fontSize: 20 }}>{percent.toFixed(2)}%</Text>
        }
      />
      <Text style={{ fontSize: 15 }}>Dinero disponible: <Text style={{
        fontWeight: 'bold'
      }}>{formatAsMoney(difference)}</Text></Text>
      <TouchableOpacity style={styles.component} onPress={() => { navigation.navigate('AddExpense', {}) }}>
        <Ionicons name='add' size={45} color='#fff' />
      </TouchableOpacity>
      <ListFixedExpenses />
    </ScrollView >
  )
}
export default Chart

const styles = StyleSheet.create({
  component: {
    backgroundColor: '#ff8c00',
    borderRadius: 50,
    aspectRatio: 1,
    width: 50,
    paddingLeft: 4
  }
})
