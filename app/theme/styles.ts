import { Dimensions } from "react-native"


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export const MainStyle = {
    font_numans: {
        fontFamily: "Arial"
    },
    font_1: {
        fontFamily: "Arial",
        fontSize: 1
    },
    font_2: {
        fontFamily: "Arial",
        fontSize: 2
    },
    font_3: {
        fontFamily: "Arial",
        fontSize: 3
    },
    font_4: {
        fontFamily: "Arial",
        fontSize: 4
    },
    font_5: {
        fontFamily: "Arial",
        fontSize: 5
    },
    font_6: {
        fontFamily: "Arial",
        fontSize: 6
    },
    font_7: {
        fontFamily: "Arial",
        fontSize: 7
    },
    font_8: {
        fontFamily: "Arial",
        fontSize: 8
    },
    font_9: {
        fontFamily: "Arial",
        fontSize: 9
    },
    font_10: {
        fontFamily: "Arial",
        fontSize: 10
    },
    font_11: {
        fontFamily: "Arial",
        fontSize: 11
    },
    font_12: {
        fontFamily: "Arial",
        fontSize: 12
    },
    font_13: {
        fontFamily: "Arial",
        fontSize: 13
    },
    font_14: {
        fontFamily: "Arial",
        fontSize: 14
    },
    font_15: {
        fontFamily: "Arial",
        fontSize: 15
    },
    font_16: {
        fontFamily: "Arial",
        fontSize: 16
    },
    font_17: {
        fontFamily: "Arial",
        fontSize: 17
    },
    font_18: {
        fontFamily: "Arial",
        fontSize: 18
    },
    font_19: {
        fontFamily: "Arial",
        fontSize: 19
    },
    font_20: {
        fontFamily: "Arial",
        fontSize: 20
    },
    font_21: {
        fontFamily: "Arial",
        fontSize: 21
    },
    font_22: {
        fontFamily: "Arial",
        fontSize: 22
    },
    font_23: {
        fontFamily: "Arial",
        fontSize: 23
    },
    font_24: {
        fontFamily: "Arial",
        fontSize: 24
    },
    font_25: {
        fontFamily: "Arial",
        fontSize: 25
    },
    font_26: {
        fontFamily: "Arial",
        fontSize: 26
    },
    font_27: {
        fontFamily: "Arial",
        fontSize: 27
    },
    font_28: {
        fontFamily: "Arial",
        fontSize: 28
    },
    font_29: {
        fontFamily: "Arial",
        fontSize: 29
    },
    font_30: {
        fontFamily: "Arial",
        fontSize: 30
    },
    font_31: {
        fontFamily: "Arial",
        fontSize: 31
    },
    font_32: {
        fontFamily: "Arial",
        fontSize: 32
    },
    font_33: {
        fontFamily: "Arial",
        fontSize: 33
    },
    font_34: {
        fontFamily: "Arial",
        fontSize: 34
    },
    font_35: {
        fontFamily: "Arial",
        fontSize: 35
    },
    font_36: {
        fontFamily: "Arial",
        fontSize: 36
    },
    font_37: {
        fontFamily: "Arial",
        fontSize: 37
    },
    font_38: {
        fontFamily: "Arial",
        fontSize: 38
    },
    font_39: {
        fontFamily: "Arial",
        fontSize: 39
    },
    font_40: {
        fontFamily: "Arial",
        fontSize: 40
    },
    font_thin: {
        fontWeight: "100"
    },
    font_ultra_light: {
        fontWeight: "200"
    },
    font_light: {
        fontWeight: "300"
    },
    font_regular: {
        fontWeight: "400"
    },
    font_medium: {
        fontWeight: "500"
    },
    font_semibold: {
        fontWeight: "600"
    },
    font_heavy: {
        fontWeight: "800"
    },
    font_bold: {
        fontWeight: "bold"
    },
    font_italic: {
        fontStyle: "italic"
    },
    font_underline: {
        textDecorationLine: "underline"
    },

    //background_color
    bgcolor_primary_blue: {
        backgroundColor: "#2E6FDF"
    },
    bgcolor_primary_blue_light: {
        backgroundColor: "#F4F5FC"
    },
    bgcolor_white: {
        backgroundColor: "#EFEFEF"
    },

    //color
    color_black: {
        color: "#212121"
    },
    color_black_secondary: {
        color: "#444"
    },
    color_blue_light: {
        color: "#F4F5FC"
    },
    color_grey_new: {
        color: "#8C8EA0"
    },
    color_primary_blue: {
        color: "#2E6FDF"
    },
    color_grey_new_light: {
        color: "#C5C5C5"
    }
}

