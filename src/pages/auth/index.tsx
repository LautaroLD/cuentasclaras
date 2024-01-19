import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChangeBudget from './ChangeBudget'
import Home from './Home'
import Ionicons from '@expo/vector-icons/Ionicons'
import MiAccount from './MiAccount'
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Tab = createBottomTabNavigator()
export default function Auth (): React.JSX.Element {
  const { user } = useContext(AppContext)
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#ff8c00' },
      tabBarActiveTintColor: '#ff8c00',
      tabBarLabelStyle: { fontSize: 13 },
      tabBarActiveBackgroundColor: '#6661',
      tabBarHideOnKeyboard: true
    }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Inicio',
          headerTitle: `Hola ${user.first_name} ${user.last_name}`,
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'} size={size} color={color} />
        }}
      />
      <Tab.Screen
        name='Budget'
        component={ChangeBudget}
        options={{
          title: 'Mi presupuesto',
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons
              name={focused ? 'wallet-sharp' : 'wallet-outline'} size={size} color={color} />
        }}/>
      <Tab.Screen
        name='MiAccount'
        component={MiAccount}
        options={{
          title: 'Mis datos',
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons
              name={focused ? 'person-sharp' : 'person-outline'} size={size} color={color} />
        }}/>
    </Tab.Navigator>
  )
}
