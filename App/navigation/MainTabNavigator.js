// import React from 'react';
// import { Platform } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { TabNavigator, TabBarBottom } from 'react-navigation';
// import Colors from '../constants/Colors';
// import StudentEntry from '../screens/StudentEntry';

// export default TabNavigator(
//   {
//     StudentEntry: {
//       screen: StudentEntry,
//     },
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         switch (routeName) {
//           case 'StudentEntry':
//             iconName =
//               Platform.OS === 'ios'
//                 ? `ios-information-circle${focused ? '' : '-outline'}`
//                 : 'md-information-circle';
//             break;
//         }
//         return (
//           <Ionicons
//             name={iconName}
//             size={28}
//             style={{ marginBottom: -3 }}
//             color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
//           />
//         );
//       },
//     }),
//     tabBarComponent: TabBarBottom,
//     tabBarPosition: 'bottom',
//     animationEnabled: false,
//     swipeEnabled: false,
//   }
// );
