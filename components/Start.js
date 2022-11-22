import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native';
import BackgroundImage from '../assets/background-image.png';

import { signInAnonymously } from "firebase/auth";
import { auth } from '../config/firebase';

import NetInfo from '@react-native-community/netinfo';

const colors = {
  black: "#090C08",
  purple: "#474056",
  grey: "#8A95A5",
  green: "#B9C6AE",
};

export default function Start(props) {
  let [name, setName] = useState();
  let [color, setColor] = useState();

  const [isConnected, setIsConnected] = useState(false);

  const onHandleStart = () => {
    if (isConnected) {
      signInAnonymously(auth)
        .then(() => {
          console.log('Login success');
          props.navigation.navigate('Chat', { name: name, color: color });
        })
        .catch(err => console.log(`Login err: ${err}`));
    }
    else {
      props.navigation.navigate('Chat', { name: name, color: color });
    }
  }

  useEffect(() => {

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });

  })


  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode='cover'
        style={styles.image}
      >

        <Text style={styles.title}>Chat tApp</Text>

        <View style={styles.box}>

          <TextInput
            onChangeText={(name) => setName(name)}
            value={name}
            style={styles.input}
            placeholder='Name...'
          />

          <Text style={styles.text}>Choose Background Color:</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={"Select color for chatscreen background."}
              accessibilityHint={"You can pick your own background color."}
              accessibilityRole={"button"}
              style={[{ backgroundColor: colors.black }, styles.colorbutton]}
              onPress={() => setColor(colors.black)}
            />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={"Select color for chatscreen background."}
              accessibilityHint={"You can pick your own background color."}
              accessibilityRole={"button"}
              style={[{ backgroundColor: colors.purple }, styles.colorbutton]}
              onPress={() => setColor(colors.purple)}
            />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={"Select color for chatscreen background."}
              accessibilityHint={"You can pick your own background color."}
              accessibilityRole={"button"}
              style={[{ backgroundColor: colors.grey }, styles.colorbutton]}
              onPress={() => setColor(colors.grey)}
            />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={"Select color for chatscreen background."}
              accessibilityHint={"You can pick your own background color."}
              accessibilityRole={"button"}
              style={[{ backgroundColor: colors.green }, styles.colorbutton]}
              onPress={() => setColor(colors.green)}
            />
          </View>

          <Pressable
            onPress={onHandleStart}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? '#585563'
                  : '#757083'
              },
              styles.button
            ]}
          >
            <Text style={styles.buttontext}>Start Chatting</Text>
          </Pressable>
        </View>
      </ImageBackground>
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff',
  },

  box: {
    width: '88%',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-evenly',

  },

  input: {
    height: 50,
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,

  },

  text: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
  },

  colorContainer: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  colorbutton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  button: {
    height: 50,
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttontext: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  }
});