export const Styles = {
    //Screen
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    fullscreen: {
        width: deviceWidth,
        height: deviceHeight,
    },
    margin_lr: {
        marginLeft: 0.055 * deviceWidth,
        marginRight: 0.055 * deviceWidth,
    },
    size_10: {
        width: 0.027 * deviceWidth,
        height: 0.027 * deviceWidth,
    },
    size_16: {
        width: 0.044 * deviceWidth,
        height: 0.044 * deviceWidth,
    },
    size_20: {
        width: 0.055 * deviceWidth,
        height: 0.055 * deviceWidth,
    },
    size_25: {
        width: 0.0694 * deviceWidth,
        height: 0.0694 * deviceWidth,
    },
    size_30: {
        width: 0.083 * deviceWidth,
        height: 0.083 * deviceWidth,
    },
    size_40: {
        width: 0.11 * deviceWidth,
        height: 0.11 * deviceWidth,
    },
    size_120: {
        width: 0.33 * deviceWidth,
        height: 0.33 * deviceWidth,
    },
    size_120_60: {
        width: 0.33 * deviceWidth,
        height: 0.166 * deviceWidth,
    },
    size_vendor: {
        width: deviceWidth,
        height: 0.405 * deviceWidth,
    },


    // #components
    //textbox
    textbox: {
        height: 0.1 * deviceWidth,
        marginVertical: 0.01 * deviceWidth,
        padding: 0.03 * deviceWidth,
        borderRadius: 12,
        ...MainStyle.color_black,
        backgroundColor: MainStyle.color_blue_light.color,
        ...MainStyle.font_14
    },


    //login_image
    login_main_image: {
        flexDirection: 'column-reverse',
        width: deviceWidth,
        height: 0.75466 * deviceWidth,
    },


    //dashboard_title
    dashboard_header_title: {
        ...MainStyle.font_24,
        ...MainStyle.color_black,
        fontWeight: '700',
        width: deviceWidth,
        marginLeft: 0.064 * deviceWidth,
        marginTop: 0.0373 * deviceWidth
    },
    dashboard_subheader_title: {
        ...MainStyle.font_16,
        ...MainStyle.color_black,
        fontWeight: '700',
        width: deviceWidth,
        marginLeft: 0.064 * deviceWidth,
        marginTop: 0.0373 * deviceWidth
    },


    //dashboard_item
    dashboard_item_wrapper: {
        width: 0.408 * deviceWidth,
        height: 0.2773 * deviceWidth,
        ...MainStyle.bgcolor_primary_blue_light,
        borderRadius: 13,
        paddingHorizontal: 0.032 * deviceWidth,
        paddingVertical: 0.0426 * deviceWidth,
        marginRight: 0.0426 * deviceWidth,
    },
    dashboard_itemcount_text: {
        ...MainStyle.font_24,
        ...MainStyle.color_black,
        fontWeight: '700',
        textAlign: 'center'
    },
    dashboard_item_desc_text: {
        ...MainStyle.font_14,
        ...MainStyle.color_black,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 0.0053 * deviceWidth
    },
    dashboard_item_date_text: {
        ...MainStyle.font_12,
        ...MainStyle.color_grey_new,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 0.016 * deviceWidth,
    },

    dashboard_duration_wrapper_text: {
        width: 0.872 * deviceWidth,
        height: 0.416 * deviceWidth,
        ...MainStyle.bgcolor_primary_blue_light,
        borderRadius: 13,
        paddingHorizontal: 0.032 * deviceWidth,
        paddingVertical: 0.0426 * deviceWidth,
        marginRight: 0.0426 * deviceWidth,
        marginLeft: 0.064 * deviceWidth,
        marginBottom: 0.0426 * deviceWidth,
    },

    dashboard_duration_average_text: {
        ...MainStyle.font_24,
        ...MainStyle.color_black,
        fontWeight: '700',
        textAlign: 'center'
    },

    dashboard_duration_desc_text: {
        ...MainStyle.font_14,
        ...MainStyle.color_black,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 0.0053 * deviceWidth
    },
    dashboard_option_desc_text: {
        ...MainStyle.font_14,
        ...MainStyle.color_black,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 0.0053 * deviceWidth
    },



    //buttonbig
    button_big_view: {
        width: 0.91 * deviceWidth,
        height: 0.1 * deviceWidth,
        marginLeft: 0.055 * deviceWidth,
        marginRight: 0.055 * deviceWidth,
        justifyContent: 'center',
        borderRadius: 12,
    },
    button_text: {
        ...MainStyle.font_14,
        fontWeight: "700"
        // fontFamily: 'Cabin-Bold'
    },
    label_general: {
        ...MainStyle.font_16,
    },

}