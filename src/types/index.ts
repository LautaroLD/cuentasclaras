export interface FixedExpense {
  title: string
  value: number
  date: string
  color: string
  id: string
}
export interface User {
  id: string
  first_name: string
  last_name: string
  budget: number
  fixedExpenses: FixedExpense[] | []
}

export interface AppContextInterface { // variables
  user: User
  isLoadingUserData: boolean
  // functions
  setDataUser: (user: User) => void
  setUser: React.Dispatch<React.SetStateAction<User>>
  saveFixedExpenses: (newExpense: FixedExpense) => void
  calculateDifference: () => number
  generateRandomColor: () => string
  removeFixedExpenses: (expenseId: string) => void
  updateBudget: (newBudget: number) => void
  formatAsMoney: (value: number) => string
  stringWithOutFormat: (value: string) => string
  getTotalExpenses: (isPercent?: boolean) => number
}
