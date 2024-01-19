import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useId, useState } from 'react'
import Button from '../../components/Button'
import { Input, Text } from 'react-native-elements'
import { mask } from 'react-native-mask-text'
import { AppContext } from '../../context/AppContext'

export default function Login (): React.JSX.Element {
  const { stringWithOutFormat, setUser } = useContext(AppContext)
  const [loadInputs, setLoadInputs] = useState({
    id: useId(),
    first_name: '',
    last_name: '',
    budget: 0,
    fixedExpenses: []
  })

  const [maskAmount, setMaskAmount] = useState(mask(loadInputs.budget, undefined, 'currency', {
    prefix: '$',
    decimalSeparator: ',',
    groupSeparator: '.',
    precision: 2
  }))
  const [errorMessages, setErrorMessages] = useState({
    first_name: '',
    last_name: '',
    budget: ''
  })
  return (
    <ScrollView contentContainerStyle={{ padding: '10%', gap: 30, minHeight: '100%' }} >
      <Text style={styles.title}>Completa los siguientes datos</Text>
      <View style={styles.form}>
        <Input
          errorMessage={errorMessages.first_name}
          label='Nombre'
          placeholder='Nombre'
          value={loadInputs.first_name}
          onChangeText={(text) => {
            if (text.length === 0) {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  first_name: 'El nombre es obligatorio.'
                }
              })
            } else {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  first_name: ''
                }
              })
            }
            setLoadInputs({
              ...loadInputs,
              first_name: text
            })
          }}
        />
        <Input
          errorMessage={errorMessages.last_name}
          label='Apellido'
          placeholder='Apellido'
          returnKeyType='done'
          value={loadInputs.last_name}
          onChangeText={(text) => {
            if (text.length === 0) {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  last_name: 'El apellido es obligatorio.'
                }
              })
            } else {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  last_name: ''
                }
              })
            }
            setLoadInputs({
              ...loadInputs,
              last_name: text
            })
          }}
        />
        <Input
          errorMessage={errorMessages.budget}
          keyboardType='numeric'
          returnKeyType='done'
          placeholder='$0,00'
          label='Presupuesto'
          value={(Number.isNaN(loadInputs.budget)) || loadInputs.budget === 0 ? '' : maskAmount}
          onChangeText={(text) => {
            if (parseInt(stringWithOutFormat(text)) === 0) {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  budget: 'El presupuesto es obligatorio.'
                }
              })
            } else {
              setErrorMessages((prev) => {
                return {
                  ...prev,
                  budget: ''
                }
              })
            }
            setMaskAmount(mask(stringWithOutFormat(text), undefined, 'currency', {
              prefix: '$',
              decimalSeparator: ',',
              groupSeparator: '.',
              precision: 2
            }))
            setLoadInputs({
              ...loadInputs,
              budget: parseInt(stringWithOutFormat(text))
            })
          }}
        />
        <View style={{ marginTop: 'auto' }}>
          <Button text='Iniciar' action={() => {
            Object.is(loadInputs.first_name, '') && setErrorMessages(
              (prev) => {
                return {
                  ...prev,
                  first_name: 'El nombre es obligatorio.'
                }
              })
            Object.is(loadInputs.last_name, '') && setErrorMessages(
              (prev) => {
                return {
                  ...prev,
                  last_name: 'El apellido es obligatorio.'
                }
              })
            Object.is(loadInputs.budget, 0) && setErrorMessages(
              (prev) => {
                return {
                  ...prev,
                  budget: 'El presupuesto es obligatorio.'
                }
              })

            if (!Object.is(loadInputs.first_name, '') && !Object.is(loadInputs.last_name, '') && !Object.is(loadInputs.budget, 0)) {
              setUser(loadInputs)
            }
          }
          } primary
          />
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: '10%',
    minHeight: '100%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  form: {
    flex: 1,
    padding: 20
  },
  formInput: {
    borderBottomColor: '#14c8',
    borderBottomWidth: 1,
    marginVertical: 10
  },
  button: {
    backgroundColor: '#666',
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})
