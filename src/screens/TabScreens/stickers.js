import React, { useEffect } from 'react';
import {
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import s from '../../styles/main.style';
import RNWhatsAppStickers from 'react-native-whatsapp-stickers';
import { banner_key3, interstitial_key3, day_title } from '../../Constants';
import sticker_base from '../../stickers.json';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
const BadUnitId = banner_key3;
const IadUnitId = interstitial_key3;
const interstitial = InterstitialAd.createForAdRequest(IadUnitId);
const { width, height } = Dimensions.get('window');
const StickerScreen = () => {
  const arrList = sticker_base.wishes;
  const openShare = () => {
    interstitial.load();
    RNWhatsAppStickers.isWhatsAppAvailable()
      .then(isAvailable => {
        if (isAvailable) {
          return RNWhatsAppStickers.send(
            'festivalidentifier',
            'Pongal Wishes',
          );
        }
        return undefined;
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    // Start loading the interstitial straight away
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          height: 80,
          justifyContent: 'center',
          paddingLeft: 10,
        }}>
        <Text style={[s.f22, s.b]}>Stickers</Text>
        <Text style={[s.f14]}>Express yourself with stickers.</Text>
      </View>

      <BannerAd unitId={BadUnitId} size={BannerAdSize.FULL_BANNER} />
      <View style={[s.mdtp20, s.pdlt10]}>
        <View style={s.row}>
          <View style={[s.fl1, s.jCenter, s.mdtp10]}>
            <Text style={[{ fontSize: 20 }, s.b]}>{day_title}</Text>
            <Text style={[{ fontSize: 12 }]}>Add sticker pack</Text>
          </View>
          <View style={s.fl1}>
            <TouchableOpacity
              onPress={openShare}
              style={{
                width: 140,
                height: 45,
                backgroundColor: 'lightgreen',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginRight: 20,
                marginTop: 10,
                borderRadius: 5,
              }}>
              <Text style={[s.f14, s.b]}>Send to Whatsapp</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[s.row, s.jStart, s.pdtp20, { flexWrap: 'wrap' }]}>
          {arrList.map((data, i) => {
            console.log(data.id);
            return (
              <View
                key={i}
                style={{
                  width: width / 3.5,
                  height: 110,
                  marginRight: 10,
                  marginTop: 20,
                  borderColor: '#d3d3d3',
                  borderWidth: 2,
                  borderRadius: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{ uri: data.data_url }}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            );
          })}
        </View>
        <View style={[s.mdtp30, { marginRight: 30 }]}></View>
      </View>
    </ScrollView>
  );
};

export default StickerScreen;
