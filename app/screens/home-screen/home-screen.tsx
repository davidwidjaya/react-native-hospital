import React, { useState, useEffect } from 'react';
import { DrawerActions, ParamListBase, useIsFocused } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { useStores } from "@models/root-store"
import Spinner from 'react-native-loading-spinner-overlay';
import { MainStyle, Styles, Images, Helper } from "@theme"
import '../../../global.js'
import { Sidebar, Textbox, Button_big, Bottom_nav, Searchbox, Menuitem } from "@components"
import { Dimensions, View, Text, ToastAndroid, ScrollView, AsyncStorage, Alert, Image, TextInput, TouchableOpacity, RefreshControl } from "react-native"
import { values } from 'mobx';
import DropDownPicker from 'react-native-dropdown-picker';
import { async } from 'validate.js';


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

    const [refreshing, setRefreshing] = useState(false);

    const toogle = props.navigation.dispatch(DrawerActions.openDrawer());

    const open = () => {
        console.log('clicked opendraw...');
        const drawerNavigation = props.navigation.getParent("RootDrawer");
        console.log(drawerNavigation);
        drawerNavigation?.openDrawer();
    }

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
            setSpinner(false);
            Alert.alert(
                'Ooops...',
                result.message.toString(),
                [
                    { text: 'OK', onPress: () => props.navigation.replace('primaryStack', { screen: 'login' }) }
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
            props.navigation.replace('primaryStack', { screen: 'login' });
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

            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getDashboard}
                    />
                }
            >

                <View style={{
                    flexDirection: "row",
                    marginTop: 0.14666 * deviceWidth,
                    alignItems: "flex-end",
                    width: deviceWidth,
                    justifyContent: 'flex-end',
                    paddingRight: 0.0746 * deviceWidth
                }}>
                    <TouchableOpacity
                        onPress={() => open()}
                        style={{
                            width: 0.0826 * deviceWidth,
                            height: 0.0966 * deviceWidth,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image source={Images.hamburger_icon} />
                    </TouchableOpacity>

                </View>
                <Text style={{
                    ...Styles.dashboard_header_title
                }}>
                    Dashboard
                </Text>

                <View>
                    <Text style={{
                        ...Styles.dashboard_subheader_title
                    }}>
                        Pasien & Kunjungan Harian
                    </Text>
                    <View style={{ height: 0.0533 * deviceWidth }} />

                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{
                        marginLeft: 0.064 * deviceWidth,
                        marginRight: 0.064 * deviceWidth,

                    }}>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {visitDays.total_pasien ? visitDays.total_pasien : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text
                            }}>
                                Total Kunjungan
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper

                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {visitDays.pria ? visitDays.pria : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text
                            }}>
                                Pria
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {visitDays.wanita ? visitDays.wanita : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text
                            }}>
                                Wanita
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {visitDays.pasien_baru ? visitDays.pasien_baru : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Pasien Baru
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {visitDays.pasien_kontrol ? visitDays.pasien_kontrol : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Pasien Kontrol
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>


                    </ScrollView>

                </View>
                <View>
                    <Text style={{
                        ...Styles.dashboard_subheader_title
                    }}>
                        Pasien & Kunjungan Bulanan
                    </Text>
                    <View style={{ height: 0.0533 * deviceWidth }} />

                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{
                        marginLeft: 0.064 * deviceWidth,
                        marginRight: 0.064 * deviceWidth,

                    }}>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {visitMonth.total_pasien ? visitMonth.total_pasien : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Total Kunjungan
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {visitMonth.pria ? visitMonth.pria : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Pria
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {visitMonth.wanita ? visitMonth.wanita : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Wanita
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {visitMonth.pasien_baru ? visitMonth.pasien_baru : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Pasien Baru
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {visitMonth.pasien_kontrol ? visitMonth.pasien_kontrol : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Pasien Kontrol
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>


                    </ScrollView>

                </View>
                <View>
                    <Text style={{
                        ...Styles.dashboard_subheader_title
                    }}>
                        Transaksi
                    </Text>

                    <View style={{ height: 0.0533 * deviceWidth }} />
                    <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={{
                        marginLeft: 0.064 * deviceWidth,
                        marginRight: 0.064 * deviceWidth,

                    }}>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {orderLabo}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Order Laboratorium
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {orderRadio}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Order Radiologi
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {summaryRegistration.total_pending_rajal ? summaryRegistration.total_pending_rajal : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Pending Rajal
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {summaryRegistration.total_aktif_rajal ? summaryRegistration.total_aktif_rajal : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Total Aktif Rajal
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {summaryRegistration.total_pending_ranap ? summaryRegistration.total_pending_ranap : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Total Pending Ranap
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            ...Styles.dashboard_item_wrapper
                        }}>

                            <Text style={{
                                ...Styles.dashboard_itemcount_text
                            }}>
                                {summaryRegistration.total_reg_aktif ? summaryRegistration.total_reg_aktif : 0}
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_desc_text

                            }}>
                                Total Regis Aktif
                            </Text>
                            <Text style={{
                                ...Styles.dashboard_item_date_text
                            }}>
                                2022-03-10
                            </Text>
                        </TouchableOpacity>


                    </ScrollView>

                </View>

                <View>
                    <Text style={{
                        ...Styles.dashboard_subheader_title
                    }}>
                        Durasi
                    </Text>
                    <View style={{ height: 0.0533 * deviceWidth }} />

                    {
                        (statusDurationService !== undefined && statusDurationService !== null) ?
                            <View>
                                <TouchableOpacity style={{
                                    ...Styles.dashboard_duration_wrapper_text
                                }}>

                                    <Text style={{
                                        ...Styles.dashboard_duration_average_text

                                    }}>
                                        {statusDurationService.tunggu_di_cs.rata2 ? statusDurationService.tunggu_di_cs.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...Styles.dashboard_duration_desc_text
                                    }}>
                                        Durasi rata-rata tunggu di CS
                                    </Text>
                                    <Text style={{
                                        ...Styles.dashboard_item_date_text
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
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text

                                            }}>
                                                {statusDurationService.tunggu_di_cs.jumlah_durasi ? statusDurationService.tunggu_di_cs.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.tunggu_di_cs.jumlah_pasien ? statusDurationService.tunggu_di_cs.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    ...Styles.dashboard_duration_wrapper_text
                                }}>

                                    <Text style={{
                                        ...Styles.dashboard_duration_average_text
                                    }}>
                                        {statusDurationService.pelayanan_di_cs.rata2 ? statusDurationService.pelayanan_di_cs.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...Styles.dashboard_duration_desc_text
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
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.pelayanan_di_cs.jumlah_durasi ? statusDurationService.pelayanan_di_cs.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.pelayanan_di_cs.jumlah_pasien ? statusDurationService.pelayanan_di_cs.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    ...Styles.dashboard_duration_wrapper_text
                                }}>

                                    <Text style={{
                                        ...Styles.dashboard_duration_average_text
                                    }}>
                                        {statusDurationService.tunggu_di_poli.rata2 ? statusDurationService.tunggu_di_poli.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...Styles.dashboard_duration_desc_text
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
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.tunggu_di_poli.jumlah_durasi ? statusDurationService.tunggu_di_poli.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.tunggu_di_poli.jumlah_pasien ? statusDurationService.tunggu_di_poli.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    ...Styles.dashboard_duration_wrapper_text
                                }}>

                                    <Text style={{
                                        ...Styles.dashboard_duration_average_text
                                    }}>
                                        {statusDurationService.pelayanan_di_poli.rata2 ? statusDurationService.pelayanan_di_poli.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...Styles.dashboard_duration_desc_text
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
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.pelayanan_di_poli.jumlah_durasi ? statusDurationService.pelayanan_di_poli.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.pelayanan_di_poli.jumlah_pasien ? statusDurationService.pelayanan_di_poli.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    ...Styles.dashboard_duration_wrapper_text
                                }}>

                                    <Text style={{
                                        ...Styles.dashboard_duration_average_text
                                    }}>
                                        {statusDurationService.tunggu_resep.rata2 ? statusDurationService.tunggu_resep.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...Styles.dashboard_duration_desc_text
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
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.tunggu_resep.jumlah_durasi ? statusDurationService.tunggu_resep.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...MainStyle.font_arial_14,
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.tunggu_resep.jumlah_pasien ? statusDurationService.tunggu_resep.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    ...Styles.dashboard_duration_wrapper_text
                                }}>

                                    <Text style={{
                                        ...Styles.dashboard_duration_average_text
                                    }}>
                                        {statusDurationService.pembuatan_resep.rata2 ? statusDurationService.pembuatan_resep.rata2 : 0}
                                    </Text>
                                    <Text style={{
                                        ...Styles.dashboard_duration_desc_text
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
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Durasi
                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                Total Pasien
                                            </Text>

                                        </View>
                                        <View style={{
                                            width: 0.566 * deviceWidth,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.pembuatan_resep.jumlah_durasi ? statusDurationService.pembuatan_resep.jumlah_durasi : 0}

                                            </Text>
                                            <Text style={{
                                                ...Styles.dashboard_option_desc_text
                                            }}>
                                                {statusDurationService.pembuatan_resep.jumlah_pasien ? statusDurationService.pembuatan_resep.jumlah_pasien : 0}

                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </View>
                            : <View></View>
                    }
                </View >

            </ScrollView >
        </View >
    )
}
