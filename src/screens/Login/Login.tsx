import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { useTheme } from '../../hooks';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: ApplicationScreenProps) => {
  const {
    Common,
    Fonts,
    Gutters,
    Layout,
    Images,
    darkMode: isDark,
  } = useTheme();
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput | null>(null);
  const handleValidation = async () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    // var confirmation = await auth().signInWithPhoneNumber(`+91 ${value}`);
    // console.log(confirmation.verificationId)
    // if (confirmation.verificationId !== null) {
    //   var verify_data = {
    //     verify_id:confirmation.verificationId ,
    //     mobile_num: value,
    //   };
    //   try {
    //     await AsyncStorage.setItem('verificationID',confirmation.verificationId);
    //     console.log('save data');
    //   } catch (e) {}
    // }
    setShowMessage(true);
    setValid(checkValid ? checkValid : false);
    console.log(value);

    if (checkValid) {
      Alert.alert('Message', 'OTP has been sent to your mobile number', [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('Main', {
              screen: 'Home',
            }),
        },
      ]);
    }
  };

  return (
    <View style={styles.MainContainer}>
      <ImageBackground
        source={Images.sparkles.bglg}
        style={styles.imageBackground}
      >
        <SafeAreaView>
          <PhoneInput
            ref={phoneInput}
            // containerStyle={{ backgroundColor: 'black'}}
            defaultValue={value}
            defaultCode="IN"
            layout="first"
            // textContainerStyle={{backgroundColor: 'transparent'}}
            // textInputStyle={}
            onChangeText={text => {
              setValue(text);
              setValid(false);
              setShowMessage(false);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
          {showMessage && !valid && (
            <Text style={styles.errormessage}>
              Please enter valid phone number
            </Text>
          )}
          <TouchableOpacity onPress={handleValidation} style={styles.button}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  errormessage: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgb(0,191,99)',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;

