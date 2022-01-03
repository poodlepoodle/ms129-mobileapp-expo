import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import { BlurView } from 'expo-blur';
import Modal from "react-native-modal";

import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

const useFonts = async () => {
  await Font.loadAsync({
     "applesd-100": require("./assets/fonts/AppleSDGothicNeoT.ttf"),
     "applesd-200": require("./assets/fonts/AppleSDGothicNeoUL.ttf"),
     "applesd-300": require("./assets/fonts/AppleSDGothicNeoL.ttf"),
     "applesd-400": require("./assets/fonts/AppleSDGothicNeoR.ttf"),
     "applesd-500": require("./assets/fonts/AppleSDGothicNeoM.ttf"),
     "applesd-600": require("./assets/fonts/AppleSDGothicNeoSB.ttf"),
     "applesd-700": require("./assets/fonts/AppleSDGothicNeoB.ttf"),
     "applesd-800": require("./assets/fonts/AppleSDGothicNeoEB.ttf"),
     "applesd-900": require("./assets/fonts/AppleSDGothicNeoH.ttf")
   });
};

export default function MainScreen({ navigation }) {
  const [isFontReady, setIsFontReady] = useState(false);
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const makeViewOpacity = useRef(new Animated.Value(0)).current;
  const lookViewOpacity = useRef(new Animated.Value(0)).current;
  const tutorialViewOpacity = useRef(new Animated.Value(0)).current;
  const devViewOpacity = useRef(new Animated.Value(0)).current;

  const [tutorialModalVisible, setTutorialModalVisible] = useState(false);
  const [devModalVisible, setDevModalVisible] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  const Fade = (fadeObj, fadeAmount, fadeDuration, isUseNativeDriver) => {
    Animated.timing(fadeObj, {
      toValue: fadeAmount,
      duration: fadeDuration,
      useNativeDriver: isUseNativeDriver,
    }).start();
  };

  const mainViewFadeAnimation = () => {
    Fade(titleOpacity, 1, 1000, true);
    setTimeout(() => {
      Fade(makeViewOpacity, 1, 500, true);
    }, 250);
    setTimeout(() => {
      Fade(lookViewOpacity, 1, 500, true);
    }, 500);
    setTimeout(() => {
      Fade(tutorialViewOpacity, 1, 500, true);
    }, 750);
    setTimeout(() => {
      Fade(devViewOpacity, 1, 500, true);
    }, 500);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      navigation.push('InputConfirm', {
        photoUri: result.uri,
      });
    }
  };
  
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('앨범 접근 권한을 허용으로 설정해 주세요 ㅠㅠ');
      }
    })();
  }, []);

  if (!isFontReady) {
    return (
      <AppLoading
      startAsync={LoadFonts}
      onFinish={() => {setIsFontReady(true); mainViewFadeAnimation()}}
      onError={() => {}} />
    );
  }

  return (
    <View style={{backgroundColor:"#f3f7ff", flex:1}}>
      <StatusBar style="auto" />

      {/* Tutorial Modal */}
      <Modal
        isVisible={tutorialModalVisible}
        animationInTiming={500}
        animationOutTiming={300}
        backdropOpacity={0.5}
        // useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        coverScreen={true}

        onBackdropPress={() => setTutorialModalVisible(false)}
        onSwipeComplete={() => setTutorialModalVisible(false)}
        swipeDirection="down"
        style={{ justifyContent: 'flex-end', margin: 0}} >
        <BlurView intensity={80} tint="light" style={{height : "80%"}} >
          <View style={{flex : 1, borderRadius : 20, justifyContent : "center", alignItems : "center"}}>
            <Text>튜토리얼</Text>
          </View>
        </BlurView>
      </Modal>

      {/* Dev Modal */}
      <Modal
        isVisible={devModalVisible}
        animationInTiming={500}
        animationOutTiming={300}
        backdropOpacity={0.5}
        // useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        coverScreen={true}

        onBackdropPress={() => setDevModalVisible(false)}
        onSwipeComplete={() => setDevModalVisible(false)}
        swipeDirection="down"
        style={{ justifyContent: 'flex-end', margin: 0}} >
        <BlurView intensity={80} tint="light" style={{height : "80%"}} >
          <View style={{flex : 1, borderRadius : 20, justifyContent : "center", alignItems : "center"}}>
            <Text>개발자</Text>
          </View>
        </BlurView>
      </Modal>

      <View style={{}}>
        <ScrollView
          showsVerticalScrollIndicator="false"
          stickyHeaderIndices = {[0]}
          contentContainerStyle={mainscreen_styles.scrollview}>
          <Animated.View style={{backgroundColor:"#f3f7ff", paddingTop : SCREEN_HEIGHT / 12, opacity : titleOpacity}}>
            <Text style={mainscreen_styles.main_titletext}>A I take a picture of you?</Text>
            <TouchableOpacity activeOpacity="0.4">
              <Image
                style={mainscreen_styles.main_titleimg}
                source={require('./assets/main_screen/emoji_camera.png')} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{...mainscreen_styles.main_make, opacity : makeViewOpacity}}>
            <Text style={mainscreen_styles.main_subtitletext}>새로운 증명사진을 만들고 싶어요.</Text>
            <TouchableOpacity
              activeOpacity="0.6"
              style={{ ...mainscreen_styles.main_roundbox_shadows, shadowColor : "#3075e0",}}
              onPress={() => navigation.push('CameraInput')}>
              <LinearGradient
                start={{ x: 0.3, y: 0.2 }}
                end={{ x: 0.7, y: 0.8 }}
                colors={['#2f9ffb', '#304ac5']}
                style={mainscreen_styles.main_roundbox}>
                <View style={mainscreen_styles.main_roundbox_textpart}>
                  <Text style={mainscreen_styles.main_roundbox_textpart_titletext}>새로 촬영하기{"\n"}-</Text>
                  <Text style={mainscreen_styles.main_roundbox_textpart_subtext}>스마트폰 카메라를 통해{"\n"}증명사진으로 변환할 사진을 촬영할래요.</Text>
                </View>
                <View style={mainscreen_styles.main_roundbox_imgpart}>
                  <Image
                    style={mainscreen_styles.main_roundbox_imgpart_img}
                    source={require('./assets/main_screen/emoji_cameraflash.png')}
                    />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <View style={{height:SCREEN_WIDTH / 20}}></View>
            <TouchableOpacity
              activeOpacity="0.6"
              style={{ ...mainscreen_styles.main_roundbox_shadows, shadowColor : "#ae4bc5",}}
              onPress={pickImage}>
              <LinearGradient
                start={{ x: 0.3, y: 0.2 }}
                end={{ x: 0.7, y: 0.8 }}
                colors={['#e555c1', '#7341ca']}
                style={mainscreen_styles.main_roundbox}>
                <View style={mainscreen_styles.main_roundbox_textpart}>
                  <Text style={mainscreen_styles.main_roundbox_textpart_titletext}>앨범에서 불러오기{"\n"}-</Text>
                  <Text style={mainscreen_styles.main_roundbox_textpart_subtext}>이미 앨범에 저장되어 있는 사진을{"\n"}증명사진으로 변환하고 싶어요.</Text>
                </View>
                <View style={mainscreen_styles.main_roundbox_imgpart}>
                  <Image
                    style={mainscreen_styles.main_roundbox_imgpart_img}
                    source={require('./assets/main_screen/emoji_album.png')}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{...mainscreen_styles.main_look, opacity : lookViewOpacity}}>
            <Text style={mainscreen_styles.main_subtitletext}>만들어놓은 증명사진을 둘러볼래요.</Text>
            <TouchableOpacity
              activeOpacity="0.6"
              style={{ ...mainscreen_styles.main_roundbox_shadows, shadowColor : "#f59955",}}
              onPress={() => navigation.push('Gallery')}>
              <LinearGradient
                start={{ x: 0.3, y: 0.2 }}
                end={{ x: 0.7, y: 0.8 }}
                colors={['#fac734', '#ef6976']}
                style={mainscreen_styles.main_roundbox}>
                <View style={mainscreen_styles.main_roundbox_textpart}>
                  <Text style={mainscreen_styles.main_roundbox_textpart_titletext}>증명사진 둘러보기{"\n"}-</Text>
                  <Text style={mainscreen_styles.main_roundbox_textpart_subtext}>예전에 만들어 놓은{"\n"}증명사진들을 다시 보고 싶어요.</Text>
                </View>
                <View style={mainscreen_styles.main_roundbox_imgpart}>
                  <Image
                    style={mainscreen_styles.main_roundbox_imgpart_img}
                    source={require('./assets/main_screen/emoji_file.png')}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{...mainscreen_styles.main_tutorial, opacity : tutorialViewOpacity}}>
            <Text style={mainscreen_styles.main_subtitletext}>어떻게 사용하는지 모르겠어요.</Text>
            <TouchableOpacity
              activeOpacity="0.6"
              style={{ ...mainscreen_styles.main_roundbox_shadows, shadowColor : "#365A4C",}}
              onPress={() => setTutorialModalVisible(true)}>
              <LinearGradient
                start={{ x: 0.3, y: 0.2 }}
                end={{ x: 0.7, y: 0.8 }}
                colors={['#3BA14980', '#365A4CAA']}
                style={mainscreen_styles.main_devroundbox}>
                <View style={mainscreen_styles.main_roundbox_textpart}>
                  <Text style={mainscreen_styles.main_roundbox_textpart_titletext}>튜토리얼 페이지 보기</Text>
                  <Text style={mainscreen_styles.main_roundbox_textpart_subtext}> </Text>
                </View>
                <View style={mainscreen_styles.main_roundbox_imgpart}>
                  <Image
                    style={mainscreen_styles.main_roundbox_imgpart_img}
                    source={require('./assets/main_screen/emoji_question.png')}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{...mainscreen_styles.main_dev, opacity : devViewOpacity}}>
            <Text style={mainscreen_styles.main_subtitletext}>개발자들에게 응원을 전하고 싶어요.</Text>
            <TouchableOpacity
              activeOpacity="0.6"
              style={{ ...mainscreen_styles.main_roundbox_shadows, shadowColor : "#f491ac",}}
              onPress={() => setDevModalVisible(true)} >
              {/* // onPress = {() => Alert.alert(
              //   '마음만 받겠습니다ㅎㅎ',
              //   '사랑해요!',
              //   [
              //     {text: '넵ㅠㅠ'},
              //   ],
              //   {cancelable: false},
              // )}> */}
              <LinearGradient
                start={{ x: 0.3, y: 0.2 }}
                end={{ x: 0.7, y: 0.8 }}
                colors={['#ea9ea4', '#f27697']}
                style={mainscreen_styles.main_devroundbox}>
                <View style={mainscreen_styles.main_roundbox_textpart}>
                  <Text style={mainscreen_styles.main_roundbox_textpart_titletext}>50,000원 후원하기</Text>
                  <Text style={mainscreen_styles.main_roundbox_textpart_subtext}> </Text>
                </View>
                <View style={mainscreen_styles.main_roundbox_imgpart}>
                  <Image
                    style={mainscreen_styles.main_roundbox_imgpart_img}
                    source={require('./assets/main_screen/emoji_heart.png')}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
}

