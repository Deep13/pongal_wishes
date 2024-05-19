import * as React from 'react';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import StickerScreen from './TabScreens/stickers';
import Wishes from './TabScreens/wishes';
import InspiringImages from './TabScreens/Images';

import storeData from '../methods/store';
import getData from '../methods/read';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  React.useEffect(()=>{
    storeData('@initialRender',{type:true});
    getData('@language').then(data=>console.log(data))
    .catch(e=>console.log(e));
  },[])
  return (
      <Tab.Navigator initialRouteName='Wish'>
        <Tab.Screen name="Wish"   options={{headerShown:false,tabBarLabel:"Wish",tabBarIcon:({color})=>(
          <Icon name="text-long" color={color} size={30} />
        )}} >
          {(props)=><Wishes {...props} lang={'Hindi'} />}
          </Tab.Screen>
        <Tab.Screen name="InspiringImages"  options={{headerShown:false,tabBarLabel:"Image",tabBarIcon:({color})=>(
          <Icon name="image-outline" color={color} size={30} />
        )}}>
          {(props)=><InspiringImages {...props} />}
          </Tab.Screen>
        
        <Tab.Screen name="Stickers" component={StickerScreen}  options={{headerShown:false,tabBarLabel:"Stickers",tabBarIcon:({color})=>(
          <Icon name="sticker-emoji" color={color} size={30} />
        )}}  />
      </Tab.Navigator>
  );
}