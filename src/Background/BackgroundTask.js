import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Linking, PermissionsAndroid, Platform, ScrollView, StyleSheet, Switch, Text, ToastAndroid, View, AppState } from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

export default function App() {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [forceLocation, setForceLocation] = useState(true);
    const [highAccuracy, setHighAccuracy] = useState(true);
    const [locationDialog, setLocationDialog] = useState(true);
    const [significantChanges, setSignificantChanges] = useState(false);
    const [observing, setObserving] = useState(false);
    const [foregroundService, setForegroundService] = useState(false);
    const [useLocationManager, setUseLocationManager] = useState(false);
    const [location, setLocation] = useState(null);
    const watchId = useRef(null);

    const getLocation = async () => {
        await Geolocation.getCurrentPosition(
            position => {
                setLocation(position);
                console.log(position);
            },
            error => {
                Alert.alert(`Code ${error.code}`, error.message);
                setLocation(null);
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: highAccuracy,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: forceLocation,
                forceLocationManager: useLocationManager,
                showLocationDialog: locationDialog,
            },
        );
    };

    const getLocationUpdates = async () => {
        await Geolocation.watchPosition(
            position => {
                setLocation(position);
                console.log(position);
            },
            error => {
                setLocation(null);
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: highAccuracy,
                distanceFilter: 0,
                interval: 1000,
                fastestInterval: 2000,
                forceRequestLocation: forceLocation,
                forceLocationManager: useLocationManager,
                showLocationDialog: locationDialog,
                useSignificantChanges: significantChanges,
            },
        );
    };

    useEffect(() => {
        getLocationUpdates()
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                // console.log('App has come to the foreground!');
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            getLocationUpdates()
        });

        return () => {
            subscription.remove();
        };
    }, []);
    return (
        <View style={styles.mainContainer}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.result}>
                    <Text style={{ color: '#000000' }}>Latitude: {location?.coords?.latitude || ''}</Text>
                    <Text style={{ color: '#000000' }}>Longitude: {location?.coords?.longitude || ''}</Text>
                    <Text style={{ color: '#000000' }}>Heading: {location?.coords?.heading}</Text>
                    <Text style={{ color: '#000000' }}>Accuracy: {location?.coords?.accuracy}</Text>
                    <Text style={{ color: '#000000' }}>Altitude: {location?.coords?.altitude}</Text>
                    <Text style={{ color: '#000000' }}>Altitude Accuracy: {location?.coords?.altitudeAccuracy}</Text>
                    <Text style={{ color: '#000000' }}>Speed: {location?.coords?.speed}</Text>
                    <Text style={{ color: '#000000' }}>Provider: {location?.provider || ''}</Text>
                    <Text style={{ color: '#000000' }}>
                        Timestamp:{' '}
                        {location?.timestamp
                            ? new Date(location.timestamp).toLocaleString()
                            : ''}
                    </Text>
                </View >
            </ScrollView >
        </View >
    );
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    contentContainer: {
        padding: 12,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 12,
    },
    result: {
        borderWidth: 1,
        borderColor: '#666',
        width: '100%',
        padding: 10,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 12,
        width: '100%',
    },
});