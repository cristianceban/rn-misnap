import {Button, Text, View} from 'react-native';
import {CapturePhotoFlow, useMisnapCamera} from './useMisnapCamera';

import React from 'react';
import {useNavigation} from '@react-navigation/native';

export function MiSnapScreen() {
  const navigation = useNavigation<any>();
  const {captureCheckWithPermissions} = useMisnapCamera();

  const onPress = () => {
    navigation.navigate('NotMiSnapScreen');
  };

  const onPressMisnap = () => {
    captureCheckWithPermissions(CapturePhotoFlow.Back);
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <View>
        <Text>MiSnapScreen</Text>
      </View>
      <Button title="Go to NotMiSnapScreen" onPress={onPress} />
      <Button title="START MISNAP FLOW" onPress={onPressMisnap} />
    </View>
  );
}
