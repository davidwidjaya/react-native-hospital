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
        // else if(email == "admin" && password == "admin"){
        //   props.navigation.replace("admin");
        // }
        else {
            let formData = new FormData();
            console.log('call api...');
            formData.append("username", username);
            formData.append("password", password);
            formData.append("code", selectedFask);
            // formData.append("code", 'devmercury123');

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
        console.log('call api fakses...');
        // formData.append("consumer_id", "reactnativ");
        // formData.append("consumer_secret", "1234qwer%232");
        // formData.append("nama_consumer", "mobileapp");

        console.log('formdata', formData);

        var result = await rootStore.listFaskes(formData);
        console.log('apiListFaskes', result);
        if (result.kind == "ok") {
            console.log('apiListFaskes', result.data);
            // setListFask(result.data);
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
                        flexDirection: 'column-reverse',
                        width: deviceWidth,
                        height: 0.75466 * deviceWidth,
                    }}
                    source={Images.login_img}
                />


                <View style={{
                    flexDirection: 'column',
                    // backgroundColor: 'blue',
                    width: deviceWidth
                }}>
                    {/* <View style={{ height: 0.02 * deviceWidth }} /> */}

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
                                style={{ ...Styles.size_20, color: '#444' }}
                                icon={isOpened ? faChevronUp : faChevronDown} />
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={{
                            backgroundColor: '#EFEFEF',
                            borderRadius: 12
                        }}
                        rowStyle={{
                            backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'
                        }}
                        rowTextStyle={{ color: '#444', textAlign: 'left' }}
                    />

                    <Textbox
                        // width={deviceWidth}
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

                    {/* <View style={{
                        flexDirection: "row",
                        // backgroundColor: 'yellow',
                        marginLeft: 0.064 * deviceWidth,
                        marginRight: 0.064 * deviceWidth,
                        justifyContent: "space-between"
                    }}>
                        <View style={{
                            flexDirection: "row",
                            width: 0.2426 * deviceWidth,
                            // backgroundColor:'white'
                        }}>
                            <CheckBox
                                disabled={false}
                                value={remember}
                                onValueChange={(newValue) => setRemember(newValue)}
                                tintColors={{ true: 'black' }, { false: 'black' }}
                                style={{
                                    alignSelf: "center",
                                    borderWidth: 2,
                                    // backgroundColor:"red"
                                }}
                            />
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                width: deviceWidth,
                                alignSelf: "center"
                            }}>Ingat Saya</Text>
                        </View>


                        <TouchableOpacity style={{
                            width: 0.565 * deviceWidth,
                            // backgroundColor:'blue',
                            justifyContent: 'center',

                        }}>
                            <Text
                                style={{
                                    ...MainStyle.font_arial_14,
                                    ...MainStyle.color_black,
                                    fontWeight: '400',
                                    textAlign: 'right',
                                }}>Lupa Password?</Text>

                        </TouchableOpacity>
                    </View> */}

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

