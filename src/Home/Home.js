import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';

// Components
import NavBar from '../Common/NavBar';
import AlarmList from './AlarmList';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const Navigate = useNavigation();
  
  const handleAddAlarm = () => {
    Navigate.navigate('AddAlarms')
  };

  return (
    <View style={styles.container}>
      <NavBar
        title="Alarms"
        rightButtonIcon="plus"
        onRightButtonPress={handleAddAlarm}
      />

      <SafeAreaView style={styles.container}>
        <AlarmList />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default Home;
