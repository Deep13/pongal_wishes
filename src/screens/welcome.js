import React from 'react'
import { Dimensions, View, Image, Text, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import s from '../styles/main.style'

const { width, height } = Dimensions.get('window');

const Welcome = ({ navigation }) => {

    const linkTo = () => navigation.navigate('Home');

    return (
        <View style={[s.fl1, { flexDirection: 'column' }]}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ImageBackground style={{ flex: 1, justifyContent: "flex-end" }} source={require("../assets/bg.jpg")}>
                <View style={{ backgroundColor: "white", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[{ fontSize: 28 }, s.b]}>Welcome</Text>
                    </View>
                    <Text numberOfLines={3} style={[s.f22, s.pdtp10, { fontWeight: '400' }]}>Get the best wishes for festival,{'\n'}right in one place.</Text>
                    <TouchableOpacity onPress={linkTo} style={[s.buttonSecondary, s.mdtp30]}>
                        <Text style={[s.cllight, s.f18, s.b]}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Welcome;