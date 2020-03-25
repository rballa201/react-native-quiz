// //import { createAppContainer } from 'react-navigation';
// //import { createStackNavigator } from 'react-navigation-stack';
// import { Notifications } from 'expo';
// import React from 'react';
// import { StackNavigator } from 'react-navigation';
// import MainTabNavigator from './MainTabNavigator';
// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
// import StudentEntry from "../screens/StudentEntry"


// import Login from "../screens/Login"
// //import Home from "./screens/Home"
// import SignUp from "../screens/SignUp"
// //import Quiz from "./screens/StudentEntry"
// import ForgotPassword from "../screens/ForgotPassword"

// const RootStackNavigator = StackNavigator({
//   //Home: { screen: Home },
//   Login: { screen: Login },
//   SignUp: { screen: SignUp },
//   ForgotPassword: { screen: ForgotPassword },
//   Main: { screen: MainTabNavigator, },

// },
//   {
//     navigationOptions: () => ({
//       headerTitleStyle: {
//         fontWeight: 'normal',
//       },
//     }),
//   });

// export default class RootNavigator extends React.Component {
//   componentDidMount() {
//     this._notificationSubscription = this._registerForPushNotifications();
//   }

//   componentWillUnmount() {
//     this._notificationSubscription && this._notificationSubscription.remove();
//   }

//   render() {
//     return <RootStackNavigator />;
//   }

//   _registerForPushNotifications() {
//     // Send our push token over to our backend so we can receive notifications
//     // You can comment the following line out if you want to stop receiving
//     // a notification every time you open the app. Check out the source
//     // for this function in api/registerForPushNotificationsAsync.js
//     registerForPushNotificationsAsync();

//     // Watch for incoming notifications
//     this._notificationSubscription = Notifications.addListener(this._handleNotification);
//   }

//   _handleNotification = ({ origin, data }) => {
//     console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
//   };
// }