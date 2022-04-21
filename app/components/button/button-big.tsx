import * as React from "react"
import { Dimensions, Text, TouchableOpacity } from "react-native"
import { MainStyle, Styles, Images, Helper } from "@theme"

const deviceWidth = Dimensions.get("window").width;

export function Button_big(props: HeaderProps) {
  
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
    <TouchableOpacity
        onPress={props.onPress}
        style={
                {
                    ...Styles.button_big_view,
                    ...MainStyle.bgcolor_primary_blue,

                }
        }
        disabled={props.disabled}
    >

        <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={{
                ...Styles.button_text,
                ...MainStyle.color_white,
                textAlign:'center',
            }}
        >{props.text}</Text>

    </TouchableOpacity>
  )
}
