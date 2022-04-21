import React, { useState, useEffect } from 'react';
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { useStores } from "@models/root-store"
import Spinner from 'react-native-loading-spinner-overlay';
import { MainStyle, Styles, Images, Helper } from "@theme"
import '../../../global.js'
import { Textbox, Button_big, Bottom_nav, Searchbox, Menuitem, Menucart } from "@components"
import { Dimensions, View, Text, ToastAndroid, ScrollView, AsyncStorage, Alert, Image, TextInput, TouchableOpacity } from "react-native"
import { values } from 'mobx';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShop } from "@fortawesome/free-solid-svg-icons"


const deviceWidth = Dimensions.get("window").width;

export interface BootstrapScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

export const BootstrapScreen: React.FunctionComponent<BootstrapScreenProps> = props => {
    const rootStore = useStores();

    var [spinner, setSpinner] = useState(false);
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [username, setUsername] = useState("");

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    useEffect(() => {

    }, []);

    return (
        <View style={{ ...Styles.container, alignItems: 'center' }}>
            <Image
                style={{
                    ...Styles.size_120,
                    marginTop: 0.2 * deviceWidth,
                    marginBottom: 0.1166 * deviceWidth,
                    borderRadius: 100,
                    alignSelf: "center",
                }}
                source={Images.default_image}
            />
            <Searchbox
                onPress={() => Alert.alert('hai')}
                placeholder={'Find your menu...'}
            />
            <View style={{
                marginLeft: 0.055 * deviceWidth,
                marginRight: 0.055 * deviceWidth,
                marginTop: 0.025 * deviceWidth,
                flexDirection: "column",
            }}>
                <Text>{"Select"}</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{
                        ...Styles.dropdown
                    }}
                    dropDownContainerStyle={{
                        ...Styles.dropdown_container
                    }}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                        nestedScrollEnabled: true,
                    }}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={{
                    marginLeft: 0.055 * deviceWidth,
                    marginRight: 0.055 * deviceWidth,
                    marginTop: 0.025 * deviceWidth,
                    flexDirection: "column",
                }}>
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
                            icon={faShop} />
                        <Text style={{
                            ...MainStyle.font_16,
                            fontFamily: 'Cabin-SemiBold',
                            marginLeft: 0.05 * deviceWidth,
                            ...MainStyle.color_black
                        }}>
                            Lihat Menu
                        </Text>
                    </TouchableOpacity>
                </View>

                <Textbox
                    title={"Username"}
                    value={username}
                    editable={true}
                    placeholder={"Username"}
                    keyboardType={"default"}
                    change={values => setUsername(values)}
                />


                <Button_big
                    onPress={() => props.navigation.replace('login')}
                    text={'Back'}
                />

                <View style={{
                    marginLeft: 0.055 * deviceWidth,
                    marginRight: 0.055 * deviceWidth,
                    marginTop: 0.025 * deviceWidth,
                    flexDirection: "column",
                }}>
                    <Text
                        style={{
                            ...Styles.label_general
                        }}>Lupa password?</Text>
                </View>

                <Menuitem
                    onPress={() => Alert.alert('menu')}
                    title={'Nasi Goreng Cak Anton Budi Mulia'}
                    price={'25.000.000'}
                />

                <Menucart
                    title={'Nasi Goreng Cak Anton Budi Mulia'}
                    price={'25.000.000'}
                    onPressLess={() => Alert.alert('-')}
                    onPressMore={() => Alert.alert('+')}
                />
            </ScrollView>

            <Bottom_nav
                page={1}
                home={() => { props.navigation.replace("home") }}
                search={() => { props.navigation.replace("search") }}
                order={() => { props.navigation.replace("transaction") }}
                profile={() => { props.navigation.replace("profile") }}
            />
        </View>
    )
}
