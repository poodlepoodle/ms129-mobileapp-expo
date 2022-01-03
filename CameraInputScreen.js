import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

export default function CameraInputScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.front);
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    
    Fade(titleOpacity, 1, 1000, true);
  }, []);



  const Fade = (fadeObj, fadeAmount, fadeDuration, isUseNativeDriver) => {
    Animated.timing(fadeObj, {
      toValue: fadeAmount,
      duration: fadeDuration,
      useNativeDriver: isUseNativeDriver,
    }).start();
  };

  // const [fontsLoaded, setFontsLoaded] = useState(false)

  if (hasPermission === null) {
    // console.log("permission : null");
    return <View />;
  }
  if (hasPermission === false) {
    // console.log("permission : no..");
    return (
      <View style={{backgroundColor : "#f3f7ff", flex: 1, justifyContent : "center", alignItems : "center"}}>
        <View style={{flexDirection:"row", justifyContent : "center", alignItems : "center"}}>
          <Image
            source={require('./assets/camera_screen/emoji_sad.png')}
            style={{
              width : SCREEN_WIDTH / 8.5,
              height : SCREEN_WIDTH / 8.5,
              marginRight : 10,
            }} />
          <Image
            source={require('./assets/camera_screen/emoji_camera.png')}
            style={{
              width : SCREEN_WIDTH / 8.5,
              height : SCREEN_WIDTH / 8.5,
            }} />
        </View>
        <Text style={{marginTop : SCREEN_WIDTH / 20, fontSize : 18, fontFamily : "applesd-800"}}>카메라 접근 권한을 허용으로 설정해 주세요 ㅠㅠ</Text>
      </View>
    );
  }
  
  // real app part
  else {
    return (
      <View style={{backgroundColor:"#f3f7ff", flex : 1}}>
        <StatusBar style="dark" />
        <Animated.View style={{...camerascreen_styles.title, opacity : titleOpacity}}>
          <View style={{marginHorizontal : SCREEN_WIDTH / 20}}>
            <Text style={camerascreen_styles.titletext}>가이드에 맞춰 사진을 찍어 주세요!</Text>
            <TouchableOpacity>
              <Image
                style={camerascreen_styles.titleimg}
                source={require('./assets/camera_screen/emoji_cameraflash.png')} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={{flex : 6, justifyContent : "center"}}>
          <Camera style={camerascreen_styles.camera} type={type} autoFocus="on"  ref={ref => {setCameraRef(ref);}}>
            <View style={{flex : 1, justifyContent : "center", alignItems : "center"}}>
              <Image
                style={camerascreen_styles.guideline_img}
                source={require('./assets/camera_screen/guideline.png')} />
            </View>
            <TouchableOpacity
              activeOpacity="0.3"
              style={{width : SCREEN_WIDTH / 5}}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Image
                style={camerascreen_styles.flip_img}
                source={require('./assets/camera_screen/icon_camera_flip.png')} />
            </TouchableOpacity>
          </Camera>
        </View>

        <View style={{flex : 2, marginBottom : SCREEN_WIDTH / 10, marginHorizontal : SCREEN_WIDTH / 20, justifyContent : "flex-end"}}>
          <TouchableOpacity
            activeOpacity="0.6"
            style={{
              backgroundColor : "#0e79e4",
              height : SCREEN_HEIGHT / 18,
              borderRadius : 10,
              marginTop : SCREEN_WIDTH / 10,
              justifyContent : "center",
              alignItems : "center",
              shadowColor: "#0e79e4",
              shadowOffset: {
                width : 0,
                height : 0,
              },
              shadowOpacity : 0.6,
              shadowRadius : 14,}}
            // onPress={() => {alert("찰칵!")}}>
            onPress={async() => {
              if(cameraRef){
                let photo = await cameraRef.takePictureAsync();
                navigation.push('InputConfirm', {
                  photoUri: photo.uri,
                  photoFrom: type === Camera.Constants.Type.back ? undefined : "camera"
                })
              }
            }}>
            <Text style={camerascreen_styles.common_buttontext}>찰칵!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}  

const camerascreen_styles = StyleSheet.create({
  title : {
    marginTop : SCREEN_HEIGHT / 12,
    flex : 2,
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
    marginBottom : SCREEN_WIDTH / 10,
  },
  camera: {
    // flex: 1,
    width : SCREEN_WIDTH,
    height : SCREEN_WIDTH / 1,
  },
  guideline_img : {
    marginTop : SCREEN_WIDTH * 0.15,
    width : SCREEN_WIDTH * 0.8,
    height : SCREEN_WIDTH * 0.8,
    opacity : 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width : 0,
      height : 0,
    },
    shadowOpacity : 1,
    shadowRadius : 14,
  },
  flip_img : {
    marginLeft : SCREEN_WIDTH / 20,
    marginBottom : SCREEN_WIDTH / 20,
    width : SCREEN_WIDTH / 10,
    height : SCREEN_WIDTH / 12,
  },
  common_buttontext : {
    fontSize : 15,
    // fontWeight : "900",
    fontFamily : "applesd-800",
    color : "white",
  },
});
