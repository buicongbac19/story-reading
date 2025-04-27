# 📱 React Native Project with Expo Go

This project is built using **React Native (JavaScript)** and **Expo Go** for fast development and testing.

---

## 🛠 Tech Stack

- **React Native** with **JavaScript**
- **Expo Go** for app preview
- **Node.js v22.14.0**
- **Java JDK v24.0.1**
- **Android Studio** (SDK API 36-ext17)

---

## 📋 Requirements

Make sure your environment has:

- [Node.js v22.14.0](https://nodejs.org/en/)
- [Java JDK v24.0.1](https://jdk.java.net/24/)
- [Android Studio](https://developer.android.com/studio) with SDK **API 36-ext17**
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally
- **Expo Go** app installed on your smartphone (iOS/Android)

---

## 🖥 Installation Guide

### 1. Install Node.js

- Download and install **Node.js v22.14.0** from [here](https://nodejs.org/en/).
- Check version:

```bash
node -v
npm -v
```

### 2. Install Java JDK

- Download and install **Java JDK 24.0.1** from [here](https://www.oracle.com/vn/java/technologies/downloads/)

- After installation, set **JAVA_HOME**:

#### On Windows:

- Open **Environment Variables**

- Add new **JAVA_HOME** variable pointing to your JDK installation path (e.g., C:\Program Files\Java\jdk-24.0.1)

- Add **%JAVA_HOME%\bin** to your Path

Verify:

```bash
java -version
javac -version
```

### 3. Install Android Studio

- Install **Android Studio** from [here](https://developer.android.com/).

- Open **SDK Manager** and install:

- Android SDK Platform 36-ext17

- Android Emulator

- Android SDK Build-Tools

- Create an emulator (Pixel 6, etc.) with API 36-ext17.

### 4. Cấu hình ADB(Android Debug Bridge)

- Tìm đường dẫn đến thư mục **platform-tools**
- Mở **Control Panel ➔ System and Security ➔ System ➔ Advanced system settings ➔ Environment Variables**
- Trong phần **System variables**, tìm đến biến **Path**, bấm **Edit**
- **Add New** ➔ paste đường dẫn tới **platform-tools**
- Bấm **OK** để lưu

### 5. 🚀 Getting Started

#### 5.1. Clone the repository

```bash
git clone https://github.com/buicongbac19/story-reading.git
cd story-reading
```

#### 5.2. Install dependencies

```bash
npm install
# or
yarn install
```

#### 5.3. Start the Expo development server

```bash
npm start
# or
yarn start
```

#### 5.4. Run the app

- On your device (Expo Go App):
  - Open Expo Go on your smartphone.
  - Scan the QR code shown in the terminal or browser.
- On Android Emulator:
  - Start your emulator with API 36-ext17.
  - In Expo Developer Tools, click Run on **Android device/emulator**.

### 5.5. Project Structure

```bash
story-reading/
├── .expo/
├── assets/
├── node_modules/
├── src/
│   ├── components/
│   ├── context/
│   ├── navigation/
│   └── screens/
├── .gitignore
├── .prettierrc
├── App.js
├── app.json
├── index.js
├── package-lock.json
├── package.json
└── README.md
```
