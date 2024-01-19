import React, { createContext, useState, useEffect } from 'react'
import randomcolor from 'randomcolor'
import { type FixedExpense, type User, type AppContextInterface } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { INITIAL_STATUS, sendNotification } from '../utils'

export const AppContext = createContext<AppContextInterface>({
  user: {
    first_name: '',
    last_name: '',
    budget: 0,
    fixedExpenses: [],
    id: ''
  },
  setUser: function (value: React.SetStateAction<User>): void {
    throw new Error('Function not implemented.')
  },
  saveFixedExpenses: function (newExpense: FixedExpense): void {
    throw new Error('Function not implemented.')
  },
  calculateDifference: function (): number {
    throw new Error('Function not implemented.')
  },
  generateRandomColor: function (): string {
    throw new Error('Function not implemented.')
  },
  removeFixedExpenses: function (expenseId: string): void {
    throw new Error('Function not implemented.')
  },
  updateBudget: function (newBudget: number): void {
    throw new Error('Function not implemented.')
  },
  formatAsMoney: function (value: number): string {
    throw new Error('Function not implemented.')
  },
  stringWithOutFormat: function (value: string): string {
    throw new Error('Function not implemented.')
  },
  getTotalExpenses: function (): number {
    throw new Error('Function not implemented.')
  },
  setDataUser: function (user: User): void {
    throw new Error('Function not implemented.')
  },
  isLoadingUserData: false
})

export function AppProvider ({ children }: { children: React.JSX.Element }): React.JSX.Element {
  const [user, setUser] = useState<User>(INITIAL_STATUS)
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)
  const getDataUser = (): void => {
    void (async () => {
      try {
        const data = await AsyncStorage.getItem('user')
        if (data != null) {
          setUser(JSON.parse(data))
        }
      } catch (error) {
      }
    })()
  }

  const setDataUser = (user: User): void => {
    void (async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
          setIsLoadingUserData(false)
        })
      } catch (error) {
      }
    })()
  }
  useEffect(() => {
    getDataUser()
  }, [])
  useEffect(() => {
    setDataUser(user)
  }, [user])
  function calculateDifference (): number {
    return user.budget - user.fixedExpenses.reduce((acumulador, expense) => acumulador + expense.value, 0)
  }
  function getTotalExpenses (isPercent?: boolean): number {
    return (isPercent === true) ? (user.budget - calculateDifference()) * 100 / user.budget : user.budget - calculateDifference()
  }

  function saveFixedExpenses (newExpense: FixedExpense): void {
    const expense = user.fixedExpenses?.findIndex((expense) => expense.id === newExpense.id)

    if (expense >= 0) {
      setUser(prevUser => {
        const updatedExpenses = prevUser.fixedExpenses.map(expense => {
          if (expense.id === newExpense.id) {
            return newExpense
          } else {
            return expense
          }
        })
        return {
          ...prevUser,
          fixedExpenses: updatedExpenses
        }
      })
    } else {
      setUser({
        ...user,
        fixedExpenses: [...user.fixedExpenses, newExpense]
      })
    }
    sendNotification(newExpense)
  }

  function removeFixedExpenses (expenseId: FixedExpense['id']): void {
    setUser({
      ...user,
      fixedExpenses: [...user.fixedExpenses.filter(item => item.id !== expenseId)]
    })
  }

  function generateRandomColor (): string {
    const colors = user.fixedExpenses.map((elemento) => elemento.color)
    const newColor = randomcolor()
    return !colors.includes(newColor) ? newColor : generateRandomColor()
  }
  function updateBudget (newBudget: User['budget']): void {
    setUser({
      ...user,
      budget: newBudget
    })
  }

  function stringWithOutFormat (value: string): string {
    return value.replace(/[^0-9]/g, '')
  }
  function formatAsMoney (value: string | number): string {
    const noFormat = typeof value === 'string' ? parseInt(stringWithOutFormat(value)) : value
    const withFormat = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(noFormat / 100)
    return withFormat
  }

  return (
    <AppContext.Provider value={{
      // variables
      user,
      isLoadingUserData,
      // functions
      setDataUser,
      setUser,
      saveFixedExpenses,
      calculateDifference,
      generateRandomColor,
      removeFixedExpenses,
      updateBudget,
      formatAsMoney,
      stringWithOutFormat,
      getTotalExpenses
    }}>
      {children}
    </AppContext.Provider>
  )
}
