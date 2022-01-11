# 📷 **ms129 : 머선129**
스마트폰 카메라로 촬영한 사진을 기반으로 증명사진을 생성하는 애플리케이션

[![유투브 링크](https://img.youtube.com/vi/_3O5lLitvRc/0.jpg)](https://youtu.be/_3O5lLitvRc)

<img width="100%" src="./assets/gifs/prototype.gif"/>

## 😉 연구 배경

* **증명사진** 또는 **취업용 프로필 사진**은 각종 지원서 및 이력서 등에 사용되며 일반적으로 사진관에서 촬영 
* 신촌 인근 15개 사진관의 취업용 프로필 시진 촬영 가격을 조사한 결과 평균 37,600원으로 **부담될 수 있는 비용임을 인식**
* 사진관을 직접 방문해야 하는 **시간적 비용 존재**
* 사진관에서는 **하나의 최종 결과물**만을 얻을 수 있으므로 아쉬움 존재

➡ 이에 스마트폰 카메라를 통해 촬영한 사진으로 프로필 사진을 제작 및 보정할 수 있게 하는 **딥러닝 모델**과 이를 구현한 **스마트폰 애플리케이션** 제작


## ☁️ 개발 환경

* [Node.js](https://nodejs.org/ko/download/) _v16.13.1_
* npm _8.1.2_
    ```sh
    # install latest version of npm
    npm install npm@latest -g
    nvm use --lts
    ```
* [Expo-cli](https://github.com/expo/expo-cli/) _4.13.0_
    ```sh
    # install expo-cli
    npm install -g expo-cli
    ```

## 📦 프로젝트 디렉토리 구조
    ms129
    ├── README.md
    ├── App.js
    # Configuration files
    ├── app.json
    ├── babel.config.js
    ├── package-lock.json
    ├── package.json
    └── yarn.lock
    # Screen .js files for react-navigation
    ├── AlbumInputScreen.js
    ├── CameraInputScreen.js
    ├── GalleryScreen.js
    ├── InputConfirmScreen.js
    ├── MainScreen.js
    ├── ResultScreen.js
    ├── SelectScreen.js
    ├── TestScreen.js
    ├── TutorialScreen.js
    # Assets
    └── assets
        ├─ ...

## 💻 프로젝트 실행

1. Clone this repo
    ```sh
    git clone https://github.com/poodlepoodle/ms129-mobileapp-expo.git
    ```
2. Install NPM packages
    ```sh
    # 1. dependencies for whole screen
    # for screen navigation
    npm install @react-navigation/native
    expo install react-native-screens react-native-safe-area-context
    npm install @react-navigation/native-stack
    # for custom fonts
    expo install expo-font
    # for configure statusbar
    expo install expo-status-bar

    # 2. dependencies for main screen
    # for BlurView
    expo install expo-blur
    # for using AppLoading
    expo install expo-app-loading
    # for using linear gradients
    expo install expo-linear-gradient
    # for image picker
    expo install expo-image-picker

    # 3. dependencies for camera-input screen
    # for using camera
    expo install expo-camera

    # 4. dependencies for select screen
    # for using progress bar
    npm install react-native-progress --save
    # for using ImageBlurLoading
    npm install react-native-image-blur-loading --save

    # 5. dependencies for tutorial, information screens (modal)
    # for using custom modal
    npm install react-native-modal --save
    ```
3. Run expo console
    ```sh
    cd ms129-mobileapp-expo
    npm start
    ```

## ✨ 프로젝트 참여
* 정현오 (팀장/딥러닝 모델 수정)
* [최어진](https://devpoodle.tistory.com) (팀원/모바일 인터페이스 구현)
* 최훈영 (팀원/딥러닝 모델 수정)

## 📋 업데이트 로그 

- [x] 메인 화면 인터페이스 구현 - 2021.12
- [x] 카메라 촬영/앨범을 통한 이미지 입력 구현 - 2021.12
- [x] 프로필 옵션 선택 화면 인터페이스 구현 - 2021.12
- [x] 커스텀 폰트 적용 - 2021.12
- [ ] 선택 화면 헤어스타일/정장 이미지 불러오기
- [ ] 프로필 사진 변환 딥러닝 모델 추가 성능 개선
- [ ] 딥러닝 모델 API 서버 코드 리팩토링 및 애플리케이션 연결
- [ ] 튜토리얼 화면 구성
- [ ] 개발자 정보 화면 구성

<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments -->

<!-- LICENSE -->
<!-- ## License -->
<!-- Distributed under the MIT License. See `LICENSE.txt` for more information. -->