[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fpoodlepoodle%2Fms129-mobileapp-expo&count_bg=%23232323&title_bg=%2332578A&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# π· **ms129 : λ¨Έμ 129**
_β¨ μ€λ§νΈν° μΉ΄λ©λΌλ‘ μ΄¬μν μ¬μ§μ κΈ°λ°μΌλ‘ μ¦λͺμ¬μ§μ μμ±νλ μ νλ¦¬μΌμ΄μ β¨_

[![μ ν¬λΈ λ§ν¬](https://img.youtube.com/vi/_3O5lLitvRc/0.jpg)](https://youtu.be/_3O5lLitvRc)

<img width="100%" src="./assets/gifs/prototype.gif"/>

## π μ°κ΅¬ λ°°κ²½

* **μ¦λͺμ¬μ§** λλ **μ·¨μμ© νλ‘ν μ¬μ§**μ κ°μ’ μ§μμ λ° μ΄λ ₯μ λ±μ μ¬μ©λλ©° μΌλ°μ μΌλ‘ μ¬μ§κ΄μμ μ΄¬μ 
* μ μ΄ μΈκ·Ό 15κ° μ¬μ§κ΄μ μ·¨μμ© νλ‘ν μμ§ μ΄¬μ κ°κ²©μ μ‘°μ¬ν κ²°κ³Ό νκ·  37,600μμΌλ‘ **λΆλ΄λ  μ μλ λΉμ©μμ μΈμ**
* μ¬μ§κ΄μ μ§μ  λ°©λ¬Έν΄μΌ νλ **μκ°μ  λΉμ© μ‘΄μ¬**
* μ¬μ§κ΄μμλ **νλμ μ΅μ’ κ²°κ³Όλ¬Ό**λ§μ μ»μ μ μμΌλ―λ‘ μμ¬μ μ‘΄μ¬

β‘ μ΄μ μ€λ§νΈν° μΉ΄λ©λΌλ₯Ό ν΅ν΄ μ΄¬μν μ¬μ§μΌλ‘ νλ‘ν μ¬μ§μ μ μ λ° λ³΄μ ν  μ μκ² νλ **λ₯λ¬λ λͺ¨λΈ**κ³Ό μ΄λ₯Ό κ΅¬νν **μ€λ§νΈν° μ νλ¦¬μΌμ΄μ** μ μ


## βοΈ κ°λ° νκ²½

* [Node.js](https://nodejs.org/ko/download/) `16.13.1`
* npm `8.1.2`
    ```sh
    # install latest version of npm
    npm install npm@latest -g
    nvm use --lts
    ```
* [Expo-cli](https://github.com/expo/expo-cli/) `4.13.0`
    ```sh
    # install expo-cli
    npm install -g expo-cli
    ```

## π¦ νλ‘μ νΈ λλ ν λ¦¬ κ΅¬μ‘°
    ms129
    βββ README.md
    βββ App.js
    # Configuration files
    βββ app.json
    βββ babel.config.js
    βββ package-lock.json
    βββ package.json
    βββ yarn.lock
    # Screen .js files for react-navigation
    βββ AlbumInputScreen.js
    βββ CameraInputScreen.js
    βββ GalleryScreen.js
    βββ InputConfirmScreen.js
    βββ MainScreen.js
    βββ ResultScreen.js
    βββ SelectScreen.js
    βββ TestScreen.js
    βββ TutorialScreen.js
    # Assets
    βββ assets
        ββ ...

## π» νλ‘μ νΈ μ€ν

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

## β¨ νλ‘μ νΈ μ°Έμ¬
* `μ νμ€` (νμ₯/λ₯λ¬λ λͺ¨λΈ μμ )
* `μ΅μ΄μ§` (νμ/λͺ¨λ°μΌ μΈν°νμ΄μ€ κ΅¬ν)
* `μ΅νμ` (νμ/λ₯λ¬λ λͺ¨λΈ μμ )

## π μλ°μ΄νΈ λ‘κ·Έ

- [x] λ©μΈ νλ©΄ μΈν°νμ΄μ€ κ΅¬ν - 2021.12
- [x] μΉ΄λ©λΌ μ΄¬μ/μ¨λ²μ ν΅ν μ΄λ―Έμ§ μλ ₯ κ΅¬ν - 2021.12
- [x] νλ‘ν μ΅μ μ ν νλ©΄ μΈν°νμ΄μ€ κ΅¬ν - 2021.12
- [x] μ»€μ€ν ν°νΈ μ μ© - 2021.12
- [ ] μ ν νλ©΄ ν€μ΄μ€νμΌ/μ μ₯ μ΄λ―Έμ§ λΆλ¬μ€κΈ°
- [ ] νλ‘ν μ¬μ§ λ³ν λ₯λ¬λ λͺ¨λΈ μΆκ° μ±λ₯ κ°μ 
- [ ] λ₯λ¬λ λͺ¨λΈ API μλ² μ½λ λ¦¬ν©ν λ§ λ° μ νλ¦¬μΌμ΄μ μ°κ²°
- [ ] νν λ¦¬μΌ νλ©΄ κ΅¬μ±
- [ ] κ°λ°μ μ λ³΄ νλ©΄ κ΅¬μ±

<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments -->

<!-- LICENSE -->
<!-- ## License -->
<!-- Distributed under the MIT License. See `LICENSE.txt` for more information. -->