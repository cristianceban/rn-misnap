import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {captureCheckBack, captureCheckFront} from './interface';
import {useCallback, useState} from 'react';

import {Alert} from 'react-native';
import Orientation from 'react-native-orientation-locker';

export enum CapturePhotoFlow {
  Front,
  Back,
  Both,
}

export type ImageAngle = 'back' | 'front';

export function useMisnapCamera() {
  const [isLoading, setIsLoading] = useState(false);

  const showCameraPermissionsAlert = useCallback((message: string) => {
    Alert.alert(
      'permission camera',
      message,
      [
        {
          text: 'permission camera text',
        },
      ],
      {
        cancelable: true,
      },
    );
  }, []);

  const captureCheck = useCallback(
    async (captureType: CapturePhotoFlow = CapturePhotoFlow.Both) => {
      try {
        setIsLoading(true);
        if (
          captureType === CapturePhotoFlow.Front ||
          captureType === CapturePhotoFlow.Both
        ) {
          const {imageString: rawFrontImage} = await captureCheckFront();
          // setCheckFrontPhoto(rawFrontImage);
        }
        if (
          captureType === CapturePhotoFlow.Back ||
          captureType === CapturePhotoFlow.Both
        ) {
          const {imageString: rawBackImage} = await captureCheckBack();
          // setCheckBackPhoto(rawBackImage);
        }
        setIsLoading(false);
        Orientation.lockToPortrait();
      } catch (error: any) {
        Orientation.lockToPortrait();
        // validateCheckPhotos();
        if (
          (error.code === 'Cancelled' &&
            error.userInfo.resultCode &&
            error.userInfo.resultCode !== 'Cancelled') ||
          !error.code
        ) {
          Alert.alert(
            'capture error title',
            'capture error message',
            [
              {
                text: 'capture error button text',
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            },
          );
        }
      }
    },
    [],
  );

  const processCameraPermissionsResult = useCallback(
    async (result: string, captureType: CapturePhotoFlow) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          showCameraPermissionsAlert('permission camera unavailable text');
          break;
        case RESULTS.DENIED: {
          const permission = await request(PERMISSIONS.IOS.CAMERA);
          await processCameraPermissionsResult(permission, captureType);
          break;
        }
        case RESULTS.GRANTED:
          await captureCheck(captureType);
          break;
        case RESULTS.BLOCKED:
          showCameraPermissionsAlert('permission blocked ');
          break;
      }
      setIsLoading(false);
    },
    [captureCheck, showCameraPermissionsAlert],
  );

  const captureCheckWithPermissions = useCallback(
    async (captureType: CapturePhotoFlow) => {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      await processCameraPermissionsResult(result, captureType);
    },
    [processCameraPermissionsResult],
  );

  return {
    isLoading: isLoading,
    captureCheckWithPermissions,
  };
}
