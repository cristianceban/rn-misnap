import {Button, Text, View} from 'react-native';

import React from 'react';
import {useNavigation} from '@react-navigation/native';

export function NotMiSnapScreen() {
  const navigation = useNavigation<any>();

  const onPress = () => {
    navigation.navigate('MiSnapScreen');
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, backgroundColor: 'green'}}>
      <View>
        <Text>NotMiSnapScreen</Text>
      </View>
      <Button title="Go to MiSnapScreen" onPress={onPress} />
    </View>
  );
}
