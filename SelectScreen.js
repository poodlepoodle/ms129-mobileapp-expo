import React, { useState, useRef, useEffect, useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
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

export default function SelectScreen({ navigation }) {
  // const [scrollPosition, setScrollPosition] = useState(0);
  let totalState = 6;
  const [selectState, setSelectState] = useState(0);

  const genderViewOpacity = useRef(new Animated.Value(0)).current;
  const [genderText, setGenderText] = useState("");
  const genderTextOpacity = useRef(new Animated.Value(0)).current;
  const firstHairViewOpacity = useRef(new Animated.Value(0)).current;
  const [firstHairText, setFirstHairText] = useState("");
  const firstHairTextOpacity = useRef(new Animated.Value(0)).current;
  const [firstHairViewVisible, setFirstHairViewVisible] = useState(false);
  const frontHairViewOpacity = useRef(new Animated.Value(0)).current;
  const [frontHairText, setFrontHairText] = useState("");
  const frontHairTextOpacity = useRef(new Animated.Value(0)).current;
  const [frontHairViewVisible, setFrontHairViewVisible] = useState(false);
  const hairStyleViewOpacity = useRef(new Animated.Value(0)).current;
  const [hairStyleViewVisible, setHairStyleViewVisible] = useState(false);
  const suitStyleViewOpacity = useRef(new Animated.Value(0)).current;
  const [suitStyleViewVisible, setSuitStyleViewVisible] = useState(false);
  const goNextViewOpacity = useRef(new Animated.Value(0)).current;
  const [goNextViewVisible, setGoNextViewVisible] = useState(false);

  const [isMale, setIsMale] = useState(null);
  const isMaleBtnOpacity = useRef(new Animated.Value(1)).current;
  const isFemaleBtnOpacity = useRef(new Animated.Value(0.25)).current;

  const [changeHair, setChangeHair] = useState(null);
  const changeHairBtnOpacity = useRef(new Animated.Value(1)).current;
  const notChangeHairBtnOpacity = useRef(new Animated.Value(1)).current;

  const [downHair, setDownHair] = useState(null);
  const downHairBtnOpacity = useRef(new Animated.Value(1)).current;
  const upHairBtnOpacity = useRef(new Animated.Value(1)).current;

  const loadedHairs = 6;
  const [hairSelection, setHairSelection] = useState([null, null, null, null, null, null]);
  const hairOpacities = [];
  const hairSelectionOpacities = [];
  for (let i = 0; i < loadedHairs; i++) {
    hairOpacities.push(useRef(new Animated.Value(1)).current);
    hairSelectionOpacities.push(useRef(new Animated.Value(0)).current);
  }
  const hairSelectAnimation = (activate) => {
    for (let i = 0; i < loadedHairs; i++) {
      if (i == activate) {
        Fade(hairOpacities[i], 1, 250, true);
        Fade(hairSelectionOpacities[i], 1, 250, true);
      } else {
        Fade(hairOpacities[i], 0.3, 250, true);
        Fade(hairSelectionOpacities[i], 0, 250, true);
      }
    }
  };
  
  const loadedSuits = 6;
  const [suitSelection, setSuitSelection] = useState([null, null, null, null, null, null]);
  const suitOpacities = [];
  const suitSelectionOpacities = [];
  for (let i = 0; i < loadedSuits; i++) {
    suitOpacities.push(useRef(new Animated.Value(1)).current);
    suitSelectionOpacities.push(useRef(new Animated.Value(0)).current);
  }
  const suitSelectAnimation = (activate) => {
    for (let i = 0; i < loadedHairs; i++) {
      if (i == activate) {
        Fade(suitOpacities[i], 1, 250, true);
        Fade(suitSelectionOpacities[i], 1, 250, true);
      } else {
        Fade(suitOpacities[i], 0.3, 250, true);
        Fade(suitSelectionOpacities[i], 0, 250, true);
      }
    }
  };

  const scrollRef = useRef()

  const ViewFade = (fadeObj, fadeAmount) => {
    if (fadeObj === firstHairViewOpacity) {
      if (fadeAmount == "on") {
        setFirstHairViewVisible(true);
        Animated.timing(fadeObj, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else if (fadeAmount == "off") {
        setFirstHairViewVisible(false);
      }
    } else if (fadeObj === frontHairViewOpacity) {
      if (fadeAmount == "on") {
        setFrontHairViewVisible(true);
        Animated.timing(fadeObj, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else if (fadeAmount == "off") {
        setFrontHairViewVisible(false);
      }
    } else if (fadeObj === hairStyleViewOpacity) {
      if (fadeAmount == "on") {
        setHairStyleViewVisible(true);
        Animated.timing(fadeObj, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else if (fadeAmount == "off") {
        setHairStyleViewVisible(false);
      }
    } else if (fadeObj === suitStyleViewOpacity) {
      if (fadeAmount == "on") {
        setSuitStyleViewVisible(true);
        Animated.timing(fadeObj, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else if (fadeAmount == "off") {
        setSuitStyleViewVisible(false);
      }
    } else if (fadeObj === goNextViewOpacity) {
      if (fadeAmount == "on") {
        setGoNextViewVisible(true);
        Animated.timing(fadeObj, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else if (fadeAmount == "off") {
        setGoNextViewVisible(false);
      }
    }
  }

  const Fade = (fadeObj, fadeAmount, fadeDuration, isUseNativeDriver) => {
    Animated.timing(fadeObj, {
      toValue: fadeAmount,
      duration: fadeDuration,
      useNativeDriver: isUseNativeDriver,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      setSelectState(1);
    }, 250);
    
    Animated.timing(genderViewOpacity, {
      toValue : 1,
      duration : 1000,
      useNativeDriver : true,
    }).start();
  }, []);

  return (
    <View style={{backgroundColor:"#f3f7ff", flex : 1}}>
      <StatusBar style="dark" />
      <View style={{height : SCREEN_HEIGHT / 12}}></View>
      <View style={{marginHorizontal : SCREEN_WIDTH / 20, alignItems : "center", marginBottom : SCREEN_WIDTH / 20}}>
        <ProgressBar animated={true} useNativeDriver={true} progress={selectState / totalState} width={SCREEN_WIDTH - SCREEN_WIDTH / 10} />
        <Text style={{
          marginTop : SCREEN_WIDTH / 40,
          fontSize : 14,
          fontFamily : "applesd-700",
          color : "#0f123f",
          // }}>{selectState == 5 ? "거의 다 됐어요! 😀" : selectState + " / " + totalState}</Text>
          }}>{selectState == 5 ? "거의 다 됐어요! 😀" : ""}</Text>
      </View>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator="false"
        onContentSizeChange={() => scrollRef.current.scrollToEnd()}
        stickyHeaderIndices = {[0, 2, 4, 6, 8, 10]}
        // scrollEventThrottle = {16}
        // onScroll={(event) => {setScrollPosition(event.nativeEvent.contentOffset.y);console.log(scrollPosition);}}
        contentContainerStyle={selectscreen_styles.scrollview}>

        {/* 성별을 선택해 주세요! */}
        <Animated.View style={{backgroundColor : "#f3f7ff", paddingHorizontal : SCREEN_WIDTH / 20, paddingBottom : SCREEN_WIDTH / 20,
          opacity : genderViewOpacity}}>
          <View style={{flexDirection : "row", justifyContent : "space-between"}}>
            <Text style={selectscreen_styles.select_titletext}>
              성별을 선택해 주세요!
            </Text>
            <Animated.Text style={{...selectscreen_styles.select_titleanswertext, opacity : genderTextOpacity}}>
              {genderText}
            </Animated.Text>
          </View>
          <TouchableOpacity activeOpacity="0.4">
            <Image
              style={{...selectscreen_styles.select_titleimg}}
              source={require('./assets/select_screen/emoji_sparkleheart.png')} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{...selectscreen_styles.select_scrollitem,
          marginHorizontal : SCREEN_WIDTH / 20,
          marginTop : SCREEN_WIDTH / 20,
          opacity : genderViewOpacity}}>
          <View style={{flexDirection : "row", justifyContent : "space-between"}}>
            <Animated.View style={{opacity : isMaleBtnOpacity}}>
              <TouchableOpacity
                activeOpacity="0.6"
                style={{...selectscreen_styles.common_button, shadowColor : "#0e79e4"}}
                onPress = {() => {
                  if (selectState <= 1) {setSelectState(2)}

                  setGenderText("👦🏻");
                  Fade(genderTextOpacity, 1, 250, true);

                  setIsMale(true);
                  Fade(isMaleBtnOpacity, 1, 250, true);
                  Fade(isFemaleBtnOpacity, 0.25, 250, true);

                  ViewFade(firstHairViewOpacity, "on");
                  }}>
                  <Text style={selectscreen_styles.common_buttontext}>남자에요 👦🏻</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : isFemaleBtnOpacity}}>
              <TouchableOpacity
                activeOpacity="0.6"
                style={{...selectscreen_styles.common_button, shadowColor : "#0e79e4"}}
                onPress={() => {alert("현재는 남자만 가능해요ㅠ")}} >
                {/* // onPress = {() => {
                //   if (selectState <= 1) {setSelectState(2)}

                  // setGenterText("👩🏻");

                //   setIsMale(false);
                //   Fade(isFemaleBtnOpacity, 1, 250, true);
                //   Fade(isMaleBtnOpacity, 0.25, 250, true);

                //   ViewFade(firstHairViewOpacity, "on");
                // }}> */}
                <Text style={selectscreen_styles.common_buttontext}>여자에요 👩🏻</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* 헤어 스타일을 바꿔 볼까요? */}
        { firstHairViewVisible ?
        <Animated.View style={{backgroundColor : "#f3f7ff", paddingHorizontal : SCREEN_WIDTH / 20, paddingBottom : SCREEN_WIDTH / 20,
          opacity : firstHairViewOpacity}}>
          <View style={{flexDirection : "row", justifyContent : "space-between"}}>
            <Text style={selectscreen_styles.select_titletext}>
              헤어 스타일을 바꿔 볼까요?
            </Text>
            <Animated.Text style={{...selectscreen_styles.select_titleanswertext, opacity : firstHairTextOpacity}}>
              {firstHairText}
            </Animated.Text>
          </View>
          <TouchableOpacity activeOpacity="0.4">
            <Image
              style={{...selectscreen_styles.select_titleimg}}
              source={require('./assets/select_screen/emoji_haircut.png')} />
          </TouchableOpacity>
        </Animated.View>
        : <View></View> }
        { firstHairViewVisible ?
        <Animated.View style={{...selectscreen_styles.select_scrollitem,
          marginHorizontal : SCREEN_WIDTH / 20,
          marginTop : SCREEN_WIDTH / 20,
          opacity : firstHairViewOpacity}}>
          <View style={{flexDirection : "row", justifyContent : "space-between"}}>
            <Animated.View style={{opacity : changeHairBtnOpacity}}>
              <TouchableOpacity
                activeOpacity="0.6"
                style={{...selectscreen_styles.common_button, shadowColor : "#0e79e4"}}
                onPress = {() => {
                  setSelectState(3);

                  setFirstHairText("당근이죠!");
                  Fade(firstHairTextOpacity, 1, 250, true);

                  setChangeHair(true);
                  Fade(changeHairBtnOpacity, 1, 250, true);
                  Fade(notChangeHairBtnOpacity, 0.25, 250, true);

                  ViewFade(frontHairViewOpacity, "on");
                  ViewFade(suitStyleViewOpacity, "off");
                  }}>
                  <Text style={selectscreen_styles.common_buttontext}>네! 그런 것도 되나요?</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : notChangeHairBtnOpacity}}>
              <TouchableOpacity
                activeOpacity="0.6"
                style={{...selectscreen_styles.common_button, shadowColor : "#0e79e4"}}
                onPress = {() => {
                  setSelectState(5);

                  setFirstHairText("넵!");
                  Fade(firstHairTextOpacity, 1, 250, true);

                  setChangeHair(false);
                  Fade(notChangeHairBtnOpacity, 1, 250, true);
                  Fade(changeHairBtnOpacity, 0.25, 250, true);

                  ViewFade(suitStyleViewOpacity, "on");
                  ViewFade(frontHairViewOpacity, "off");
                  ViewFade(hairStyleViewOpacity, "off");
                  }}>
                <Text style={selectscreen_styles.common_buttontext}>아니요, 그대로 갈게요</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
        : <View></View> }

        {/* 현재 앞머리 상태는... */}
        { frontHairViewVisible ?
        <Animated.View style={{backgroundColor : "#f3f7ff", paddingHorizontal : SCREEN_WIDTH / 20, paddingBottom : SCREEN_WIDTH / 20,
          opacity : frontHairViewOpacity}}>
          <View style={{flexDirection : "row", justifyContent : "space-between"}}>
            <Text style={selectscreen_styles.select_titletext}>
              현재 앞머리 상태는...
            </Text>
            <Animated.Text style={{...selectscreen_styles.select_titleanswertext, opacity : frontHairTextOpacity}}>
              {frontHairText}
            </Animated.Text>
          </View>
          <TouchableOpacity activeOpacity="0.4">
            <Image
              style={{...selectscreen_styles.select_titleimg}}
              source={require('./assets/select_screen/emoji_thinking.png')} />
          </TouchableOpacity>
        </Animated.View>
        : <View></View> }
        { frontHairViewVisible ?
        <Animated.View style={{...selectscreen_styles.select_scrollitem,
          marginHorizontal : SCREEN_WIDTH / 20,
          marginTop : SCREEN_WIDTH / 20,
          opacity : frontHairViewOpacity}}>
          <View style={{flexDirection : "row", justifyContent : "space-between"}}>
            <Animated.View style={{opacity : downHairBtnOpacity}}>
              <TouchableOpacity
                activeOpacity="0.6"
                style={{...selectscreen_styles.common_button, shadowColor : "#0e79e4"}}
                onPress = {() => {
                  if (selectState <= 3) {setSelectState(4)}

                  setFrontHairText("앞머리가 있군요.");
                  Fade(frontHairTextOpacity, 1, 250, true);

                  setDownHair(true);
                  Fade(downHairBtnOpacity, 1, 250, true);
                  Fade(upHairBtnOpacity, 0.25, 250, true);

                  ViewFade(hairStyleViewOpacity, "on");
                  }}>
                  <Text style={selectscreen_styles.common_buttontext}>앞머리가 있어요</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : upHairBtnOpacity}}>
              <TouchableOpacity
                activeOpacity="0.6"
                style={{...selectscreen_styles.common_button, shadowColor : "#0e79e4"}}
                onPress = {() => {
                  if (selectState <= 3) {setSelectState(4)}

                  setFrontHairText("올린 머리군요.");
                  Fade(frontHairTextOpacity, 1, 250, true);

                  setDownHair(false);
                  Fade(upHairBtnOpacity, 1, 250, true);
                  Fade(downHairBtnOpacity, 0.25, 250, true);

                  ViewFade(hairStyleViewOpacity, "on");
                }}>
                <Text style={selectscreen_styles.common_buttontext}>올린 머리에요</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View> 
        : <View></View> }

        {/* 참고하고 싶은 헤어 스타일이 있나요? */}
        { hairStyleViewVisible ?
        <Animated.View style={{backgroundColor : "#f3f7ff", paddingLeft : SCREEN_WIDTH / 20, paddingBottom : SCREEN_WIDTH / 20,
          opacity : hairStyleViewOpacity}}>
          <Text style={selectscreen_styles.select_titletext}>참고하고 싶은 헤어 스타일이 있나요?</Text>
          <TouchableOpacity activeOpacity="0.4">
            <Image
              style={{...selectscreen_styles.select_titleimg, marginBottom : 0}}
              source={require('./assets/select_screen/emoji_hair.png')} />
          </TouchableOpacity>
        </Animated.View>
        : <View></View> }
        { hairStyleViewVisible ?
        <Animated.View style={{...selectscreen_styles.select_scrollitem, marginBottom : 0,
          opacity : hairStyleViewOpacity}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator="false"
            contentContainerStyle={selectscreen_styles.img_scrollview}>
            <Animated.View style={{opacity : hairOpacities[0]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 4) {setSelectState(5)}
                  ViewFade(suitStyleViewOpacity, "on");

                  let updateHairSelection = [...hairSelection];
                  for (let i = 0; i < 6; i++) {
                    updateHairSelection[i] = false;
                  }
                  updateHairSelection[0] = true;
                  setHairSelection(updateHairSelection);

                  hairSelectAnimation(0);
                }}
                style={{...selectscreen_styles.common_imagebutton_null}} >
                <ImageBlurLoading
                  // blurRadius={30}
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/recommend.jpg')} />
                <Text style={{
                  position : "absolute",
                  marginTop : SCREEN_HEIGHT / 2.75 * 0.8,
                  marginLeft : SCREEN_WIDTH / 20,
                  fontFamily : "applesd-900",
                  fontSize : 18,
                  color : "white"}}>음..{"\n"}알아서 추천해 주세요! 😉
                </Text>
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : hairSelectionOpacities[0]}}></Animated.View>
              </TouchableOpacity> 
            </Animated.View>
            <Animated.View style={{opacity : hairOpacities[1]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 4) {setSelectState(5)}
                  ViewFade(suitStyleViewOpacity, "on");

                  let updateHairSelection = [...hairSelection];
                  for (let i = 0; i < 6; i++) {
                    updateHairSelection[i] = false;
                  }
                  updateHairSelection[1] = true;
                  setHairSelection(updateHairSelection);

                  hairSelectAnimation(1);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                {/* <ActivityIndicator animating={true} style={{}}/> */}
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/hair_sample_1.jpg')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : hairSelectionOpacities[1]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : hairOpacities[2]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 4) {setSelectState(5)}
                  ViewFade(suitStyleViewOpacity, "on");

                  let updateHairSelection = [...hairSelection];
                  for (let i = 0; i < 6; i++) {
                    updateHairSelection[i] = false;
                  }
                  updateHairSelection[2] = true;
                  setHairSelection(updateHairSelection);

                  hairSelectAnimation(2);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/hair_sample_2.jpg')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : hairSelectionOpacities[2]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : hairOpacities[3]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 4) {setSelectState(5)}
                  ViewFade(suitStyleViewOpacity, "on");

                  let updateHairSelection = [...hairSelection];
                  for (let i = 0; i < 6; i++) {
                    updateHairSelection[i] = false;
                  }
                  updateHairSelection[3] = true;
                  setHairSelection(updateHairSelection);

                  hairSelectAnimation(3);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/hair_sample_3.jpg')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : hairSelectionOpacities[3]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : hairOpacities[4]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 4) {setSelectState(5)}
                  ViewFade(suitStyleViewOpacity, "on");

                  let updateHairSelection = [...hairSelection];
                  for (let i = 0; i < 6; i++) {
                    updateHairSelection[i] = false;
                  }
                  updateHairSelection[4] = true;
                  setHairSelection(updateHairSelection);

                  hairSelectAnimation(4);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/hair_sample_4.jpg')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : hairSelectionOpacities[4]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : hairOpacities[5]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 4) {setSelectState(5)}
                  ViewFade(suitStyleViewOpacity, "on");

                  let updateHairSelection = [...hairSelection];
                  for (let i = 0; i < 6; i++) {
                    updateHairSelection[i] = false;
                  }
                  updateHairSelection[5] = true;
                  setHairSelection(updateHairSelection);

                  hairSelectAnimation(5);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/hair_sample_5.jpg')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : hairSelectionOpacities[5]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity
              activeOpacity="0.6"
              style={{
                backgroundColor : "white",
                width : SCREEN_WIDTH / 10,
                height : SCREEN_HEIGHT / 2.75,
                marginLeft : SCREEN_WIDTH / 20,
                borderTopLeftRadius : 16,
                borderBottomLeftRadius : 16,
                alignItems : "center",
                justifyContent : "center"}}
              onPress = {() => alert('헤어 스타일 더 보기')}>
              <Text style={{fontSize : 30, fontWeight : "800", color : "#0e79e4"}}>+</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
        : <View></View> }

        {/* 정장 스티일을 선택해 주세요 */}
        { suitStyleViewVisible ?
        <Animated.View style={{backgroundColor : "#f3f7ff", paddingLeft : SCREEN_WIDTH / 20, paddingBottom : SCREEN_WIDTH / 20,
          opacity : suitStyleViewOpacity}}>
          <Text style={selectscreen_styles.select_titletext}>맘에 드는 정장 스타일을 선택해 주세요!</Text>
          <TouchableOpacity activeOpacity="0.4">
            <Image
              style={{...selectscreen_styles.select_titleimg, marginBottom : 0}}
              source={require('./assets/select_screen/emoji_suit.png')} />
          </TouchableOpacity>
        </Animated.View>
        : <View></View> }
        { suitStyleViewVisible ?
        <Animated.View style={{...selectscreen_styles.select_scrollitem, marginBottom : 0,
          opacity : suitStyleViewOpacity}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator="false"
            contentContainerStyle={selectscreen_styles.img_scrollview}>
            <Animated.View style={{opacity : suitOpacities[0]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 5) {setSelectState(6)}
                  ViewFade(goNextViewOpacity, "on");

                  let updateSuitSelection = [...suitSelection];
                  for (let i = 0; i < 6; i++) {
                    updateSuitSelection[i] = false;
                  }
                  updateSuitSelection[0] = true;
                  setSuitSelection(updateSuitSelection);

                  suitSelectAnimation(0);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/suit_sample_1.jpg')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : suitSelectionOpacities[0]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : suitOpacities[1]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 5) {setSelectState(6)}
                  ViewFade(goNextViewOpacity, "on");

                  let updateSuitSelection = [...suitSelection];
                  for (let i = 0; i < 6; i++) {
                    updateSuitSelection[i] = false;
                  }
                  updateSuitSelection[1] = true;
                  setSuitSelection(updateSuitSelection);
                  
                  suitSelectAnimation(1);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/suit_sample_2.jpg')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : suitSelectionOpacities[1]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : suitOpacities[2]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 5) {setSelectState(6)}
                  ViewFade(goNextViewOpacity, "on");

                  let updateSuitSelection = [...suitSelection];
                  for (let i = 0; i < 6; i++) {
                    updateSuitSelection[i] = false;
                  }
                  updateSuitSelection[2] = true;
                  setSuitSelection(updateSuitSelection);
                  
                  suitSelectAnimation(2);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/suit_sample_3.jpg')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : suitSelectionOpacities[2]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : suitOpacities[3]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 5) {setSelectState(6)}
                  ViewFade(goNextViewOpacity, "on");

                  let updateSuitSelection = [...suitSelection];
                  for (let i = 0; i < 6; i++) {
                    updateSuitSelection[i] = false;
                  }
                  updateSuitSelection[3] = true;
                  setSuitSelection(updateSuitSelection);
                  
                  suitSelectAnimation(3);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/suit_sample_4.jpg')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : suitSelectionOpacities[3]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : suitOpacities[4]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 5) {setSelectState(6)}
                  ViewFade(goNextViewOpacity, "on");

                  let updateSuitSelection = [...suitSelection];
                  for (let i = 0; i < 6; i++) {
                    updateSuitSelection[i] = false;
                  }
                  updateSuitSelection[4] = true;
                  setSuitSelection(updateSuitSelection);
                  
                  suitSelectAnimation(4);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/suit_sample_5.jpg')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : suitSelectionOpacities[4]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{opacity : suitOpacities[5]}}>
              <TouchableOpacity
                activeOpacity="0.6"
                onPress={() => {
                  if (selectState <= 5) {setSelectState(6)}
                  ViewFade(goNextViewOpacity, "on");

                  let updateSuitSelection = [...suitSelection];
                  for (let i = 0; i < 6; i++) {
                    updateSuitSelection[i] = false;
                  }
                  updateSuitSelection[5] = true;
                  setSuitSelection(updateSuitSelection);

                  suitSelectAnimation(5);
                }}
                style={selectscreen_styles.common_imagebutton_null} >
                <ImageBlurLoading
                  style={selectscreen_styles.select_imgbutton_img}
                  source={require('./assets/select_screen/suit_sample_6.png')} />
                <Animated.View style={{...selectscreen_styles.common_imagebutton_selected_frame, width : SCREEN_WIDTH / 2, height : SCREEN_HEIGHT / 2.75,
                  position : "absolute", opacity : suitSelectionOpacities[5]}}></Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity
              activeOpacity="0.6"
              style={{
                backgroundColor : "white",
                width : SCREEN_WIDTH / 10,
                height : SCREEN_HEIGHT / 2.75,
                marginLeft : SCREEN_WIDTH / 20,
                borderTopLeftRadius : 16,
                borderBottomLeftRadius : 16,
                alignItems : "center",
                justifyContent : "center"}}
              onPress = {() => alert('수트 스타일 더 보기')}>
              <Text style={{fontSize : 30, fontWeight : "800", color : "#0e79e4"}}>+</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
        : <View></View> }

        {/* 이대로 진행할까요? */}
        { (goNextViewVisible && selectState == totalState) ?
        <Animated.View style={{backgroundColor : "#f3f7ff", paddingLeft : SCREEN_WIDTH / 20,
          opacity : goNextViewOpacity}}>
          <Text style={{...selectscreen_styles.select_titletext, marginBottom : 0}}>와우.. 너무 멋진데요! 😆{"\n"}이대로 진행할까요?</Text>
        </Animated.View>
        : <View></View> }
        { (goNextViewVisible && selectState == totalState) ?
        <Animated.View style={{...selectscreen_styles.select_scrollitem,
          marginTop : SCREEN_WIDTH / 20,
          marginBottom : SCREEN_WIDTH / 10,
          marginHorizontal : SCREEN_WIDTH / 20,
          opacity : goNextViewOpacity}}>
          <TouchableOpacity
            activeOpacity="0.6"
            style={{
              backgroundColor : "#0e79e4",
              height : SCREEN_HEIGHT / 18,
              borderRadius : 10,
              justifyContent : "center",
              alignItems : "center",
              shadowColor: "#0e79e4",
              shadowOffset: {
                width : 0,
                height : 0,
              },
              shadowOpacity : 0.6,
              shadowRadius : 10,}}
            onPress={() => navigation.push('Result')}>
            <Text style={selectscreen_styles.common_buttontext}>네~~~~~~</Text>
          </TouchableOpacity>
        </Animated.View>
        : <View></View> }
      </ScrollView>
    </View>
  );
}

const selectscreen_styles = StyleSheet.create({
  scrollview : {
  },
  select_scrollitem : {
    marginBottom : SCREEN_HEIGHT / 15,
  },
  select_titletext : {
    fontSize : 26,
    // fontWeight : "900",
    fontFamily : "applesd-900",
    color : '#0f123f',
    marginBottom : SCREEN_HEIGHT / 80,
  },
  select_titleanswertext : {
    fontSize : 26,
    // fontWeight : "900",
    fontFamily : "applesd-900",
    color : '#999999',
    marginBottom : SCREEN_HEIGHT / 80,
  },
  select_titleimg : {
    width: SCREEN_HEIGHT / 15,
    height: SCREEN_HEIGHT / 15,
  },
  common_button : {
    backgroundColor : "#0e79e4",
    height : SCREEN_HEIGHT / 20,
    width : (SCREEN_WIDTH - (SCREEN_WIDTH / 20) - (SCREEN_HEIGHT / 20)) / 2,
    borderRadius : 10,
    shadowColor: "#000",
    shadowOffset: {
      width : 0,
      height : 0,
    },
    shadowOpacity : 0.5,
    shadowRadius : 10,
    justifyContent : "center",
    alignItems : "center",
  },
  common_buttontext : {
    fontSize : 15,
    // fontWeight : "900",
    fontFamily : "applesd-800",
    color : "white",
  },
  img_scrollview : {
    paddingLeft : SCREEN_HEIGHT / 40,
    marginTop : SCREEN_HEIGHT / 40,
    marginBottom : SCREEN_HEIGHT / 15,
    alignItems : "center",
  },
  common_imagebutton_null : {
    marginRight : SCREEN_HEIGHT / 200,
    borderWidth : 3.5,
    borderRadius : 20,
    borderColor : "transparent",
    shadowColor: "#0e79e4",
    shadowOffset: {
      width : 0,
      height : 5,
    },
    shadowOpacity : 0.3,
    shadowRadius : 15,
  },
  common_imagebutton_selected_frame : {
    marginRight : SCREEN_HEIGHT / 200,
    borderWidth : 4,
    borderRadius : 16,
    borderColor : "#0e79e4DD",
  },
  select_imgbutton_img : {
    backgroundColor : "white",
    width : SCREEN_WIDTH / 2,
    height : SCREEN_HEIGHT / 2.75,
    borderRadius : 16,
  },
});
