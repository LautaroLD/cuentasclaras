import { AppContext } from '../context/AppContext'
import { Input, Text } from 'react-native-elements'
import { mask } from 'react-native-mask-text'
import { type FixedExpense } from '../types'
import { useNavigation } from '@react-navigation/native'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import Button from './Button'
import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useContext, useState, useId } from 'react'

const ExpenseEditor: React.FC<any> = ({ route }) => {
  const navigation = useNavigation()
  const { params } = route
  const {
    title,
    value,
    date,
    id,
    color
  } = params
  const { saveFixedExpenses, generateRandomColor, calculateDifference, stringWithOutFormat } = useContext(AppContext)
  const [showError, setShowError] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [loadInputs, SetLoadInputs] = useState<FixedExpense>({
    title: title ?? '',
    value: value ?? 0,
    date: date ?? '',
    color: color ?? generateRandomColor(),
    id: id ?? useId()
  })
  const saveExpense = (): void => {
    Object.is(loadInputs.title, '') && setErrorMessages(
      (prev) => {
        return {
          ...prev,
          title: 'El titulo es obligatorio.'
        }
      })
    Object.is(loadInputs.date, '') && setErrorMessages(
      (prev) => {
        return {
          ...prev,
          date: 'La fecha es obligatoria.'
        }
      })
    Object.is(loadInputs.value, 0) && setErrorMessages(
      (prev) => {
        return {
          ...prev,
          value: 'El monto es obligatorio.'
        }
      })

    if (!Object.is(loadInputs.title, '') && !Object.is(loadInputs.date, '') && !Object.is(loadInputs.value, 0)) {
      const propValue = value ?? 0
      if (loadInputs.value - propValue > calculateDifference()) {
        setShowError('El monto supera el dinero disponible.')
      } else {
        saveFixedExpenses(loadInputs)
        navigation.goBack()
      }
    }
  }
  const [errorMessages, setErrorMessages] = useState({
    title: '',
    date: '',
    value: ''
  })
  const [maskAmount, setMaskAmount] = useState(mask(loadInputs.value, undefined, 'currency', {
    prefix: '$',
    decimalSeparator: ',',
    groupSeparator: '.',
    precision: 2
  }))
  return (
    <ScrollView
      style={{ position: 'absolute', backgroundColor: '#fff', zIndex: 10, height: '100%', width: '100%' }} contentContainerStyle={{ paddingHorizontal: '10%', paddingVertical: '5%', minHeight: '100%', width: '100%' }}>
      {
        (showError.length !== 0) &&
      <Text style={{ backgroundColor: 'red', padding: 10, textAlign: 'center', color: '#fff', fontSize: 17, fontWeight: '700' }}>{showError}</Text>
      }
      <Text style={{ marginBottom: 20 }}>{(title === undefined) ? 'Completa con los datos de tu nuevo consumo.' : `edita los datos de ${title}` } </Text>
      <View style={{ alignItems: 'center' }}>
        <Input
          errorMessage={errorMessages.title}
          placeholder='Luz'
          onChangeText={(text) => {
            if (text.length === 0) {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  title: 'El titulo es obligatorio.'
                }
              })
            } else {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  title: ''
                }
              })
            }
            SetLoadInputs({
              ...loadInputs,
              title: text
            })
          }}
          value={loadInputs.title}
          label='Titulo' />
        <Input
          errorMessage={errorMessages.value}
          keyboardType='numeric'
          placeholder='$0,00'
          label='Monto'
          value={(Number.isNaN(loadInputs.value)) || loadInputs.value === 0 ? '' : maskAmount}
          onChangeText={(text) => {
            if (parseInt(stringWithOutFormat(text)) === 0) {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  value: 'El monto es obligatorio.'
                }
              })
            }
            if (parseInt(stringWithOutFormat(text)) > calculateDifference()) {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  value: 'El monto supera el dinero disponible.'
                }
              })
            } else {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  value: ''
                }
              })
            }
            setMaskAmount(mask(stringWithOutFormat(text), undefined, 'currency', {
              prefix: '$',
              decimalSeparator: ',',
              groupSeparator: '.',
              precision: 2
            }))
            SetLoadInputs({
              ...loadInputs,
              value: parseInt(stringWithOutFormat(text))
            })
          }}
        />
        <TouchableOpacity style={{ width: '100%' }} onPress={() => {
          setShowPicker(true)
        }}>
          <Input label='Fecha de pago' placeholder={new Date().toLocaleDateString()} value={(loadInputs.date.length > 0) ? new Date(loadInputs.date).toLocaleDateString() : ''} editable={false} errorMessage={errorMessages.date}/>
        </TouchableOpacity>
        {showPicker &&
        <DateTimePicker
          minimumDate={new Date()}
          value={new Date()}
          mode='date'
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate?.toDateString() ?? new Date().toDateString()
            setShowPicker(false)
            SetLoadInputs({
              ...loadInputs,
              date: currentDate
            })
            Object.is(loadInputs.date, '') && setErrorMessages(
              (prev) => {
                return {
                  ...prev,
                  date: ''
                }
              })
          }}

        />}
        <View style={{ gap: 10, marginVertical: '20%' }}>
          <Button action={ saveExpense }text={'Guardar'} primary />
          <Button action={() => { navigation.goBack() }} text={'Cancelar'} />
        </View>
      </View>
    </ScrollView>
  )
}

export default ExpenseEditor
