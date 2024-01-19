import { View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import Button from '../../components/Button'
import { Text, Input } from 'react-native-elements'
import { mask } from 'react-native-mask-text'
import { useNavigation } from '@react-navigation/native'

export default function ChangeBudget (): React.JSX.Element {
  const navigation = useNavigation()
  const {
    user,
    updateBudget, formatAsMoney, stringWithOutFormat,
    getTotalExpenses
  } = useContext(AppContext)
  const [newBudget, setBudget] = useState(0)
  const [budgetError, setBudgetError] = useState('')
  const [showMessage, setShowMessage] = useState('')
  const [maskBudget, setMaskBudget] = useState(mask('', undefined, 'currency', {
    prefix: '$',
    decimalSeparator: ',',
    groupSeparator: '.',
    precision: 2
  }))
  const setNewBudget = (): void => {
    const value = newBudget
    if (value === 0) {
      setBudgetError('Ingresa un monto valido')
    }
    if (value < getTotalExpenses()) {
      setBudgetError('El monto ingresado es menor al total de los gastos.')
    }
    if (value > 0 && value >= getTotalExpenses()) {
      updateBudget(newBudget)
      setShowMessage('Se cambió el presupuesto correctamente')
      setBudgetError('')
    }
  }
  const returnHome = (): void => {
    navigation.goBack()
  }
  useEffect(() => {
    navigation.addListener('blur', () => {
      setBudget(0)
      setBudgetError('')
      setShowMessage('')
    })
  }, [navigation])
  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 30, justifyContent: 'space-evenly' }}>
      <View style={{ gap: 5 }}>
        {(showMessage.length > 0) &&
          <Text style={{
            color: 'green', fontSize: 15
          }}>{showMessage}</Text>

        }
        <Text style={{ fontSize: 22 }}>Elige un nuevo presupuesto</Text>
      </View>
      <View style={{ width: '100%', alignItems: 'center', gap: 10 }}>
        <Input
          style={{ textAlign: 'center', fontSize: 45 }}
          inputContainerStyle= {{ borderBottomWidth: 0, paddingHorizontal: 10 }}
          placeholder={formatAsMoney(user.budget)}
          value={(Number.isNaN(newBudget)) || newBudget === 0 ? '' : maskBudget}
          onChangeText={(text) => {
            setMaskBudget(mask(stringWithOutFormat(text), undefined, 'currency', {
              prefix: '$',
              decimalSeparator: ',',
              groupSeparator: '.',
              precision: 2
            }))
            setBudget(parseInt(stringWithOutFormat(text)))
          }} keyboardType='numeric' />
        <Text style={{ opacity: 0.5 }}>Mínimo {formatAsMoney(getTotalExpenses(false))}</Text>
        {
          (budgetError.length > 0) &&
          <Text style={{
            color: 'red', fontSize: 15
          }}>{budgetError}</Text>
        }
      </View>
      <View style={{ width: '100%', gap: 15 }}>
        <Button action={setNewBudget} text={'Guardar'} primary />
        {
          (showMessage.length > 0) &&
          <Button action={returnHome} text={'Volver'} />
        }
      </View>
    </View>
  )
}
