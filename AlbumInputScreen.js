import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
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
  Platform,
  Button
} from 'react-native';

export default function AlbumInputScreen({ navigation }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('앨범 접근 권한을 허용으로 설정해 주세요 ㅠㅠ');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
    // console.log(image);

    if (!result.cancelled) {
      setImage(result.uri);
      navigation.push('InputConfirm', {
        photoUri: image,
        photoFrom : "album"
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

const albumscreen_styles = StyleSheet.create({
});
