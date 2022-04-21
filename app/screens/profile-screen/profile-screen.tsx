import React, { useState, useEffect } from 'react';
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { useStores } from "@models/root-store"
import Spinner from 'react-native-loading-spinner-overlay';
import { MainStyle, Styles, Images, Helper } from "@theme"
import '../../../global.js'
import { Textbox, Button_big, Bottom_nav } from "@components"
import { Dimensions, View, Text, ToastAndroid, ScrollView, AsyncStorage, Alert, Image, TextInput, TouchableOpacity } from "react-native"
import { values } from 'mobx';

const deviceWidth = Dimensions.get("window").width;

export interface ProfileScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

export const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = props => {
    const rootStore = useStores();

    var [spinner, setSpinner] = useState(false);
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [username, setUsername] = useState("");

    useEffect(() => {

    }, []);

    return (
        <View style={{ ...Styles.container, alignItems: 'center' }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Button_big
                    onPress={() => props.navigation.replace('login')}
                    text={'Back'}
                />
            </ScrollView>

            <Bottom_nav
                page={4}
                home={() => { props.navigation.replace("home") }}
                order={() => { props.navigation.replace("order") }}
                activity={() => { props.navigation.replace("activity") }}
                profile={() => { props.navigation.replace("profile") }}
            />
        </View>
    )
}
