import {NativeModules, Platform} from 'react-native';

const LINKING_ERROR =
  "The package '@d3banking/rn-mobile-deposit-misnap' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const RnMobileDepositMisnap = NativeModules.RnMobileDepositMisnap
  ? NativeModules.RnMobileDepositMisnap
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

export enum MiSnapDocumentType {
  checkFront = 'CheckFront',
  checkBack = 'CheckBack',
}

export interface MiSnapResponse {
  docType: MiSnapDocumentType;
  imageString: string;
}

export function captureCheckFront(): Promise<MiSnapResponse> {
  return RnMobileDepositMisnap.captureCheckFront();
}

export function captureCheckBack(): Promise<MiSnapResponse> {
  return RnMobileDepositMisnap.captureCheckBack();
}
