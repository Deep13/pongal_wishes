/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './src/screens/welcome';
import Tabs from './src/screens/tabs';
import ImageView from './src/screens/imageview';

import getData from './src/methods/read';

const Stack = createNativeStackNavigator();

const Begin = ({ onBoard }) => {
  const [lang, setlang] = useState('English');
  useEffect(() => {
    getData('@language').then(data => {
      if (data === null) return;
      setlang(data.type);
    })
      .catch(e => console.log(e));
  }, [])
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName={onBoard ? "Welcome" : "Home"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="FullImage" component={ImageView} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

const Loading = () => {
  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignContent: 'center' }]}>
      <ActivityIndicator size={'large'} color={'cornflowerblue'} />
    </View>
  )
}

const App = () => {
  const [isLoading, setisLoading] = useState(true);
  const [onBoard, setonBoard] = useState(true);
  useEffect(() => {
    getData('@initialRender').then(d => {
      if (d === null) {
        console.log('Not rendered before');
        setonBoard(true);
        setisLoading(false);
      } else {
        console.log("rendered already");
        setonBoard(false);
        setisLoading(false);
      }
    }).catch(e => {
      console.log(e);
      setisLoading(false);
      setonBoard(false);
    })
  }, [])
  return (
    <>
      {
        isLoading ? <Loading /> : <Begin onBoard={onBoard} />
      }
    </>
  )
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
