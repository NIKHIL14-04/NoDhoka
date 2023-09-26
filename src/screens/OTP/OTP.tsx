import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useState, useEffect } from 'react';
import { Colors } from 'NoDhoka/src/theme/Variables';
import{useTheme} from '../../hooks';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTP = () => {
  const {
    Common,
    Fonts,
    Gutters,
    Layout,
    Images,
    darkMode: isDark,
  } = useTheme();
  const [seconds, setSeconds] = useState(30);
  const [Data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    AsyncStorage.getItem('verificationID', (err, result: any) => {
      console.log(result)
    });
  
  }, []);

  const ResendOTP = () => {
    // console.log("hello")
    setSeconds(30);
  };
  const confirm = async (code: any) => {
    console.log('Verifying OTP code:', code);

    var verificationId =
      'AD8T5Iu0YEKAja5tNkkxFksn43RLRkiLCrtRd2Aa4QsWPx8VBuU0hCy0-VEid-dcTzI0GUTrIm86_o1JvkKwtorYrNvETBcXX_tcm_1hRj079wbMA6l9EFmNF1GV7H-lZ6PfM8JcoI1yvQnrJKfyWr6bW5dcZZNuRjhaCGMGEGIYv8W2oWNTcqnwrp0Dbs_hFdhm1xSyKNchDJw4PzrTe36skArc-bl9x4gXqBe2JKPM0nZh-z99lDA';
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code,
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        console.log('success');
      })
      .catch(error => {
        // show an alert in case of error
        console.log(error);
      });
    Alert.alert('Login Successful. Welcome to Dashboard.');
  };

  return (
    <>
      <View style={styles.otpconatiner}>
        <ImageBackground
          source={Images.sparkles.otplg}
          style={styles.imageBackground}
        >
          <TouchableOpacity
            onPress={ResendOTP}
            style={styles.button}
            disabled={seconds == 0 ? false : true}
          >
            <Text
              style={seconds == 0 ? styles.texttitlte : styles.textdisabletitle}
            >
              Resend OTP
            </Text>
          </TouchableOpacity>
          <Text style={seconds == 0 ? styles.textdisable : styles.text}>
            OTP will send after :{' '}
            <Text style={seconds == 0 ? styles.seconddisable : styles.second}>
              {seconds}
            </Text>
          </Text>
          <OTPInputView
            style={styles.otp}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={async code => {
              await confirm(code);
            }}
          />
        </ImageBackground>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {},
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: Colors.success,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.success,
  },
  otpconatiner: {
    backgroundColor: Colors.White,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  otp: {
    backgroundColor: Colors.White,
    display: 'flex',
    height: '100%',
    width: '60%',
  },
  button: {
    marginTop: 120,
  },
  texttitlte: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.success,
  },
  textdisabletitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.grey,
  },
  text: {
    color: Colors.textGray800,
  },
  textdisable: {
    color: Colors.grey,
  },
  second: {
    color: Colors.success,
  },
  seconddisable: {
    color: Colors.grey,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
export default OTP;


// const OTP = () => {

//     const [seconds, setSeconds] = useState(30);
//   const [Data, setData] = useState(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [seconds]);
//   const {
//     Common,
//     Fonts,
//     Gutters,
//     Layout,
//     Images,
//     darkMode: isDark,
//   } = useTheme();

//     const confirm = async (code: any) => {
//     console.log('Verifying OTP code:', code);

    // var verificationId =
    //   'AD8T5Iu0YEKAja5tNkkxFksn43RLRkiLCrtRd2Aa4QsWPx8VBuU0hCy0-VEid-dcTzI0GUTrIm86_o1JvkKwtorYrNvETBcXX_tcm_1hRj079wbMA6l9EFmNF1GV7H-lZ6PfM8JcoI1yvQnrJKfyWr6bW5dcZZNuRjhaCGMGEGIYv8W2oWNTcqnwrp0Dbs_hFdhm1xSyKNchDJw4PzrTe36skArc-bl9x4gXqBe2JKPM0nZh-z99lDA';
    // const credential = firebase.auth.PhoneAuthProvider.credential(
    //   verificationId,
    //   code,
    // );
    // firebase
    //   .auth()
    //   .signInWithCredential(credential)
    //   .then(() => {
    //     console.log('success');
    //   })
    //   .catch(error => {
    //     // show an alert in case of error
    //     console.log(error);
    //   });
    // Alert.alert('Login Successful. Welcome to Dashboard.');
  // };
  
//   useEffect(() => {
//     AsyncStorage.getItem('verificationID', (err, result: any) => {
//       console.log(result,"nikhil")
//     });
  
//   }, []);
//     const ResendOTP = () => {
//     // console.log("hello")
//     setSeconds(30);
//   };
//   return (
//     <>
//           <View style={styles.otpconatiner}>
//         <ImageBackground
//           source={Images.sparkles.otplg}
//           style={styles.imageBackground}
//         >
//           <TouchableOpacity
//             onPress={ResendOTP}
//             style={styles.button}
//             disabled={seconds == 0 ? false : true}
//           >
//             <Text
//               style={seconds == 0 ? styles.texttitlte : styles.textdisabletitle}
//             >
//               Resend OTP
//             </Text>
//           </TouchableOpacity>
//           <Text style={seconds == 0 ? styles.textdisable : styles.text}>
//             OTP will send after :{' '}
//             <Text style={seconds == 0 ? styles.seconddisable : styles.second}>
//               {seconds}
//             </Text>
//           </Text>
//            <OTPInputView
//             style={styles.otp}
//             pinCount={6}
//             autoFocusOnLoad
//             codeInputFieldStyle={styles.underlineStyleBase}
//             codeInputHighlightStyle={styles.underlineStyleHighLighted}
//             onCodeFilled={async code => {
//               await confirm(code);
//             }}
//           />
//           </ImageBackground>
//           </View>
          
//           </>
//   )
// }
// const styles = StyleSheet.create({
//   borderStyleBase: {
//     width: 30,
//     height: 45,
//   },
//   borderStyleHighLighted: {},
//   underlineStyleBase: {
//     width: 30,
//     height: 45,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     color: Colors.success,
//   },

//   underlineStyleHighLighted: {
//     borderColor: Colors.success,
//   },
//   otpconatiner: {
//     backgroundColor: Colors.White,
//     display: 'flex',
//     alignItems: 'center',
//     height: '100%',
//     width: '100%',
//   },
//   otp: {
//     backgroundColor: Colors.White,
//     display: 'flex',
//     height: '100%',
//     width: '60%',
//   },
//   button: {
//     marginTop: 120,
//   },
//   texttitlte: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: Colors.success,
//   },
//   textdisabletitle: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: Colors.grey,
//   },
//   text: {
//     color: Colors.textGray800,
//   },
//   textdisable: {
//     color: Colors.grey,
//   },
//   second: {
//     color: Colors.success,
//   },
//   seconddisable: {
//     color: Colors.grey,
//   },
//   imageBackground: {
//     flex: 1,
//     resizeMode: 'cover',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//   },
// });
// export default OTP

