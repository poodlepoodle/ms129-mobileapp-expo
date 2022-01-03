import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';

let photoFromCamera = true;
const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export default function InputConfirmScreen({ route, navigation }) {
  const { photoUri, photoFrom } = route.params;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const confirmScale = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);

  if (photoFrom !== "camera") {
    photoFromCamera = false;
  }
  else {
    photoFromCamera = true;
  }

  const Fade = (fadeObj, fadeAmount, fadeDuration, isUseNativeDriver) => {
    Animated.timing(fadeObj, {
      toValue: fadeAmount,
      duration: fadeDuration,
      useNativeDriver: isUseNativeDriver,
    }).start();
  };

  const toScale = (scaleAmount, scaleDuration) => {
    Animated.timing(confirmScale, {
      toValue: scaleAmount,
      duration: scaleDuration,
      useNativeDriver: true,
    }).start();
  };

  // const [fontsLoaded, setFontsLoaded] = useState(false)
  useEffect(() => {
    Fade(titleOpacity, 1, 1000, true);
  });

  // console.log(photoFromCamera);

  return (
    <View style={{backgroundColor:"#f3f7ff", flex : 1}}>
      <StatusBar style="dark" />
      <Animated.View style={{...inputconfirmscreen_styles.title, opacity : titleOpacity}}>
          <View style={{marginHorizontal : SCREEN_WIDTH / 20}}>
            <Text style={inputconfirmscreen_styles.titletext}>이 사진으로 진행할까요?</Text>
            <TouchableOpacity activeOpacity="0.4">
              <Image
                style={inputconfirmscreen_styles.titleimg}
                source={require('./assets/inputconfirm_screen/emoji_gestureok.png')} />
            </TouchableOpacity>
          </View>
      </Animated.View>

      <View style={inputconfirmscreen_styles.confirm_view}>
        <Pressable
          onPressIn={() => {toScale(1.35, 200)}}
          onPressOut={() => {toScale(1, 200)}}
          style={{
          width : SCREEN_WIDTH / 1.6,
          height: SCREEN_WIDTH / 1.6,
          shadowColor: "#7295c3",
          shadowOffset: {
            width : 0,
            height : 15,
          },
          shadowOpacity : 0.4,
          shadowRadius : 20,
          resizeMode: 'contain',
          }}>
          {
            photoFromCamera ?
            <Animated.Image
              style={{...inputconfirmscreen_styles.confirm_img,
                transform: [
                  {scaleX : -1},
                  {scale : confirmScale}
                ]}}
              source={{uri: photoUri}} />
            :
            <Animated.Image
              style={{...inputconfirmscreen_styles.confirm_img,
                transform : [
                  {scale : confirmScale}
                ]}}
              source={{uri: photoUri}} />
          }
        </Pressable>
      </View>

      <View style={{
        flexDirection : "row",
        justifyContent : "space-between",
        marginBottom : SCREEN_WIDTH / 10,
        marginHorizontal : SCREEN_WIDTH / 20,
        marginTop : SCREEN_WIDTH / 20,
        }}>
        <TouchableOpacity
          activeOpacity="0.6"
          style={{...inputconfirmscreen_styles.common_button, backgroundColor : "#aecdeb88", shadowColor : "#7295c3"}}
          onPress={() => navigation.goBack()}>
          <Text style={{...inputconfirmscreen_styles.common_buttontext, color : "white"}}>다시 고를래요 ㅠ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity="0.6"
          style={{...inputconfirmscreen_styles.common_button, shadowColor : "#0e79e4"}}
          onPress={() => navigation.push('Select')}>
          <Text style={inputconfirmscreen_styles.common_buttontext}>이걸로 갈게요!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const inputconfirmscreen_styles = StyleSheet.create({
  title : {
    paddingTop : SCREEN_HEIGHT / 12,
  },
  titletext : {
    fontSize : 26,
    // fontWeight : "900",
    fontFamily : "applesd-900",
    color : '#0f123f',
    marginBottom : SCREEN_HEIGHT / 80,
  },
  titleimg : {
    width: SCREEN_WIDTH / 7,
    height: SCREEN_WIDTH / 7,
    marginBottom : SCREEN_WIDTH / 20,
  },
  confirm_view : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
  },
  confirm_img : {
    flex: 1,
    width: null,
    height: null,
    borderRadius : 20,
  },
  common_button : {
    backgroundColor : "#0e79e4",
    height : SCREEN_HEIGHT / 18,
    width : (SCREEN_WIDTH - (SCREEN_WIDTH / 20) * 3) / 2,
    borderRadius : 10,
    shadowColor: "#000",
    shadowOffset: {
      width : 0,
      height : 0,
    },
    shadowOpacity : 0.5,
    shadowRadius : 14,
    justifyContent : "center",
    alignItems : "center",
  },
  common_buttontext : {
    fontSize : 15,
    // fontWeight : "900",
    fontFamily : "applesd-800",
    color : "white",
  },
});