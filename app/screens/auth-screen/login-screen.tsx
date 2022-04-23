import React, { useState, useEffect } from 'react';
import { ParamListBase, useIsFocused } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { useStores } from "@models/root-store"
import Spinner from 'react-native-loading-spinner-overlay';
import { MainStyle, Styles, Images, Helper } from "@theme"
import '../../../global.js'
import { Textbox, Button_big } from "@components"
import { Dimensions, View, Text, ToastAndroid, ScrollView, AsyncStorage, Alert, Image, TextInput, TouchableOpacity } from "react-native"
import { values } from 'mobx';
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"


const deviceWidth = Dimensions.get("window").width;

export interface LoginScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

export const LoginScreen: React.FunctionComponent<LoginScreenProps> = props => {
    const rootStore = useStores();

    var [spinner, setSpinner] = useState(false);
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("0101");
    var [username, setUsername] = useState("pujivenus");
    var [remember, setRemember] = useState(false);
    var [listFask, setListFask] = useState([]);
    var [selectedFask, setSelectedFask] = useState("");

    const login = async () => {
        setSpinner(true);

        if (username == "") {
            ToastAndroid.show("Email can't be empty.", ToastAndroid.LONG);
        }
        else if (password == "") {
            ToastAndroid.show("Password can't be empty.", ToastAndroid.LONG);
        }
        else {
            let formData = new FormData();
            console.log('call api...');
            formData.append("username", username);
            formData.append("password", password);
            formData.append("code", selectedFask);

            console.log('formdata', formData);

            var result = await rootStore.login(formData);
            console.log(result);
            if (result.kind == "ok") {
                var token = result.data.token;
                global.bearer_token = token;

                console.log("Token : " + global.bearer_token);

                await AsyncStorage.setItem('bearer_token', token);

                props.navigation.replace("primaryDrawer", { screen: 'home' });
            }
            else if (result.kind == 'wrong') {
                setSpinner(false);
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

        setSpinner(false);
    }
    const listFaskes = async () => {
        setSpinner(true);
        let formData = new FormData();
        console.log('call api listFaskes');

        console.log('formdata', formData);

        var result = await rootStore.listFaskes(formData);
        console.log('apiListFaskes', result);
        if (result.kind == "ok") {
            console.log('apiListFaskes', result.data);
            setListFask([{ "title": "devmercury123", "name": "DEV 4 RS MERCURY", "prefix": "dev_mercury" }, { "title": "Png5ud6DRf", "name": "DEV 4 RS VENUS", "prefix": "dev_venus" }]);
        }
        else if (result.kind == 'wrong') {
            setSpinner(false);
            Alert.alert(
                'Ooops...',
                result.message.toString(),
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        }

        setSpinner(false);
    }

    useEffect(() => {
        listFaskes();
    }, [useIsFocused]);

    return (
        <View style={{ ...Styles.container, alignItems: 'center' }}>

            <Spinner
                visible={spinner}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    style={{
                        ...MainStyle.login_main_image
                    }}
                    source={Images.login_img}
                />


                <View style={{
                    flexDirection: 'column',
                    width: deviceWidth
                }}>

                    <Text style={{
                        ...MainStyle.font_arial_24,
                        color: 'black',
                        fontWeight: '700',
                        width: deviceWidth,
                        marginLeft: 0.064 * deviceWidth,
                    }}>
                        Masuk
                    </Text>


                    <Text style={{
                        ...MainStyle.font_arial_14,
                        ...MainStyle.color_grey_new,
                        fontWeight: '400',
                        width: deviceWidth,
                        marginLeft: 0.064 * deviceWidth,
                        marginTop: 0.0373 * deviceWidth
                    }}>
                        Halo, selamat datang kembali
                    </Text>


                    <SelectDropdown
                        data={listFask}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setSelectedFask(selectedItem.title);
                        }}
                        defaultButtonText={'Select code'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.title;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.title;
                        }}

                        buttonStyle={{
                            width: 0.872 * deviceWidth,
                            marginLeft: 0.064 * deviceWidth,
                            marginRight: 0.064 * deviceWidth,
                            marginTop: 0.042 * deviceWidth,
                            ...Styles.textbox,
                            padding: 0.02 * deviceWidth,
                        }}
                        buttonTextStyle={{
                            textAlign: 'left',
                            ...MainStyle.color_black,
                            ...MainStyle.font_14,

                        }}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesomeIcon
                                style={{ ...Styles.size_20, ...MainStyle.color_black_secondary }}
                                icon={isOpened ? faChevronUp : faChevronDown} />
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={{
                            ...MainStyle.bgcolor_white,
                            borderRadius: 12
                        }}
                        rowStyle={{
                            ...MainStyle.bgcolor_white,
                            borderBottomColor: MainStyle.color_grey_new_light.color
                        }}
                        rowTextStyle={{ ...MainStyle.color_black_secondary, textAlign: 'left' }}
                    />

                    <Textbox
                        title={"Username atau Email"}
                        value={username}
                        editable={true}
                        placeholder={"Username atau Email"}
                        keyboardType={"default"}
                        change={values => setUsername(values)}
                    />

                    <Textbox
                        title={"Kata Sandi"}
                        value={password}
                        editable={true}
                        placeholder={"Kata Sandi"}
                        keyboardType={"default"}
                        hidden={true}
                        change={values => setPassword(values)}
                    />

                    <View style={{ height: 0.096 * deviceWidth }} />
                    <Button_big
                        onPress={() => login()}
                        text={'Masuk'}
                    />
                    <View style={{ height: 0.096 * deviceWidth }} />

                </View>
            </ScrollView>

        </View>
    )
};

