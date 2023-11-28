#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <MiSnapSDK/MiSnapSDK.h>
#import "MiSnapSDKViewControllerUX2.h"

@interface RnMobileDepositMisnap : NSObject <RCTBridgeModule, MiSnapViewControllerDelegate> {
    RCTPromiseResolveBlock cResolver;
    RCTPromiseRejectBlock cRejecter;
}

@property (nonatomic, strong) UINavigationController *miSnapSDKNavigationController;
+ (MiSnapSDKViewControllerUX2 *)getViewControllerWithDocumentType:(NSString *)docType andDelegate:(id<MiSnapViewControllerDelegate>)delegate;
@end
