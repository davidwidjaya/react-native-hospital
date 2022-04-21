import * as React from "react"
import { Dimensions, TextInput, Text, View, TouchableOpacity } from "react-native"
import { MainStyle, Styles, Images, Helper } from "@theme"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
const deviceWidth = Dimensions.get("window").width;

export function Searchbox(props: HeaderProps) {

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
      marginLeft: 0.055 * deviceWidth,
      marginRight: 0.055 * deviceWidth,
      marginTop: 0.025 * deviceWidth,
      flexDirection: "column",
    }}>
      <TextInput
          style={{
            ...Styles.searchbox,
          }}
          value={props.value}
          editable={props.editable}
          placeholder = {props.placeholder}
          onSubmitEditing={props.submit}
          onChangeText={props.change}
          secureTextEntry={props.hidden}
          keyboardType={props.keyboardType}
      />

      <TouchableOpacity style={{
        ...Styles.searchbox_icon
      }}
      onPress={props.onPress}
      >
        <FontAwesomeIcon
          size={24}
          color={'white'}
          icon={faSearch} />
      </TouchableOpacity>
    </View>
  )
}
