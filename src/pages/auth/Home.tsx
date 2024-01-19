import React from 'react'
import Chart from '../../components/Chart'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ExpenseEditor from '../../components/ExpensesEditor'

const Stack = createNativeStackNavigator()
export default function Home (): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions= {{ headerShown: false }} initialRouteName='Chart'>
      <Stack.Screen name='Chart' component={Chart} />
      <Stack.Screen name='AddExpense' component={ExpenseEditor} options={{ presentation: 'modal' }} />
      <Stack.Screen name='EditExpense' component={ExpenseEditor} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  )
}
