import React, { useState, useRef, useEffect, useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { 
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ImageBackground,
  // ActivityIndicator,
} from 'react-native';
import ImageBlurLoading from 'react-native-image-blur-loading'
import ProgressBar from 'react-native-progress/Bar';

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');
let offsetY = null;

export default function GalleryScreen({ navigation }) {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const galleryViewOpacity = useRef(new Animated.Value(0)).current;

  const Fade = (fadeObj, fadeAmount, fadeDuration, isUseNativeDriver) => {
    Animated.timing(fadeObj, {
      toValue: fadeAmount,
      duration: fadeDuration,
      useNativeDriver: isUseNativeDriver,
    }).start();
  };

  useEffect(() => {
    Fade(titleOpacity, 1, 1000, true);
    setTimeout(() => {
      Fade(galleryViewOpacity, 1, 500, true);
    }, 250);
  });

  return (
    <View style={{backgroundColor:"#f3f7ff", flex : 1}}>
      <StatusBar style="dark" />
      <Animated.View style={{...galleryscreen_styles.title, opacity : titleOpacity}}>
          <View style={{marginHorizontal : SCREEN_WIDTH / 20}}>
            <Text style={galleryscreen_styles.titletext}>예전에 만들었던 사진들을 꺼내봤어요.</Text>
            <TouchableOpacity activeOpacity="0.4">
              <Image
                style={galleryscreen_styles.titleimg}
                source={require('./assets/gallery_screen/emoji_winking.png')} />
            </TouchableOpacity>
          </View>
      </Animated.View>
      
      <ScrollView
        showsVerticalScrollIndicator="false"
        style={{}} >
        <Animated.View style={{...galleryscreen_styles.gallery_view, opacity : galleryViewOpacity}}>
          <Text style={galleryscreen_styles.sub_titletext}>2021년 12월</Text>
          <View style={{}} >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator="false"
              contentContainerStyle={galleryscreen_styles.img_scrollview}>
              <View>
                <TouchableOpacity
                  activeOpacity="0.6"
                  onPress={() => {
                  }}
                  style={galleryscreen_styles.common_imagebutton} >
                  <ImageBlurLoading
                    style={galleryscreen_styles.select_imgbutton_img}
                    source={require('./assets/select_screen/suit_sample_1.jpg')} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity="0.6"
                  onPress={() => {
                  }}
                  style={galleryscreen_styles.common_imagebutton} >
                  <ImageBlurLoading
                    style={galleryscreen_styles.select_imgbutton_img}
                    source={require('./assets/select_screen/suit_sample_2.jpg')} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity="0.6"
                  onPress={() => {
                  }}
                  style={{...galleryscreen_styles.common_imagebutton, marginRight : 0}} >
                  <ImageBlurLoading
                    style={galleryscreen_styles.select_imgbutton_img}
                    source={require('./assets/select_screen/suit_sample_3.jpg')} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Animated.View>

        <Animated.View style={{...galleryscreen_styles.gallery_view, opacity : galleryViewOpacity}}>
          <Text style={galleryscreen_styles.sub_titletext}>2021년 11월</Text>
          <View style={{}} >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator="false"
              contentContainerStyle={galleryscreen_styles.img_scrollview}>
              <View>
                <TouchableOpacity
                  activeOpacity="0.6"
                  onPress={() => {
                  }}
                  style={galleryscreen_styles.common_imagebutton} >
                  <ImageBlurLoading
                    style={galleryscreen_styles.select_imgbutton_img}
                    source={require('./assets/select_screen/suit_sample_1.jpg')} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity="0.6"
                  onPress={() => {
                  }}
                  style={galleryscreen_styles.common_imagebutton} >
                  <ImageBlurLoading
                    style={galleryscreen_styles.select_imgbutton_img}
                    source={require('./assets/select_screen/suit_sample_2.jpg')} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity="0.6"
                  onPress={() => {
                  }}
                  style={{...galleryscreen_styles.common_imagebutton, marginRight : 0}} >
                  <ImageBlurLoading
                    style={galleryscreen_styles.select_imgbutton_img}
                    source={require('./assets/select_screen/suit_sample_3.jpg')} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const galleryscreen_styles = StyleSheet.create({
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
    marginBottom : SCREEN_WIDTH / 15,
  },
  gallery_view : {
    // marginBottom : SCREEN_WIDTH / 10,
  },
  sub_titletext : {
    fontSize : 32,
    // fontWeight : "900",
    fontFamily : "applesd-900",
    // color : '#777777',
    color : 'black',
    marginLeft : SCREEN_WIDTH / 18,
    marginBottom : SCREEN_WIDTH / 20,
  },
  img_scrollview : {
    paddingHorizontal : SCREEN_WIDTH / 20,
    marginTop : SCREEN_HEIGHT / 40,
    marginBottom : SCREEN_HEIGHT / 15,
    alignItems : "center",
  },
  common_imagebutton : {
    marginRight : SCREEN_WIDTH / 100,
    borderWidth : 3.5,
    borderRadius : 20,
    borderColor : "transparent",
    shadowColor: "#0e79e4",
    shadowOffset: {
      width : 0,
      height : 5,
    },
    shadowOpacity : 0.25,
    shadowRadius : 15,
  },
  select_imgbutton_img : {
    backgroundColor : "white",
    width : SCREEN_WIDTH / 2,
    height : SCREEN_HEIGHT / 2.75,
    borderRadius : 16,
  },

//   scrollview : {
//     paddingTop : 70,
//   },
//   select_scrollitem : {
//     marginBottom : 30,
//   },
//   select_titletext : {
//     fontSize : 28,
//     fontWeight : "900",
//     color : '#0f123f',
//     marginBottom : 10,
//   },
//   select_titleimg : {
//     // width: 64,
//     // height: 64,
//     width: 56,
//     height: 56,
//     marginBottom : 30,
//   },
//   common_button : {
//     backgroundColor : "#0e79e4",
//     height : 42,
//     width : 162,
//     borderRadius : 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width : 0,
//       height : 0,
//     },
//     shadowOpacity : 0.6,
//     shadowRadius : 14,
//     justifyContent : "center",
//     alignItems : "center",
//   },
//   common_buttontext : {
//     fontSize : 16,
//     fontWeight : "900",
//     color : "white",
//   },
//   img_scrollview : {
//     paddingLeft : 24,
//     marginTop : 40,
//     marginBottom : 30,
//   },
//   common_imagebutton : {
//     marginRight : 10,
//     shadowColor: "#0e79e4",
//     shadowOffset: {
//       width : 0,
//       height : 0,
//     },
//     shadowOpacity : 0.2,
//     shadowRadius : 20,
//   },
//   select_imgbutton_img : {
//     width : 200,
//     height : 300,
//     borderRadius : 16,

//   },
});