const mainscreen_styles = StyleSheet.create({
  scrollview : {
  },
  main_title : {
  },
  main_titletext : {
    marginLeft : SCREEN_WIDTH / 20,
    fontSize : 26,
    fontWeight : "900",
    fontFamily : "applesd-900",
    color : '#0f123f',
    // marginBottom : SCREEN_HEIGHT / 100,
  },
  main_titleimg : {
    width: SCREEN_WIDTH / 7,
    height: SCREEN_WIDTH / 7,
    marginLeft : SCREEN_WIDTH / 20,
    marginBottom : SCREEN_WIDTH / 20,
  },
  main_make : {
    // backgroundColor : "yellow",
    marginLeft : SCREEN_WIDTH / 20,
    marginRight : SCREEN_WIDTH / 20,
    marginTop : SCREEN_WIDTH / 20,
    marginBottom : SCREEN_WIDTH / 10,
  },
  main_roundbox : {
    flex : 1,
    // backgroundColor : "pink",
    height : SCREEN_HEIGHT / 5,
    borderRadius : 16,
    flexDirection : "row",
    justifyContent : "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width : 0,
      height : 10,
    },
    shadowOpacity : 0.5,
    shadowRadius : 14,
  },
  main_roundbox_textpart : {
    flex : 5,
    marginLeft : SCREEN_HEIGHT / 30,
    marginTop : SCREEN_HEIGHT / 30,
    marginBottom : SCREEN_HEIGHT / 30,
    justifyContent : "space-between",
  },
  main_roundbox_textpart_titletext : {
    fontSize : 24,
    // fontWeight : "900",
    fontFamily : "applesd-800",
    color : "white",
  },
  main_roundbox_textpart_subtext : {
    fontSize : 15,
    // fontWeight : "400",
    fontFamily : "applesd-600",
    color : "white",
  },
  main_roundbox_imgpart : {
    flex : 1,
    marginRight : SCREEN_HEIGHT / 30,
    justifyContent : "center",
    alignItems : "center",
  },
  main_roundbox_imgpart_img : {
    width: SCREEN_WIDTH / 8.5,
    height: SCREEN_WIDTH / 8.5,
  },
  main_look : {
    // backgroundColor : "orange",
    marginLeft : SCREEN_WIDTH / 20,
    marginRight : SCREEN_WIDTH / 20,
    marginBottom : SCREEN_WIDTH / 10,
  },
  main_subtitletext : {
    fontSize : 23,
    // fontWeight : "900",
    fontFamily : "applesd-800",
    color : '#777777',
    marginLeft : SCREEN_WIDTH / 80,
    marginBottom : SCREEN_WIDTH / 20,
  },
  main_tutorial : {
    marginLeft : SCREEN_WIDTH / 20,
    marginRight : SCREEN_WIDTH / 20,
    marginBottom : SCREEN_WIDTH / 10,
  },
  main_dev : {
    marginLeft : SCREEN_WIDTH / 20,
    marginRight : SCREEN_WIDTH / 20,
    marginBottom : SCREEN_WIDTH / 10,
  },
  main_devroundbox : {
    flex : 1,
    // backgroundColor : "pink",
    height : SCREEN_HEIGHT / 8,
    borderRadius : 16,
    flexDirection : "row",
    justifyContent : "space-between",
  },
  main_roundbox_shadows : {
      shadowOffset : {
      width: 0,
      height: -0,
    },
    shadowOpacity : 0.7,
    shadowRadius : 14,
  },
});
