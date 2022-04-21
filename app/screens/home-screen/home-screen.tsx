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

            <ScrollView showsVerticalScrollIndicator={false}>

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
                        Pasien & Kunjungan
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
                                25
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
                                25
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
                                21
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Registrasi Aktif
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
                                25
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
                                25
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
                                14
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
                                44
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
                                21
                            </Text>
                            <Text style={{
                                ...MainStyle.font_arial_14,
                                ...MainStyle.color_black,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 0.0053 * deviceWidth
                            }}>
                                Registrasi Aktif
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
                                25
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
                                25
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

                    <View style={{ height: 0.0533 * deviceWidth }} />
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
                            1 menit 15 detik
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
                                width: 0.21333 * deviceWidth
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
                                width: 0.576 * deviceWidth,
                                alignItems: 'flex-end'
                            }}>
                                <Text style={{
                                    ...MainStyle.font_arial_14,
                                    ...MainStyle.color_black,
                                    fontWeight: '400',
                                    textAlign: 'center',
                                    marginTop: 0.0053 * deviceWidth
                                }}>
                                    17 menit 30 detik
                                </Text>
                                <Text style={{
                                    ...MainStyle.font_arial_14,
                                    ...MainStyle.color_black,
                                    fontWeight: '400',
                                    textAlign: 'center',
                                    marginTop: 0.0053 * deviceWidth
                                }}>
                                    14
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
                            1 menit 15 detik
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
                                width: 0.21333 * deviceWidth
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
                                width: 0.576 * deviceWidth,
                                alignItems: 'flex-end'
                            }}>
                                <Text style={{
                                    ...MainStyle.font_arial_14,
                                    ...MainStyle.color_black,
                                    fontWeight: '400',
                                    textAlign: 'center',
                                    marginTop: 0.0053 * deviceWidth
                                }}>
                                    17 menit 30 detik
                                </Text>
                                <Text style={{
                                    ...MainStyle.font_arial_14,
                                    ...MainStyle.color_black,
                                    fontWeight: '400',
                                    textAlign: 'center',
                                    marginTop: 0.0053 * deviceWidth
                                }}>
                                    14
                                </Text>
                            </View>

                        </View>
                    </TouchableOpacity>

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
