# MiSnap RN Integration

This is a very basic rn app which integrate miSnap SDK 4.9.1 
On iPad in some cases when we start miSnap flow, the rectangle for checks is not centered all the time, in some cases it shows in the corner. This is a very strange behavior. It is happening mainly on real devices, but sometimes it could happen in simulator also (but not so often).

## How to run it

You need to have react native environment setup. please follow [this](https://reactnative.dev/docs/environment-setup).
You'll need only iOS target part, no need to setup for android also

After that you'll need to clone this repo

make sure to install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

run these commands in project root

1. `yarn`
2. `cd ios && pod install && cd ..`
3. `yarn ios`

last command will run the app on default device. if you want to select a specific device you can open ios folder in xcode `MiSnapIntegrationRN.xcodeproj` and run it from there using standard xcode workflow.

on iPAD you can see that strange behavior (see `ipad.mp4` file attached in this repo)
