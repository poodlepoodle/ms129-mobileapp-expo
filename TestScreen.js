import React, { useRef, useEffect, useState } from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  Alert,
  Modal,
  Pressable
} from 'react-native';

const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get('window');

// ImageUpload() {
//   console.log('UPLOADImage====')
//   ImagePicker.showImagePicker(ImageOptions, (response) => {
//       console.log('Image Response = ', response);
//       if (response.didCancel) {
//           console.log('User cancelled image picker');
//       } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//           console.log('User tapped custom button: ', response.customButton);
//       } else {
//           const source = {filename: response.fileName, type: response.type, uri: response.fileSize};
//           const self = this;
//           const userId = '';
//           console.log('source', source)

//           let formData = new FormData();
//           formData.append("filename", source);

//           // console.log('UPLOADImage====111334')
//           this.setState({spinnerBool: true}, () => {
//               axios({
//                   method: 'POST',
//                   url: 'http://localhoast:8090/api/UploadProfilePic',
//                   data: formData,
//                   headers: {
//                       'Content-Type' :'multipart/form-data'
//                   },

//               }).then((response) => {
//                   console.log('response', response)
//                   if (response.status === 200) {
//                       console.log('status 200', response)
//                       alert("submitted", '')
//                   }
//               })
//                   .catch((error) => {
//                       console.log('error res', response)
//                       self.setState({spinnerBool: false, MyProfileResp: ''}, () => {
//                           alert("Error,Message Not submitted")
//                           console.log('Error', error.response);
//                       });
//                   })
//           });
//       }
//   });
// }

export default function TestScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      <Text>main_view</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});