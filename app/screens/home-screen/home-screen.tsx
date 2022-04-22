import React, { useState, useEffect } from 'react';
import { ParamListBase, useIsFocused } from "@react-navigation/native"
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

    const [value, setValue] = useState(null);
    const [orderLabo, setOrderLabo] = useState(0);
    const [orderRadio, setOrderRadio] = useState(0);
    const [visitDays, setVisitDays] = useState([]);
    const [visitMonth, setVisitMonth] = useState([]);
    const [summaryRegistration, setSummaryRegistration] = useState([]);
    const [statusDurationService, setStatusDurationService] = useState(null);

    const getDashboard = async () => {
        setSpinner(true);

        let formData = new FormData();

        console.log(value);

        var result = await rootStore.dashboard(formData);
        if (result.kind == "ok") {
            console.log('dashboard: ', result);
            setOrderLabo(result.data.data.total_order_radiologi);
            setOrderRadio(result.data.data.total_order_laboratorium);
            setVisitDays(result.data.data.total_kunjungan_harian);
            setVisitMonth(result.data.data.total_kunjungan_bulanan);
            setSummaryRegistration(result.data.data.summary_registrasi);
            console.log('xxxx', result.data.stats_indikator_mutu_durasi_pelayanan);
            setStatusDurationService(result.data.stats_indikator_mutu_durasi_pelayanan);

        }
        else if (result.kind == 'wrong') {
            // console.log(result);
            setSpinner(false);
            Alert.alert(
                'Ooops...',
                result.message.toString(),
                [
                    { text: 'OK', onPress: () => props.navigation.replace('login') }
                ],
                { cancelable: false }
            );
        }

        setSpinner(false);
    }

    const checkLogin = async () => {
        var token = await AsyncStorage.getItem('bearer_token');

        if (token !== null) {
            global.bearer_token = token;
            console.log(global.bearer_token);
        } else {
            props.navigation.replace('login');
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        getDashboard();
    }, [useIsFocused]);

    return (
        <View style={{ ...Styles.container, alignItems: 'center' }}>


            <Spinner
                visible={spinner}
            />

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    // backgroundColor: 'red',
                    flexDirection: "row",
                    marginTop: 0.14666 * deviceWidth,
                    alignItems: "flex-end",
                    width: deviceWidth,
                    justifyContent: 'flex-end',
                    paddingRight: 0.0746*deviceWidth
                }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.replace('login')}
                        style={{
                            width: 0.0826 * deviceWidth,
                            height: 0.0966 * deviceWidth,
                            // backgroundColor: 'red',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image source={Images.hamburger_icon} />
                    </TouchableOpacity>

                </View>
                <Text style={{
                    ...MainStyle.font_arial_24,
                    ...MainStyle.color_black,
                    fontWeight: '700',
                    width: deviceWidth,
                    marginLeft: 0.064 * deviceWidth,
                    marginTop: 0.0373 * deviceWidth
                }}>
                    Dashboard
                </Text>

                <View>
                    <Text style={{
                        ...MainStyle.font_arial_16,
                        ...MainStyle.color_black,
                        fontWeight: '700',
                        width: deviceWidth,
                        marginLeft: 0.064 * deviceWidth,
                        marginTop: 0.0373 * deviceWidth
                    }}>
                        Pasien & Kunjungan Harian
                    </Text>
                    <View style={{ height: 0.0533 * deviceWidth }} />

                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{
                        marginLeft: 0.064 * deviceWidth,
                        marginRight: 0.064 * deviceWidth,

                    }}>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {visitDays.total_pasien ? visitDays.total_pasien : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Total Kunjungan
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {visitDays.pria ? visitDays.pria : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Pria
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {visitDays.wanita ? visitDays.wanita : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Wanita
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {visitDays.pasien_baru ? visitDays.pasien_baru : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Pasien Baru
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {visitDays.pasien_kontrol ? visitDays.pasien_kontrol : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Pasien Kontrol
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>


                    </ScrollView>

                </View>
                <View>
                    <Text style={{
                        ...MainStyle.font_arial_16,
                        ...MainStyle.color_black,
                        fontWeight: '700',
                        width: deviceWidth,
                        marginLeft: 0.064 * deviceWidth,
                        marginTop: 0.0373 * deviceWidth
                    }}>
                        Pasien & Kunjungan Bulanan
                    </Text>
                    <View style={{ height: 0.0533 * deviceWidth }} />

                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{
                        marginLeft: 0.064 * deviceWidth,
                        marginRight: 0.064 * deviceWidth,

                    }}>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {visitMonth.total_pasien ? visitMonth.total_pasien : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Total Kunjungan
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {visitMonth.pria ? visitMonth.pria : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Pria
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {visitMonth.wanita ? visitMonth.wanita : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Wanita
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {visitMonth.pasien_baru ? visitMonth.pasien_baru : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Pasien Baru
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {visitMonth.pasien_kontrol ? visitMonth.pasien_kontrol : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Pasien Kontrol
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>


                    </ScrollView>

                </View>
                <View>
                    <Text style={{
                        ...MainStyle.font_arial_16,
                        ...MainStyle.color_black,
                        fontWeight: '700',
                        width: deviceWidth,
                        marginLeft: 0.064 * deviceWidth,
                        marginTop: 0.0373 * deviceWidth
                    }}>
                        Transaksi
                    </Text>

                    <View style={{ height: 0.0533 * deviceWidth }} />
                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{
                        marginLeft: 0.064 * deviceWidth,
                        marginRight: 0.064 * deviceWidth,

                    }}>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {orderLabo}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Order Laboratorium
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {orderRadio}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Order Radiologi
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {summaryRegistration.total_pending_rajal ? summaryRegistration.total_pending_rajal : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Pending Rajal
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {summaryRegistration.total_aktif_rajal ? summaryRegistration.total_aktif_rajal : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Total Aktif Rajal
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {summaryRegistration.total_pending_ranap ? summaryRegistration.total_pending_ranap : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Total Pending Ranap
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 0.408 * deviceWidth,
                            height: 0.2773 * deviceWidth,
                            ...MainStyle.bgcolor_primary_blue_light,
                            borderRadius: 13,
                            paddingHorizontal: 0.032 * deviceWidth,
                            paddingVertical: 0.0426 * deviceWidth,
                            marginRight: 0.0426 * deviceWidth,
                        }}>

                            <Text style={{
                                ...MainStyle.font_arial_24,
                                ...MainStyle.color_black,
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {summaryRegistration.total_reg_aktif ? summaryRegistration.total_reg_aktif : 0}
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Total Regis Aktif
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_12,
                                ...MainStyle.color_grey_new,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.016 * deviceWidth,
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>


                    </ScrollView>

                </View>

                <View>
                    <Text style={{
                        ...MainStyle.font_arial_16,
                        ...MainStyle.color_black,
                        fontWeight: '700',
                        width: deviceWidth,
                        marginLeft: 0.064 * deviceWidth,
                        marginTop: 0.0373 * deviceWidth
                    }}>
                        Durasi
                    </Text>

                    {
                        (statusDurationService !== undefined && statusDurationService !== null) ?
                            <View>
                                <TouchableOpacity style={{
                                    width: 0.872 * deviceWidth,
                                    height: 0.416 * deviceWidth,
                                    ...MainStyle.bgcolor_primary_blue_light,
                                    borderRadius: 13,
                                    paddingHorizontal: 0.032 * deviceWidth,
                                    paddingVertical: 0.0426 * deviceWidth,
                                    marginRight: 0.0426 * deviceWidth,
                                    marginLeft: 0.064 * deviceWidth,
                                    marginBottom: 0.0426 * deviceWidth,

                                }}>

                                    <Text style={{
                                        ...MainStyle.font_arial_24,
                                        ...MainStyle.color_black,
                                        fontWeight: '700',
                                        textAlign: 'center'
                                    }}>
                                        {statusDurationService.tunggu_di_cs.rata2 ? statusDurationService.tunggu_di_cs.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_14,
                                        ...MainStyle.color_black,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.0053 * deviceWidth
                                    }}>
                                        Durasi rata-rata tunggu di CS
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_12,
                                        ...MainStyle.color_grey_new,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.016 * deviceWidth,
                                    }}>
                                        2022-03-10
                                    </Text>

                                    <View style={{
                                        flexDirection: "row"
                                    }}>
                                        <View style={{
                                            width: 0.24333 * deviceWidth
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.tunggu_di_cs.jumlah_durasi ? statusDurationService.tunggu_di_cs.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.tunggu_di_cs.jumlah_pasien ? statusDurationService.tunggu_di_cs.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: 0.872 * deviceWidth,
                                    height: 0.416 * deviceWidth,
                                    ...MainStyle.bgcolor_primary_blue_light,
                                    borderRadius: 13,
                                    paddingHorizontal: 0.032 * deviceWidth,
                                    paddingVertical: 0.0426 * deviceWidth,
                                    marginRight: 0.0426 * deviceWidth,
                                    marginLeft: 0.064 * deviceWidth,
                                    marginBottom: 0.0426 * deviceWidth,

                                }}>

                                    <Text style={{
                                        ...MainStyle.font_arial_24,
                                        ...MainStyle.color_black,
                                        fontWeight: '700',
                                        textAlign: 'center'
                                    }}>
                                        {statusDurationService.pelayanan_di_cs.rata2 ? statusDurationService.pelayanan_di_cs.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_14,
                                        ...MainStyle.color_black,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.0053 * deviceWidth
                                    }}>
                                        Durasi rata-rata pelayanan di CS
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_12,
                                        ...MainStyle.color_grey_new,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.016 * deviceWidth,
                                    }}>
                                        2022-03-10
                                    </Text>

                                    <View style={{
                                        flexDirection: "row"
                                    }}>
                                        <View style={{
                                            width: 0.24333 * deviceWidth
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.pelayanan_di_cs.jumlah_durasi ? statusDurationService.pelayanan_di_cs.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.pelayanan_di_cs.jumlah_pasien ? statusDurationService.pelayanan_di_cs.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: 0.872 * deviceWidth,
                                    height: 0.416 * deviceWidth,
                                    ...MainStyle.bgcolor_primary_blue_light,
                                    borderRadius: 13,
                                    paddingHorizontal: 0.032 * deviceWidth,
                                    paddingVertical: 0.0426 * deviceWidth,
                                    marginRight: 0.0426 * deviceWidth,
                                    marginLeft: 0.064 * deviceWidth,
                                    marginBottom: 0.0426 * deviceWidth,

                                }}>

                                    <Text style={{
                                        ...MainStyle.font_arial_24,
                                        ...MainStyle.color_black,
                                        fontWeight: '700',
                                        textAlign: 'center'
                                    }}>
                                        {statusDurationService.tunggu_di_poli.rata2 ? statusDurationService.tunggu_di_poli.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_14,
                                        ...MainStyle.color_black,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.0053 * deviceWidth
                                    }}>
                                        Durasi rata-rata tunggu di Poli
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_12,
                                        ...MainStyle.color_grey_new,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.016 * deviceWidth,
                                    }}>
                                        2022-03-10
                                    </Text>

                                    <View style={{
                                        flexDirection: "row"
                                    }}>
                                        <View style={{
                                            width: 0.24333 * deviceWidth
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.tunggu_di_poli.jumlah_durasi ? statusDurationService.tunggu_di_poli.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.tunggu_di_poli.jumlah_pasien ? statusDurationService.tunggu_di_poli.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: 0.872 * deviceWidth,
                                    height: 0.416 * deviceWidth,
                                    ...MainStyle.bgcolor_primary_blue_light,
                                    borderRadius: 13,
                                    paddingHorizontal: 0.032 * deviceWidth,
                                    paddingVertical: 0.0426 * deviceWidth,
                                    marginRight: 0.0426 * deviceWidth,
                                    marginLeft: 0.064 * deviceWidth,
                                    marginBottom: 0.0426 * deviceWidth,

                                }}>

                                    <Text style={{
                                        ...MainStyle.font_arial_24,
                                        ...MainStyle.color_black,
                                        fontWeight: '700',
                                        textAlign: 'center'
                                    }}>
                                        {statusDurationService.pelayanan_di_poli.rata2 ? statusDurationService.pelayanan_di_poli.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_14,
                                        ...MainStyle.color_black,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.0053 * deviceWidth
                                    }}>
                                        Durasi rata-rata pelayanan di Poli
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_12,
                                        ...MainStyle.color_grey_new,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.016 * deviceWidth,
                                    }}>
                                        2022-03-10
                                    </Text>

                                    <View style={{
                                        flexDirection: "row"
                                    }}>
                                        <View style={{
                                            width: 0.24333 * deviceWidth
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.pelayanan_di_poli.jumlah_durasi ? statusDurationService.pelayanan_di_poli.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.pelayanan_di_poli.jumlah_pasien ? statusDurationService.pelayanan_di_poli.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: 0.872 * deviceWidth,
                                    height: 0.416 * deviceWidth,
                                    ...MainStyle.bgcolor_primary_blue_light,
                                    borderRadius: 13,
                                    paddingHorizontal: 0.032 * deviceWidth,
                                    paddingVertical: 0.0426 * deviceWidth,
                                    marginRight: 0.0426 * deviceWidth,
                                    marginLeft: 0.064 * deviceWidth,
                                    marginBottom: 0.0426 * deviceWidth,

                                }}>

                                    <Text style={{
                                        ...MainStyle.font_arial_24,
                                        ...MainStyle.color_black,
                                        fontWeight: '700',
                                        textAlign: 'center'
                                    }}>
                                        {statusDurationService.tunggu_resep.rata2 ? statusDurationService.tunggu_resep.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_14,
                                        ...MainStyle.color_black,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.0053 * deviceWidth
                                    }}>
                                        Durasi rata-rata tunggu resep
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_12,
                                        ...MainStyle.color_grey_new,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.016 * deviceWidth,
                                    }}>
                                        2022-03-10
                                    </Text>

                                    <View style={{
                                        flexDirection: "row"
                                    }}>
                                        <View style={{
                                            width: 0.24333 * deviceWidth
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.tunggu_resep.jumlah_durasi ? statusDurationService.tunggu_resep.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.tunggu_resep.jumlah_pasien ? statusDurationService.tunggu_resep.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: 0.872 * deviceWidth,
                                    height: 0.416 * deviceWidth,
                                    ...MainStyle.bgcolor_primary_blue_light,
                                    borderRadius: 13,
                                    paddingHorizontal: 0.032 * deviceWidth,
                                    paddingVertical: 0.0426 * deviceWidth,
                                    marginRight: 0.0426 * deviceWidth,
                                    marginLeft: 0.064 * deviceWidth,
                                    marginBottom: 0.0426 * deviceWidth,

                                }}>

                                    <Text style={{
                                        ...MainStyle.font_arial_24,
                                        ...MainStyle.color_black,
                                        fontWeight: '700',
                                        textAlign: 'center'
                                    }}>
                                        {statusDurationService.pembuatan_resep.rata2 ? statusDurationService.pembuatan_resep.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_14,
                                        ...MainStyle.color_black,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.0053 * deviceWidth
                                    }}>
                                        Durasi rata-rata pembuatan resep
                                    </Text>
                                    <Text style={{
                                        ...MainStyle.font_arial_12,
                                        ...MainStyle.color_grey_new,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 0.016 * deviceWidth,
                                    }}>
                                        2022-03-10
                                    </Text>

                                    <View style={{
                                        flexDirection: "row"
                                    }}>
                                        <View style={{
                                            width: 0.24333 * deviceWidth
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.pembuatan_resep.jumlah_durasi ? statusDurationService.pembuatan_resep.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...MainStyle.color_black,
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginTop: 0.0053 * deviceWidth
                                            }}>
                                                {statusDurationService.pembuatan_resep.jumlah_pasien ? statusDurationService.pembuatan_resep.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </View>
                            : <View></View>
                    }
                </View>

            </ScrollView>

            {/* <Bottom_nav
                page={1}
                home={() => { props.navigation.replace("home") }}
                order={() => { props.navigation.replace("order") }}
                activity={() => { props.navigation.replace("activity") }}
                profile={() => { props.navigation.replace("profile") }}
            /> */}
        </View>
    )
}
