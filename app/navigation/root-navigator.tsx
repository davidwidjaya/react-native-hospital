import React, { useEffect, useState } from "react"
import { NavigationContainer, NavigationContainerRef, useIsFocused } from "@react-navigation/native"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { PrimaryParamList, RootParamList } from "./types"
import { PrimaryNavigator } from "./primary-navigator"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { HomeScreen, LoginScreen } from "../screens"
import { Textbox } from "../components"
import { Alert, Dimensions, Text } from "react-native"
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import { MainStyle } from "../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useStores } from '@models/root-store';

const Stack = createNativeStackNavigator<RootParamList>()
const Drawer = createDrawerNavigator<PrimaryParamList>();
const deviceWidth = Dimensions.get("window").width;

const logout = (props) => {
  props.navigation.replace('primaryStack', { screen: 'login' });
}


const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,

        stackPresentation: "modal",
      }}
      id="primaryStack"

    >

      <Stack.Screen
        name="primaryDrawer"
        component={RootDrawer}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="primaryStack"
        component={PrimaryNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}


function CustomDrawerContent(props) {
  const rootStore = useStores();
  const [navList, setNavList] = useState([]);


  const getNavbar = async () => {

    let formData = new FormData();
    var result = await rootStore.getNavbar(formData);
    if (result.kind == "ok") {
      console.log('dashboardOK: ', result.data);
      setNavList(result.data.nb1_all);
      console.log('navlist: ', navList[0]);
    }
    else if (result.kind == 'wrong') {
      // console.log(result);
      Alert.alert(
        'Ooops...',
        result.message.toString(),
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }

  }
  useEffect(() => {
    getNavbar();
  }, [useIsFocused]);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {
        navList.map((itm, idx) => {
          console.log('gawegaweguniawgue', itm);
          return (

            <CollapsibleView
              isRTL={true}
              title={
                <Text style={{
                  ...MainStyle.font_14,
                  ...MainStyle.color_primary_blue,
                  fontWeight: '700',
                  width: 0.6666 * deviceWidth,
                  height: 0.10666 * deviceWidth,
                  textAlignVertical: 'center'

                }}>
                  {itm.nama}
                </Text>
              }
              arrowStyling={{ size: 14, ...MainStyle.color_grey_new }}
              style={{
                borderWidth: 0,
                alignItems: "flex-start",
              }}>
              {
                itm.nb2_all.map((itm2, idx) => {
                  return (
                    <CollapsibleView
                      isRTL={true}
                      title={
                        <Text style={{
                          ...MainStyle.font_14,
                          ...MainStyle.color_primary_blue,
                          fontWeight: '700',
                          width: 0.6183 * deviceWidth,
                          height: 0.10666 * deviceWidth,
                          textAlignVertical: "center",

                        }}>
                          {itm2.nama}
                        </Text>
                      }
                      arrowStyling={{ size: 14, ...MainStyle.color_grey_new }}
                      style={{
                        borderWidth: 0,
                        alignItems: "flex-start",
                      }}>
                      {
                        itm2.nb3_all.map((itm3, idx) => {
                          return (
                            <TouchableOpacity
                              onPress={() => Alert.alert('Hi')}
                              style={{
                                width: 0.6666 * deviceWidth,
                                marginRight: 0.0586 * deviceWidth,

                              }}>
                              <Text style={{
                                ...MainStyle.font_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                height: 0.10666 * deviceWidth,
                                textAlignVertical: "center"
                              }}>
                                {itm3.nama}</Text>
                            </TouchableOpacity>

                          );
                        })
                      }
                    </CollapsibleView>

                  )
                })
              }

            </CollapsibleView>

          );
        })
      }

      <CollapsibleView
        isRTL={true}
        title={
          <TouchableOpacity
            onPress={() => logout(props)}
            style={{
              width: 0.6666 * deviceWidth,
              marginRight: 0.0586 * deviceWidth,

            }}>
            <Text style={{
              ...MainStyle.font_14,
              ...MainStyle.color_primary_blue,
              fontWeight: '700',
              width: 0.6666 * deviceWidth,
              height: 0.10666 * deviceWidth,
              textAlignVertical: 'center',
            }}>
              Logout</Text>
          </TouchableOpacity>

        }
        noArrow={true}
        style={{
          borderWidth: 0,
          alignItems: "flex-start",
        }}>
      </CollapsibleView>
    </DrawerContentScrollView>
  );
}

const RootDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      id="RootDrawer"
      // useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}>

      {/* < */}
      {/* <Drawer.Group>
        
      </Drawer.Group> */}
      {/* <Drawer.Screen name="login" component={LoginScreen} options={{}} /> */}
      <Drawer.Screen name="home" component={HomeScreen} options={{ drawerItemStyle: { height: 0 } }} />
    </Drawer.Navigator>
  )
}


export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      {/* <RootDrawer /> */}
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
