import * as React from "react"
import { Dimensions, View, Image, Text, TouchableOpacity } from "react-native"
import { Styles, Images, MainStyle } from "@theme"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faListCheck, faArrowRightArrowLeft, faHistory, faUser } from "@fortawesome/free-solid-svg-icons"
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { LoginScreen, HomeScreen } from './../../screens';
import { NavigationContainer } from '@react-navigation/native';

const deviceWidth = Dimensions.get("window").width;

const Drawer = createDrawerNavigator();

export function Sidebar(props: HeaderProps) {

  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props

  const content = children || <Text tx={tx} text={text} />


  return (
    // <View></View>
    // <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="Login" component={HomeScreen} />
      <Drawer.Screen name="Home" component={LoginScreen} />
    </Drawer.Navigator>

    // </NavigationContainer>
  );

  // return (
  //   <View style={Styles.navmenu_view}>

  //   </View>
  // )
}
