import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import image_base from '../../images.json';
import { banner_key2 } from '../../Constants';
import {
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

import s from '../../styles/main.style';
const BadUnitId = banner_key2;
const { width, height } = Dimensions.get('window');
const InspiringImages = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={image_base.wishes}
        numColumns={2}
        columnWrapperStyle={{ flex: 1 }}
        ListHeaderComponent={() => {
          return (
            <View>
              <View
                style={{
                  flex: 1,
                  height: 80,
                  justifyContent: 'center',
                  paddingLeft: 10,
                }}>
                <Text style={[s.f22, s.b]}>Cards</Text>
                <Text style={[s.f14]}>Tap any card to share.</Text>
              </View>
              <BannerAd unitId={BadUnitId} size={BannerAdSize.FULL_BANNER} />
            </View>
          );
        }}
        renderItem={(itemData, i) => {
          //console.log('eerer',itemData.item.id%2)
          return (
            <View style={{ flex: 0.5, margin: 10, }}>
              <TouchableOpacity
                style={{ flex: 1, height: width / 2, }}
                activeOpacity={0.8}
                onPress={() => {
                  //onShare(itemData.item.data_url)
                  navigation.navigate('FullImage', {
                    img: itemData.item.data_url,
                  });
                }}>
                <Image
                  style={{ height: "auto", flex: 1, borderRadius: 10 }}
                  source={{ uri: itemData.item.data_url }}
                  onLoad={() => console.log('Image loaded')}
                />

              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingLeft: 4,
    backgroundColor: '#FFF',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 6,
  },
  title: {
    fontSize: 32,
  },
});

export default InspiringImages;
