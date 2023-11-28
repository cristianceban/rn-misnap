#import "RnMobileDepositMisnap.h"
#import <React/RCTLog.h>
#import <MiSnapSDK/MiSnapSDK.h>
#import "MiSnapSDKViewControllerUX2.h"
#import "Orientation.h"

@implementation RnMobileDepositMisnap

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

RCT_EXPORT_METHOD(captureCheckFront:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  cResolver = resolve;
  cRejecter = reject;
  [self showMiSnapViewControllerForDocumentType:kMiSnapDocumentTypeCheckFront];
}

RCT_EXPORT_METHOD(captureCheckBack:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  cResolver = resolve;
  cRejecter = reject;
  [self showMiSnapViewControllerForDocumentType:kMiSnapDocumentTypeCheckBack];
}


- (void)showMiSnapViewControllerForDocumentType:(NSString *)type
{
  dispatch_async(dispatch_get_main_queue(), ^{
    if (self.miSnapSDKNavigationController != NULL) {
      [self.miSnapSDKNavigationController dismissViewControllerAnimated:true completion:nil];
      self.miSnapSDKNavigationController = NULL;
    }
    MiSnapSDKViewControllerUX2 *miSnapSDKViewController = [RnMobileDepositMisnap getViewControllerWithDocumentType: type andDelegate: self];
    self.miSnapSDKNavigationController = [[UINavigationController alloc] initWithRootViewController: miSnapSDKViewController];
    self.miSnapSDKNavigationController.modalPresentationStyle = UIModalPresentationFullScreen;
    UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
    if (rootViewController != nil) {
        [Orientation setOrientation:UIInterfaceOrientationMaskLandscapeRight];
        [[UIDevice currentDevice] setValue:[NSNumber numberWithInteger: UIInterfaceOrientationLandscapeRight] forKey:@"orientation"];
        [UIViewController attemptRotationToDeviceOrientation];
        [rootViewController presentViewController:self.miSnapSDKNavigationController animated:true completion:nil];
    }
  });
}

#pragma mark - MiSnapSDKViewController Parameters
+ (NSDictionary *)getMiSnapCheckParameters:(NSString *)type
{
  NSMutableDictionary* parameters = [NSMutableDictionary dictionaryWithDictionary:[MiSnapSDKViewControllerUX2 defaultParametersForCheckFront]];
        
  if ([type isEqualToString:kMiSnapDocumentTypeCheckBack]) {
    parameters = [NSMutableDictionary dictionaryWithDictionary:[MiSnapSDKViewControllerUX2 defaultParametersForCheckBack]];
  }

  [parameters setObject:@"1" forKey:kMiSnapOrientationMode];
    
  return [parameters copy];
}

#pragma mark - Navigation
+ (MiSnapSDKViewController *)getViewControllerWithDocumentType:(NSString *)docType andDelegate:(id<MiSnapViewControllerDelegate>)delegate {

  MiSnapSDKViewControllerUX2 *miSnapSDKViewController = [[UIStoryboard storyboardWithName:@"MiSnapUX2" bundle:nil] instantiateViewControllerWithIdentifier:@"MiSnapSDKViewControllerUX2"];
  
  miSnapSDKViewController.delegate = delegate;
  [miSnapSDKViewController setupMiSnapWithParams:[self getMiSnapCheckParameters:docType]];
  return miSnapSDKViewController;
}

#pragma mark - MiSnapViewControllerDelegate
- (void)miSnapCancelledWithResults:(NSDictionary *)results forDocumentType:(NSString *)docType
{
  if (self.miSnapSDKNavigationController != nil) {
    [self.miSnapSDKNavigationController dismissViewControllerAnimated:YES completion: ^{
      NSMutableDictionary *userInfo = [[NSMutableDictionary alloc] init];
      userInfo[@"resultCode"] = results[kMiSnapResultCode];
      self->cRejecter(@"Cancelled", @"MiSnap was cancelled.",
        [NSError errorWithDomain:@"com.misnap" code:0 userInfo:userInfo]
      );
    }];
    self.miSnapSDKNavigationController = NULL;
  }
}

- (void)miSnapFinishedReturningEncodedImage:(NSString *)encodedImage originalImage:(UIImage *)originalImage andResults:(NSDictionary *)results forDocumentType:(NSString *)docType
{
  if (self.miSnapSDKNavigationController != nil) {
    [self.miSnapSDKNavigationController dismissViewControllerAnimated:YES completion: ^{
      NSMutableDictionary *resultDic = [[NSMutableDictionary alloc] init];
      resultDic[@"imageString"] = encodedImage;
      resultDic[@"docType"] = docType;
      self->cResolver(resultDic);
    }];
    self.miSnapSDKNavigationController = NULL;
  }
}

@end
