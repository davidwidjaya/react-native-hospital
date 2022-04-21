import * as React from "react"
import { Dimensions, TextInput, Text, View, TouchableOpacity, Image } from "react-native"
import { MainStyle, Styles, Images, Helper } from "@theme"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
const deviceWidth = Dimensions.get("window").width;

export function Menuitem(props: HeaderProps) {

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
    <TouchableOpacity style={{
      flexDirection: 'row',
      height: 0.36 * deviceWidth,
      padding: 0.055 * deviceWidth
    }}
    onPress={props.onPress}
    >
      <View style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        alignSelf: "center",
        borderRadius: 15,
      }}>
        <Image
          style={{
            ...Styles.size_120,
            borderRadius: 15,
          }}
          source={Images.default_food}
        />
      </View>
      <View style={{
        width: 0.55 * deviceWidth,
        marginLeft: 0.05 * deviceWidth
      }}>
        <Text
          numberOfLines={1}
          style={{
            ...MainStyle.font_16,
            fontFamily: 'Cabin-Bold'
          }}>
            {props.title}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...MainStyle.font_14
          }}>
          Rp {props.price}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
