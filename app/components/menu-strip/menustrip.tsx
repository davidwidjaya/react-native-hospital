import * as React from "react"
import { Dimensions, TextInput, Text, View, TouchableOpacity, Image } from "react-native"
import { MainStyle, Styles, Images, Helper } from "@theme"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faShop } from "@fortawesome/free-solid-svg-icons"
const deviceWidth = Dimensions.get("window").width;

export function Menustrip(props: HeaderProps) {

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
    <View style={{
    }}
    >
      <TouchableOpacity style={{
        flexDirection: 'row',
        width: 0.91 * deviceWidth,
        height: 0.11 * deviceWidth,
        alignItems: 'center',
        borderBottomWidth: 0.001 * deviceWidth
      }}>
        <FontAwesomeIcon
          style={{ ...MainStyle.color_green }}
          size={28}
          icon={props.icon} />
        <Text style={{
          ...MainStyle.font_16,
          fontFamily: 'Cabin-SemiBold',
          marginLeft: 0.05 * deviceWidth,
          ...MainStyle.color_black
        }}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
