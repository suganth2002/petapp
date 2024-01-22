import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const Splash = () => {
    const nav = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            nav.replace('Welcome')
        }, 2000)

    }, []);

    return (
        <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
            <StatusBar style='auto' />
            <View><Image
                style={{ width: 400, height: 400 }}
                source={require("../assets/petpal.png")} />
            </View>

        </View>
    )
}

export default Splash;