# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

1. 로그인 페이지, 로그인 제목을 로그인이라고 바꾸고
   입력창, 버튼 등 모두 로그인 글짜에 맞춰서 일렬로.

2. 아이디,비번찾기 모달창으로 구현

3. 배경색은 계속 화이트 로, 적용하지 말고 none
   (디자인은 나중에 차차 수정할 계획임)

4. css들은 모두 scss 형태로,

5. 코드 짤때 오토 포멧팅 기능으로 코드배열 제대로 하기.

6. 로고이미지는 img파일 말고 컴포넌트 코드방식으로 해당 위치에 붙이기

7. 간편로그인버튼은 로고파일만 가져온 뒤에
   버튼 컴포넌트형식으로 넣어 만들어서 하나씩 붙이기

8. header, footer 부분은 이미 정해져 있으니
   코드 수정해서 따로 웹화면 수정.
   (회원가입, 로그인 페이지를 모두 한 main으로 감싼 후에 div로 나눠서 만들기)




- 경로 설정시 .은 상위 경로로 가는 것을 뜻함.
    ../은 현재 있는 파일 밖으로 나가는 걸 뜻함.
    ../../은 현재 파일 나간후 그 다음 파일도 나가는걸 뜻함.