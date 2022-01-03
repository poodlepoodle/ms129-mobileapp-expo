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
  ImageBackground,
  Dimensions,
  Easing,
} from 'react-native';
import ImageBlurLoading from 'react-native-image-blur-loading'

// var AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_STATE = 5;
const states = [
  "화면 로딩 중...",
  "이미지를 준비하는 중...",
  "이미지를 서버에 보내는 중...",
  "이미지를 서버에서 처리하는 중...",
  "완성된 이미지를 요청하는 중...",
];

export default function ResultScreen({ route, navigation }) {
  // const backgroundOpacity = useRef(new Animated.Value(0.1)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const loadingTextOpacity = useRef(new Animated.Value(0)).current;
  const loadingScale = useRef(new Animated.Value(0)).current;
  const [processState, setProcessState] = useState(0);
  const loadingTimer = useRef(null);
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const Fade = (fadeObj, fadeAmount, fadeDuration, isUseNativeDriver) => {
    Animated.timing(fadeObj, {
      toValue : fadeAmount,
      duration : fadeDuration,
      useNativeDriver : isUseNativeDriver,
    }).start();
  };
  const Rotate = Animated.timing(rotateAnimation, {
    toValue: 1,
    duration: 15000,
    useNativeDriver : true,
    easing : Easing.linear,
  });

  useEffect(() => {
    console.log("상태 :", states[processState]);
    switch (processState) {
      case 0:
        Fade(titleOpacity, 1, 1000, true);
        break;
  
      case 1:
        Fade(backgroundOpacity, 1, 1000, true);
        Fade(loadingTextOpacity, 1, 1000, true);
        // Rotate(rotateAnimation, 1, 15000, true)
        // loadingTimer.current = setInterval(() => Rotate(rotateAnimation, 1, 15000, true), 15020);
        Animated.loop(
          Rotate,
          {
            iterations: -1,
          }
        ).start();
        setTimeout(() => {
          toScale(loadingScale, 0.15, 1500, true);
        }, 500);
        break;
  
      case 2:
        toScale(loadingScale, 0.30, 1500, true);
        break;
  
      case 3:
        toScale(loadingScale, 0.60, 1500, true);
        break;

      case 4:
        toScale(loadingScale, 1, 1500, true);
        break;
    
      default:
        break;
    }

  }, [processState]);

  // const toSize = (widthObj, toWidth, heightObj, toHeight, duration, isUseNativeDriver) => {
  //   Animated.timing(widthObj, {
  //     toValue: toWidth,
  //     duration: duration,
  //     useNativeDriver: isUseNativeDriver,
  //   }).start();
  //   Animated.timing(heightObj, {
  //     toValue: toHeight,
  //     duration: duration,
  //     useNativeDriver: isUseNativeDriver,
  //   }).start();
  // };
  const toScale = (scaleObj, toScale, duration, isUseNativeDriver) => {
    Animated.timing(scaleObj, {
      toValue: toScale,
      duration: duration,
      useNativeDriver: isUseNativeDriver,
    }).start();
  };

  return (
    <View style={{backgroundColor:"#f3f7ff", flex : 1}}>
      <Animated.Image
        source={require('./assets/result_screen/gradient_hard_background.jpg')}
        // resizeMode="cover"
        style={{
          position : "absolute",
          width : SCREEN_WIDTH,
          height : SCREEN_HEIGHT,
          opacity : backgroundOpacity}} />
      <View style={{flex : 1, backgroundcolor : "#white"}}>
        <StatusBar style="dark" />
        <Animated.View style={{...resultscreen_styles.title, opacity : titleOpacity}}>
          <View style={{marginHorizontal : SCREEN_WIDTH / 20}}>
            <Text style={{...resultscreen_styles.titletext}}>증명사진을 만들고 있어요..!{"\n"}잠시만 기다려 주세요 :)</Text>
            <TouchableOpacity activeOpacity="0.4">
              <Image
                style={resultscreen_styles.titleimg}
                source={require('./assets/result_screen/emoji_bubbleface.png')} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={{...resultscreen_styles.result_view}}>
          <Animated.View style={{width : SCREEN_WIDTH / 1.1, height : SCREEN_WIDTH / 1.1, resizeMode: 'contain',
            transform: [
              { scale : loadingScale },
              { rotate : interpolateRotating }
            ]}}>
            <Image
              blurRadius={16}
              source={require('./assets/result_screen/loading_gradient.png')}
              style={resultscreen_styles.loading_gradient} />
          </Animated.View>
          <Animated.Text style={{...resultscreen_styles.loading_text, opacity : loadingTextOpacity}}>
            {states[processState]}
          </Animated.Text>
        </View>

        <View style={resultscreen_styles.bottom_view}>
          <View style={{paddingLeft : SCREEN_WIDTH / 20, paddingTop : SCREEN_WIDTH / 20}}>
            <Text style={{...resultscreen_styles.titletext, marginBottom : SCREEN_WIDTH / 20}}>앨범에 사진을 저장할까요?</Text>
          </View>
          <View style={resultscreen_styles.bottom_button_view}>  
            <TouchableOpacity
              activeOpacity="0.6"
              style={{...resultscreen_styles.common_button, shadowColor : "#0e79e4"}}
              onPress={() => {
                if(processState + 1 != MAX_STATE) {
                  setProcessState(processState + 1);
                }
              }}>
              <Text style={resultscreen_styles.common_buttontext}>네~~~~~~</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity="0.6"
              style={{...resultscreen_styles.common_button, backgroundColor : "#aecdeb88", shadowColor : "#7295c3"}}
              onPress={() => {
                
              }}>
              <Text style={{...resultscreen_styles.common_buttontext, color : "#0f123f"}}>엥...? 다시 할래요ㅠ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const resultscreen_styles = StyleSheet.create({
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

  result_view : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
  },
  loading_gradient : {
    flex: 1,
    width: null,
    height: null,
  },
  loading_text : {
    marginTop : SCREEN_WIDTH / 20,
    fontSize : 16,
    // fontWeight : "600",
    fontFamily : "applesd-600",
    color : "white",
    // color : "#0f123f",
    shadowColor: "#0e79e4",
    shadowOffset: {
      width : 0,
      height : 2,
    },
    shadowOpacity : 0.6,
    shadowRadius : 12,
  },
  bottom_view : {
    opacity : 0,
  },
  bottom_button_view : {
    flexDirection : "row",
    justifyContent : "space-between",
    marginBottom : SCREEN_WIDTH / 10,
    marginHorizontal : SCREEN_WIDTH / 20,
  },
  common_button : {
    backgroundColor : "#0e79e4",
    height : SCREEN_HEIGHT / 18,
    width : (SCREEN_WIDTH - (SCREEN_WIDTH / 20) - (SCREEN_HEIGHT / 20)) / 2,
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