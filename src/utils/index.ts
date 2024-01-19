import { mask } from 'react-native-mask-text'
import { type FixedExpense, type User } from '../types'
import * as Notifications from 'expo-notifications'

export const INITIAL_STATUS: User = {
  id: '',
  first_name: '',
  last_name: '',
  budget: 0,
  fixedExpenses: []
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})
export const sendNotification = (newExpense: FixedExpense): void => {
  const { date, title, value } = newExpense

  void Notifications.scheduleNotificationAsync({
    content: {
      title: `Se cargó ${title}`,
      body: `vence el ${new Date(date).toLocaleDateString()} y debes pagar ${mask(value, undefined, 'currency', {
        prefix: '$',
        decimalSeparator: ',',
        groupSeparator: '.',
        precision: 2
      })}`
    },
    trigger: null
  })
}
