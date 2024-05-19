import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Share,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import s from '../../styles/main.style';
import { textData, banner_key1, interstitial_key1, language } from '../../Constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
const BadUnitId = banner_key1;
const IadUnitId = interstitial_key1;

const interstitial = InterstitialAd.createForAdRequest(IadUnitId);

const { width, height } = Dimensions.get('window');
const s_language = language;
function wp(percentage) {
  const value = (percentage * width) / 100;
  return Math.round(value);
}
const slideHeight = height * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = width;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const Wishes = props => {
  const [activeIndex, setactiveIndex] = useState(0);

  const [lang, setlang] = useState('English');
  const [iniLang, setiniLang] = useState(lang || 'English');
  const [btnActive, setbtnActive] = useState(false);
  //console.log("RUN",lang);
  const [main, setmain] = useState(textData.English.wishes);
  const onShare = async text => {
    interstitial.load();
    try {
      const result = await Share.share({
        message: text,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onShare(item.text)}
        style={{
          backgroundColor: index % 2 ? '#3975d6' : '#d65039',
          borderRadius: 10,
          minHeight: 400,
          padding: 30,
          justifyContent: 'center',
        }}>
        {/* <Text style={{fontSize: 30}}>{item.title}</Text> */}
        <Text style={{ color: 'white', fontSize: 20 }}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  const setLanguage = data => {
    setiniLang(data);
    setlang(data);
    this.RBSheet.close();
  };

  const confirmLanguage = () => {
    setlang(iniLang);
    //this.RBSheet.close();
  };

  const closeLanguage = () => {
    setiniLang(lang);
    setbtnActive(false);
  };

  useEffect(() => {
    var content = textData[lang].wishes;
    setmain(content);
  }, [lang]);
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
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          width,
          height: 80,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <View style={{ flex: 2 }}>
          <Text style={[s.f22, s.b]}>Messages</Text>
          <Text style={[s.f14]}>Tap any card to share.</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 10 }}>
          <TouchableOpacity
            //onPress={()=>props.navigation.navigate('Settings',{inner:true})}
            onPress={() => {
              setiniLang(lang);
              this.RBSheet.open();
            }}
            style={{
              width: 80,
              height: 40,
              backgroundColor: '#a3a3a356',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 24,
            }}>
            <Text style={s.b}>{lang}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BannerAd unitId={BadUnitId} size={BannerAdSize.FULL_BANNER} />
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <View>
          <Carousel
            data={main}
            renderItem={_renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            contentContainerCustomStyle={{ alignItems: 'center' }}
            inactiveSlideScale={0.85}
            inactiveSlideOpacity={0.7}
          />
        </View>
      </View>
      <RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
        openDuration={250}
        onClose={closeLanguage}>
        <View style={[s.pdtp10, { flexDirection: 'column', padding: 20, display: "flex", flex: 1 }]}>
          <View style={[{ flex: 1 }]}>
            <Text style={[s.f24, s.b, s.textCenter, { lineHeight: 35 }]}>
              Select Your Preferred {'\n'}Language
            </Text>
          </View>

          <View style={[s.pdlt20, s.row, s.aSCenter, { flexWrap: 'wrap', justifyContent: "space-between" }]}>
            {s_language.map((data, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setLanguage(data);
                  }}
                  key={i}
                  style={[
                    iniLang === data
                      ? { borderWidth: 2, borderColor: 'cornflowerblue' }
                      : { borderWidth: 2, borderColor: '#d3d3d3' },
                    {
                      width: "30%",
                      height: 40,
                      borderRadius: 24,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 10
                    },
                  ]}>
                  <Text>{data}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default Wishes;

const styles = StyleSheet.create({
  shadow: {
    overflow: 'hidden',
    shadowColor: '#d3d3d3',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});
