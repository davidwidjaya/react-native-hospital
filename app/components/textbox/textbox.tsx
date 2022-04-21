import * as React from "react"
import { Dimensions, TextInput, Text, View } from "react-native"
import { MainStyle, Styles, Images, Helper } from "@theme"

const deviceWidth = Dimensions.get("window").width;

export function Textbox(props: HeaderProps) {

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
      marginLeft: 0.064*deviceWidth,
      marginRight: 0.064*deviceWidth,
      marginTop: 0.042*deviceWidth,
      // width: deviceWidth,
      // width: 0.872 * deviceWidth,
      flexDirection: "column",
      // backgroundColor: 'red'
    }}>
      <Text>{props.title}</Text>
      <TextInput
        style={Styles.textbox}
        value={props.value}
        editable={props.editable}
        placeholder={props.placeholder}
        onSubmitEditing={props.submit}
        onChangeText={props.change}
        secureTextEntry={props.hidden}
        keyboardType={props.keyboardType}
      />

    </View>
  )
}
