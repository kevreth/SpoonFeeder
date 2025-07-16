# Quasar App PACKAGE Build Guide (Web & Android)

## 🌐 Windows Version

📦 To Package the web .exe

In quasar.config.js > packager > add: platform: 'win32'

`quasar build -m electron`

## Android App

📱 Android Studio Setup
Run Android Studio.
Choose More actions > Virtual Device Manager.
Click Run on your desired virtual device.
Wait for the device to show up.

🧪 For Development Mode (Live Testing)
quasar dev -m capacitor -T android

📦 For Full Build (Release or Share APK)
First full build:

```
quasar mode add capacitor
# Choose by default when prompted.
(If you see an error about the package directory, it's expected and will be addressed.)

touch src-capacitor/yarn.lock
yarn install
quasar build -m capacitor -T android

npx cap init
# When prompted, specify 'src-capacitor/www' as the web asset directory.
# You can also change the app name and package ID as desired.

yarn add @capacitor/android
yarn add @capacitor/core
npx cap add android
npx cap sync android
npx cap open android
Android Studio open > waiting it finish import > click play to run
```

Build:

```
quasar build -m capacitor -T android
npx cap open android
```
