import * as React from "react"
import { Dimensions, View, Image, Text, TouchableOpacity } from "react-native"
import { Styles, Images, MainStyle } from "@theme"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faListCheck, faArrowRightArrowLeft, faHistory, faUser } from "@fortawesome/free-solid-svg-icons"


const deviceWidth = Dimensions.get("window").width;


export function Bottom_nav(props: HeaderProps) {
  
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props

  const content = children || <Text tx={tx} text={text}  />

  return (
    <View style={Styles.navmenu_view}>

      {(props.page == 1) ?
        <TouchableOpacity
          onPress={props.home}
          style={Styles.navmenu_button}
        >

        <View style={{...Styles.size_30, ...MainStyle.bgcolor_green, borderRadius:25, justifyContent:'center', alignItems:'center'}}>
          <FontAwesomeIcon 
            style={{...Styles.size_30, color:'white'}}
            icon={faListCheck} />
        </View>

          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={Styles.navmenu_text_active}
          >Menu</Text>

        </TouchableOpacity>
      :
        <TouchableOpacity
          onPress={props.home}
          style={Styles.navmenu_button}
        >

        <View style={{...Styles.size_30, ...MainStyle.bgcolor_green, borderRadius:25, justifyContent:'center', alignItems:'center'}}>
          <FontAwesomeIcon 
            style={{...Styles.size_30, color:'white'}}
            icon={faListCheck} />
        </View>

          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={Styles.navmenu_text_inactive}
          >Menu</Text>

        </TouchableOpacity>
      }

      {(props.page == 2) ?
        <TouchableOpacity
          onPress={props.order}
          style={Styles.navmenu_button}
        >

        <View style={{...Styles.size_30, ...MainStyle.bgcolor_green, borderRadius:25, justifyContent:'center', alignItems:'center'}}>
          <FontAwesomeIcon 
            style={{...Styles.size_30, color:'white'}}
            icon={faArrowRightArrowLeft} />
        </View>


          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={Styles.navmenu_text_active}
          >Order</Text>

        </TouchableOpacity>
      :
        <TouchableOpacity
          onPress={props.order}
          style={Styles.navmenu_button}
        >

        <View style={{...Styles.size_30, ...MainStyle.bgcolor_green, borderRadius:25, justifyContent:'center', alignItems:'center'}}>
          <FontAwesomeIcon 
            style={{...Styles.size_30, color:'white'}}
            icon={faArrowRightArrowLeft} />
        </View>

          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={Styles.navmenu_text_inactive}
          >Order</Text>

        </TouchableOpacity>
      }

      {(props.page == 3) ?
        <TouchableOpacity
          onPress={props.activity}
          style={Styles.navmenu_button}
        >

        <View style={{...Styles.size_30, ...MainStyle.bgcolor_green, borderRadius:25, justifyContent:'center', alignItems:'center'}}>
          <FontAwesomeIcon 
            style={{...Styles.size_30, color:'white'}}
            icon={faHistory} />
        </View>

          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={Styles.navmenu_text_active}
          >Activity</Text>

        </TouchableOpacity>
      :
        <TouchableOpacity
          onPress={props.activity}
          style={Styles.navmenu_button}
        >

        <View style={{...Styles.size_30, ...MainStyle.bgcolor_green, borderRadius:25, justifyContent:'center', alignItems:'center'}}>
          <FontAwesomeIcon 
            style={{...Styles.size_30, color:'white'}}
            icon={faHistory} />
        </View>

          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={Styles.navmenu_text_inactive}
          >Activity</Text>

        </TouchableOpacity>
      }

      {(props.page == 4) ?
        <TouchableOpacity
          onPress={props.profile}
          style={Styles.navmenu_button}
        >

        <View style={{...Styles.size_30, ...MainStyle.bgcolor_green, borderRadius:25, justifyContent:'center', alignItems:'center'}}>
          <FontAwesomeIcon 
            style={{...Styles.size_30, color:'white'}}
            icon={faUser} />
        </View>

          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={Styles.navmenu_text_active}
          >Akun</Text>

        </TouchableOpacity>
      :
        <TouchableOpacity
          onPress={props.profile}
          style={Styles.navmenu_button}
        >

        <View style={{...Styles.size_30, ...MainStyle.bgcolor_green, borderRadius:25, justifyContent:'center', alignItems:'center'}}>
          <FontAwesomeIcon 
            style={{...Styles.size_30, color:'white'}}
            icon={faUser} />
        </View>

          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={Styles.navmenu_text_inactive}
          >Akun</Text>

        </TouchableOpacity>
      }

    </View>
  )
}
