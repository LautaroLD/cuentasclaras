import { TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Input, Text } from 'react-native-elements'
import { AppContext } from '../../context/AppContext'
import Ionicons from '@expo/vector-icons/Ionicons'
import { INITIAL_STATUS } from '../../utils'

export default function MiAccount (): React.JSX.Element {
  const { user, formatAsMoney, setUser } = useContext(AppContext)
  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Input
        inputContainerStyle={{ borderBottomWidth: 0 }}
        value={user.first_name}
        label='Nombre'
        editable={false}
      />
      <Input
        inputContainerStyle={{ borderBottomWidth: 0 }}
        value={user.last_name}
        label='Apellido'
        editable={false}
      />
      <Input
        inputContainerStyle={{ borderBottomWidth: 0 }}
        value={formatAsMoney(user.budget)}
        label='Presupuesto'
        editable={false}
      />
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, alignSelf: 'center', marginTop: 'auto', width: '100%' }} onPress={() => {
        setUser({
          ...INITIAL_STATUS
        })
      } } >
        <Text>Borrar mis datos</Text>
        <Ionicons name='log-out-outline' size={17} />
      </TouchableOpacity>
    </View>
  )
}
