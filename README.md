# React Native Chat app

## Description
A chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

### Built with
* React Native
* Expo
* Google Firebase
* Gifted Chat

### User Stories
* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

### Key Features
* A page where users can enter their name and choose a background color for the chat screen before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images
and location data.
* Data gets stored online and offline.


### What technology did I use and why?

I chose to create the mobile application using **React Native** due to the following considerations:
* Develop and maintain the same codebase across different OS (iOS and Android)
* Increased performance compared to Hybrid Apps as UI is rendered natively
* Possibility to access device's APIs (camera, microphone, ...) (compared to PWA)
* Use existing skills in JavaScript and React, no need to learn another programming language
* Large and active community

Further, I'm using **XCode** as an iOS simulator and **Android Studio** as an Android emulator.

I use **Expo** as a development environment to develop and test the app.

I use the **React Navigation** third party library to navigate between screens.

I use the React Native **Gifted Chat** library to create the UI of my chat app. The library has good GitHub statistics and is well documented. Further, it already provides predefined components for integral parts of the chat app:
* Message bubbles
* A message input field
* A send button
* Options for displaying user names and avatars

I'm working with **WebSocket** as a real-time application technology as it fulfills the following requirements of my chat application:
* Transmitting in- and outgoing data immediately
* Two-way communication between clients and server
* Avoids data bloat compared to long polling

I use **Cloud Firestore** as a data storage platform for this application. real-time data

### What challenges did I face, what did I learn?
* React and React Native is an ever evolving and the dependencie's dependencies have dependencies for their dependencies, I learned being aware of as many as possible can be very helpful.

* Many common practices have been depreciated or relabeled, downgrading or using older versions can be a temporary work around.

* An Expo go update came just in time to make my smoothly running app not even start. I found a  lovely stack overflow post that helped me get me back on track, the previous one. https://stackoverflow.com/questions/61359724/how-to-use-older-version-of-expo-with-the-mobile-app (In my case, my app uses expo sdk of v44.0.0, so the compatible expo client version is v2.23.2)


## Development Process for the chat application
### Set up Expo as Development Environment
1. Install Expo Command Line Interface
```bash
npm install expo-cli --global 
```

2. Create new Expo project in projects directory
```bash
expo init [project-name]
```

3. Start expo by navigating to project folder & running
```bash
npm start
```

### Install React Navigation library to navigate between screens
1. Navigate to project folder and run
```bash
npm install react-navigation
```

2. Install necessary dependencies
```bash
npm install @react-navigation/native @react-navigation/stack
expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

### Set up Android Studio as Android Emulator
1. Download Android Studio
2. Make sure 'Android Virtual Device' is installed
3. Add Android SDK Location to ~/.zshrc file
```bash
export ANDROID_SDK=/Users/myuser/Library/Android/sdk
export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
```
4. Create virtual device (via more actions > Virtual Device Manager) and click play to start
5. Select 'Run app on Android' in Expo to run app on virtual device
6. Press Command + Shift + R to start a screen recording.

### Integreat Gifted Chat library to create chat UI
1. Install Gifted Chat
```bash
npm install react-native-gifted-chat
```

2. Integrate Gifted Chat into application
```bash
import { GiftedChat } from 'react-native-gifted-chat';
```

3. Follow instructions to set up chat: https://github.com/FaridSafi/react-native-gifted-chat (I suggest using version 0.16.3)

### Set up Cloud Firestore as data storage platform
1. Install Firestore via Firebase
```bash
npm install firebase
```

2. Import Firestore in application (e.g, in Chat.js)
```bash
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
```

3. Register App in Firebase settings

4. Copy config code to application

5. Initialize app
```bash
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
```

6. Set up anonymous authentication in firebase console