// libs
import React, { Component, Fragment, useEffect } from 'react';
import { PermissionsAndroid, AppState, Alert, Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { cancelAlarmById } from 'react-native-simple-alarm';
import { useNavigation } from '@react-navigation/native'

// Components
import Home from './src/Home/Home';
import AddAlarms from './src/Home/AddAlarms';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Routes = () => {
    const Navigate = useNavigation();

    useEffect(() => {
        const FsetchOn = async () => {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]);
            }
            
            PushNotification.configure({
                onNotification: async function (notification) {
                    const { message, data, userInteraction } = notification;

                    if (userInteraction) {
                        await cancelAlarmById(
                            Platform.select({ ios: data && data.id, android: notification.id }),
                        );
                        // Actions.Home();
                    }

                    if (notification && !userInteraction) {
                        Alert.alert(message, '', [
                            {
                                text: 'OK',
                                onPress: async () => {
                                    await cancelAlarmById(
                                        Platform.select({
                                            ios: data && data.id,
                                            android: notification.id,
                                        }),
                                    );
                                    // Actions.Home();
                                },
                            },
                        ]);
                    }
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                },
                permissions: {
                    alert: true,
                    badge: true,
                    sound: true,
                },

                popInitialNotification: true,
                requestPermissions: Platform.OS === 'ios',
            })

            AppState.addEventListener('change', _handleAppStateChange);
        }

        FsetchOn();
    }, []);


    const _handleAppStateChange = async (appState) => {
        if (appState === 'active') {
        }

        if (appState === 'background' || appState === 'inactive') {
        }
    };
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='AddAlarms' component={AddAlarms} />
            <Stack.Screen name='EditAlarm' component={AddAlarms} />
        </Stack.Navigator>
    )
}

export default Routes