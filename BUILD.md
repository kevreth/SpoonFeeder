# 📱 Quasar App PACKAGE Build Guide (Web & Android)

## 🌐 Windows Version

📦 To Package the web .exe

In quasar.config.js > packager > add: platform: 'win32'

`quasar build -m electron`

## 📱 Android App

Run Android Studio > choose More actions > choose Virtual device manger > click run on the device > waiting the device show up > run the command below in terminal:

🧪 For Development Mode (Live Testing)

`quasar dev -m capacitor -T android`

📦 For Full Build (Release or Share APK)

First time build:

```
npx cap init
quasar build -m capacitor -T android
npm install @capacitor/android OR yarn add @capacitor/android
npx cap add android
npx cap sync android
npx cap open android
```

Build:

```
quasar build -m capacitor -T android
npx cap open android
```
