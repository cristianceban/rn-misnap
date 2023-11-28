import {MiSnapScreen} from './MiSnapScreen';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

export const Stack = createStackNavigator();

export function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MiSnapScreen" component={MiSnapScreen} />
      <Stack.Screen name="NotMiSnapScreen" component={MiSnapScreen} />
    </Stack.Navigator>
  );
}
