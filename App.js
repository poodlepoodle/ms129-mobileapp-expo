import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './MainScreen';
import SelectScreen from './SelectScreen';
import CameraInputScreen from './CameraInputScreen';
import AlbumInputScreen from './AlbumInputScreen';
import InputConfirmScreen from './InputConfirmScreen';
import ResultScreen from './ResultScreen';
import GalleryScreen from './GalleryScreen';
import TutorialScreen from './TutorialScreen';
import TestScreen from './TestScreen';

let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();
let seconds = today.getSeconds();
console.log(hours + '시 ' + minutes + '분 ' + seconds + '초 - launch!');

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Select" component={SelectScreen} />
        <Stack.Screen name="CameraInput" component={CameraInputScreen} />
        <Stack.Screen name="AlbumInput" component={AlbumInputScreen} />
        <Stack.Screen name="InputConfirm" component={InputConfirmScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}