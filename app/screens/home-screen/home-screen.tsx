import React, { useState, useEffect } from 'react';
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { useStores } from "@models/root-store"
import Spinner from 'react-native-loading-spinner-overlay';
import { MainStyle, Styles, Images, Helper } from "@theme"
import '../../../global.js'
import { Textbox, Button_big, Bottom_nav, Searchbox, Menuitem } from "@components"
import { Dimensions, View, Text, ToastAndroid, ScrollView, AsyncStorage, Alert, Image, TextInput, TouchableOpacity } from "react-native"
import { values } from 'mobx';
import DropDownPicker from 'react-native-dropdown-picker';

const deviceWidth = Dimensions.get("window").width;

export interface HomeScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = props => {
    const rootStore = useStores();

    var [spinner, setSpinner] = useState(false);
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [search, setSearch] = useState("");

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

            <Searchbox
                title={""}
                value={search}
                editable={true}
                keyboardType={"default"}
                change={values => setSearch(values)}            
                onPress={() => Alert.alert('hai')}
                placeholder={'Find your menu...'}
            />

            <View style={{
                marginLeft: 0.055 * deviceWidth,
                marginRight: 0.055 * deviceWidth,
                marginTop: 0.025 * deviceWidth,
                flexDirection: "column",
            }}>
                <Text>{"Filter by Category"}</Text>
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

            <ScrollView showsVerticalScrollIndicator={false}>

                <Menuitem
                    onPress={() => Alert.alert('menu')}
                    title={'Nasi Goreng Cak Anton Budi Mulia'}
                    price={'25.000.000'}
                />
                <Menuitem
                    onPress={() => Alert.alert('menu')}
                    title={'Nasi Goreng Cak Anton Budi Mulia'}
                    price={'25.000.000'}
                />
                <Menuitem
                    onPress={() => Alert.alert('menu')}
                    title={'Nasi Goreng Cak Anton Budi Mulia'}
                    price={'25.000.000'}
                />
                <Menuitem
                    onPress={() => Alert.alert('menu')}
                    title={'Nasi Goreng Cak Anton Budi Mulia'}
                    price={'25.000.000'}
                />
                <Button_big
                    onPress={() => props.navigation.replace('login')}
                    text={'Back'}
                />
            </ScrollView>

            <Bottom_nav
                page={1}
                home={() => { props.navigation.replace("home") }}
                order={() => { props.navigation.replace("order") }}
                activity={() => { props.navigation.replace("activity") }}
                profile={() => { props.navigation.replace("profile") }}
            />
        </View>
    )
}
