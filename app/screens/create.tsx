import { Image } from 'expo-image';
import { Button, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from 'expo-router';

interface iConfig { title: string, time: number, earlyWarning: number }
interface iOption { value: string, label: string }
export default function CreateScreen() {
  const navigation = useNavigation();

  navigation.setOptions({ title: "Create time box" })
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [breakPoints, setBreakPoints] = useState<number>(0);
  const hoursOptions = [];
  const minuteOptions = [];
  const secondOptions = [];
  const [breakPointConfigs, setBreakPointConfigs] = useState<iConfig[]>([])
  for (let index = 0; index < 24; index++) {
    hoursOptions.push({ label: index + " hours", value: index + "" });
  }

  for (let index = 0; index < 60; index++) {
    minuteOptions.push({ label: index + "minutes", value: index.toString() });
    secondOptions.push({ label: index + "seconds", value: index.toString() });
  }

  useEffect(() => {
    const blankConfigs: iConfig[] = [];
    for (let index = 0; index < breakPoints; index++) {
      blankConfigs.push({ earlyWarning: 10, time: 0, title: "Set title!" })

    }
    setBreakPointConfigs(blankConfigs)
  }, [breakPoints])
  function save() {
    const RandomUUID = uuid.v4();

  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerHeight={100}
      headerImage={
        <IconSymbol
          size={80}
          color="#808080"
          name="calendar"
          style={{ ...styles.headerImage }}
        />
      }>
      <ThemedText>This page will help you create time based reminder paterns that are reusable.</ThemedText>

      <Collapsible title="Configure full time" disabled={false}>
        <View>
          <ThemedText>Hours</ThemedText>
          <Picker
            selectedValue={hoursOptions[0]}
            onValueChange={(itemValue, itemIndex) =>
              setHours(+itemValue.value)
            }>
            {
              hoursOptions.map(item => <Picker.Item key={item.value} label={item.label} value={+item.value} />)
            }
          </Picker>
        </View>
        <View>
          <ThemedText>Minutes</ThemedText>
          <Picker
            selectedValue={minuteOptions[0]}
            onValueChange={(itemValue, itemIndex) =>
              setMinutes(+itemValue.value)
            }>
            {
              minuteOptions.map(item => <Picker.Item key={item.value} label={item.label} value={+item.value} />)
            }
          </Picker>
        </View>
        <View>
          <ThemedText>Seconds</ThemedText>
          <Picker
            selectedValue={secondOptions[0]}
            onValueChange={(itemValue, itemIndex) =>
              setSeconds(+itemValue.value)
            }>
            {
              secondOptions.map(item => <Picker.Item key={item.value} label={item.label} value={+item.value} />)
            }
          </Picker>
        </View>
      </Collapsible>

      <Collapsible title='Set amout of breaks' disabled={false}>
        <TextInput keyboardType='number-pad' value={breakPoints + ""} onChange={e => setBreakPoints(+e.nativeEvent.text.replace(/[^0-9]/g, ''))} />

      </Collapsible>
      <Collapsible title='Configure breakpoints' disabled={breakPoints <= 0}>

        {
          breakPointConfigs.map((bp, index) => {
            return (
              <View style={{ height: "auto" }}>
                <Collapsible title={bp.title} disabled={false}>
                  <View style={{ flexBasis: 3, flex: 3, flexDirection: "row" }}>
                    <View style={{ flex: 1 }} >
                      <ThemedText>Hours</ThemedText>
                      <Picker onValueChange={(e: iOption) => {
                        const bpcopies = breakPointConfigs
                        bpcopies[index].time = +e.value
                        setBreakPointConfigs(bpcopies)
                      }}>
                        <Picker.Item value={5} label='test'></Picker.Item>
                      </Picker>
                    </View>
                    <View style={{ flex: 1 }} >
                      <ThemedText>Hours</ThemedText>
                      <Picker style={{ flex: 1 }} onValueChange={(e: iOption) => {
                        const bpcopies = breakPointConfigs
                        bpcopies[index].time = +e.value
                        setBreakPointConfigs(bpcopies)
                      }}>
                        <Picker.Item value={5} label='test'></Picker.Item>
                      </Picker>
                    </View>
                    <View style={{ flex: 1 }} >
                      <ThemedText>Hours</ThemedText>
                      <Picker style={{ flex: 1 }} onValueChange={(e: iOption) => {
                        const bpcopies = breakPointConfigs
                        bpcopies[index].time = +e.value
                        setBreakPointConfigs(bpcopies)
                      }}>
                        <Picker.Item value={5} label='test'></Picker.Item>
                      </Picker>
                    </View>
                  </View>
                </Collapsible>
                <View style={{ width: "100%", height: 2, borderBottomColor: "#ddd", borderBottomWidth: 2 }}></View>
              </View>
            );
          })
        }

      </Collapsible>
      <View style={{
        position: "relative",
        alignContent: "center",
        alignSelf: "center",
        bottom: 0,
        height: 80,
        backgroundColor: "white",
        borderTopColor: "gray",
        borderTopWidth: 2,
        width: '40%'
      }}>
        <Button title='Save' onPress={save}></Button>
      </View>
    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: 0,
    left: 5,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
