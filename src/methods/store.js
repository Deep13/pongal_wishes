import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key,obj) => {
    try {
      const jsonValue = JSON.stringify(obj)
      await AsyncStorage.setItem(key, jsonValue)
      return true;
    } catch (e) {
      return false;
   }
}

export default storeData;