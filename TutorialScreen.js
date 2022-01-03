import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
// import * as Font from "expo-font"
// import { AppLoading } from "expo-app-loading";

// import React, { useState } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';

export default function TutorialScreen({ navigation }) {
  // const [fontsLoaded, setFontsLoaded] = useState(false)

  // if (!fontsLoaded) {
  //   return (<AppLoading 
  //   startAsync={getFonts}
  //   onFinish={() => setFontsLoaded} />);
  // }
  // else {
    return (
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text>튜토리얼 페이지</Text>
      </View>
    );
  // }
}