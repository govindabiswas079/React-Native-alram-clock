// libs
import React, { Component, useEffect, useState } from 'react';
import { Alert, Text, Dimensions, Image, View, TouchableOpacity, StyleSheet, } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
// import {Actions} from 'react-native-router-flux';
import RadioForm from 'react-native-simple-radio-button';
import moment from 'moment';
import { cancelAlarmById, activateAlarmById, deleteAlarmById, getAlarms, } from 'react-native-simple-alarm';

// Global
import { Colors, Convert } from '../styles';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const AlarmList = () => {
  const Navigate = useNavigation();
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const GetList = async () => {
      const alarms = await getAlarms();
      // eslint-disable-next-line react/no-did-mount-set-state
      setAlarms(alarms)
    }
    GetList()
  }, []);

  const confirmDeletePress = (data, rowRef) => {
    Alert.alert('Are you sure?', 'Your alarm will be deleted', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => handleDeletePress(data, rowRef),
      },
    ]);
  };

  const handleAlarmActivation = (value, alarm) => {
    if (value === 0) {
      cancelAlarmById(alarm.id);
    } else if (value === 1) {
      activateAlarmById(alarm.id);
    }
  };

  const renderAlarms = ({ item }) => {
    const radio_props = [
      { label: 'On', value: 1 },
      { label: 'Off', value: 0 },
    ];

    if (!item) {
      return null;
    }
    return (
      <View style={styles.alarmContainer}>
        <View style={styles.radioContainer}>
          <View style={styles.alarm}>
            <TouchableOpacity onPress={() => Navigate.navigate({ name: 'EditAlarm', params: { edit: item } })} /* onPress={() => Actions.EditAlarm({ edit: item })} */>
              <Text style={{ fontSize: Convert(40), color: '#000000', paddingLeft: Convert(10) }}>
                {moment(item.date).format('hh:mm A')}
              </Text>
            </TouchableOpacity>

            <RadioForm
              radio_props={radio_props}
              labelColor={'gray'}
              onPress={(value) => handleAlarmActivation(value, item)}
              formHorizontal={true}
              animation={true}
              initial={item.active ? 0 : 1}
              radioStyle={{ paddingRight: Convert(13) }}
              style={{ marginLeft: Convert(60) }}
            />
          </View>

          <View style={styles.messageView}>
            <Text style={{ color: '#000000', }}>{item?.message}</Text>
          </View>
        </View>
      </View >
    );
  };

  const handleDeletePress = async (data, rowRef) => {
    const { item } = data;
    await cancelAlarmById(item.id);
    const updatedAlarms = await deleteAlarmById(item.id);
    setAlarms(updatedAlarms)
    if (rowRef) {
      rowRef.manuallySwipeRow(0);
    }
  };

  return (
    <SwipeListView
      style={{
        width: width,
        height: height,
        backgroundColor: Colors.lightGray,
      }}
      data={alarms}
      renderItem={renderAlarms}
      keyExtractor={(item, index) => `list-item-${index}`}
      renderHiddenItem={(data, rowMap) => (
        <View style={styles.deleteView}>
          <TouchableOpacity
            onPress={() =>
              confirmDeletePress(data, rowMap[data.item.key])
            }>
            <Image
              style={{
                height: Convert(60),
                width: Convert(60),
              }}
              source={require('../../assets/images/trash.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-75}
    />
  )
}

const styles = StyleSheet.create({
  alarmContainer: {
    height: Convert(100),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderStyle: 'solid',
    borderColor: 'rgba(235, 235,235, 1)',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    backgroundColor: 'white',
  },
  alarm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  messageView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteView: {
    alignSelf: 'flex-end',
    marginRight: Convert(10),
    marginTop: Convert(5),
    padding: Convert(11),
    backgroundColor: 'red',
  },
});

export default AlarmList