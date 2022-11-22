import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text } from 'react-native';

import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";

import { auth, db } from '../config/firebase';

//Starts Firebase and refrences the service
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function Chat(props) {
    let { name, color } = props.route.params;        
    const [messages, setMessages] = useState([]); // Holds messages
    const [isConnected, setIsConnected] = useState();

    //refrence for messages collection from useState
    const messagesRef = collection(db, 'messages');

    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messages));
      }
      catch (error) {
        console.log(error.message);
      }
    }

    const deleteMessages = async () => {
      try {
        await AsyncStorage.removeItem('messages');
      }
      catch (error) {
        console.log(error.message);
      }
    }

    const getMessages = async () => {
      let messages = '';
      try {
        messages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(messages));
      }
      catch (error) {
        console.log(error.message);
      }
    }

    useEffect(() => {
      props.navigation.setOptions({ title: name });
  
      let unsubscribe;
  
      NetInfo.fetch().then(connection => {
        if (connection.isConnected) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      });
  
      if (isConnected) {
        const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));
  
        unsubscribe = onSnapshot(messagesQuery, onCollectionUpdate);
  
        deleteMessages();
        saveMessages();
  
        return () => unsubscribe();
      }
      else {
        getMessages();
      }
    }, [isConnected]);

    // Saves a message object to the collection
    const addMessage = (message) => {
      addDoc(messagesRef, {
        _id: message._id, 
        createdAt: message.createdAt,
        text: message.text || '',
        user: message.user
      });
    }
      
      // When sent displays message and sends to colletion
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        addMessage(messages[0]);
      }, [])
      
      // Updates the collection whenever it changes
      const onCollectionUpdate = (querySnapshot) => {
        setMessages(
        querySnapshot.docs.map(doc => ({
            _id: doc.data()._id,
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate(),
            user: doc.data().user
          }))
        )
      }

      // Styles the message bubble
      const renderBubble = (props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#000'
              }
            }}
          />
        )
      }

      const renderInputToolbar = (props) => {
        if (!isConnected) {
          // Hide Toolbar
        }
        else {
          // Display Toolbar
          return (
            <InputToolbar
              {...props}
            />
          );
        }
      }

    return (
        <View style={[{ backgroundColor: color }, styles.container]}>
      <GiftedChat
        renderBubble={renderBubble.bind()}
        renderInputToolbar={renderInputToolbar.bind()}
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.uid,
          name: name,
          avatar: 'https://placeimg.com/140/140/any'
        }}
      />
      {/* Fixes rendering issues for certain android phones */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    text: {
        color: '#ffffff'
    },
});