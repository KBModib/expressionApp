import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ImageBackground, Platform } from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../firebase';
import firebase from 'firebase/compat/app';

const Login = ({ navigation }) => {

   const [phoneNumber, setPhoneNumber] = useState('');
   const [code, setCode] = useState('');
   const [verificationId, setVerificationId] = useState(null);
   const recaptchaVerifier = useRef(null);
   const sendVerification = () => {
    
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then(setVerificationId);
        setPhoneNumber('');
   };
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
        .then(() => {
            setCode('')
        })
        .catch((error) => {
            // show an alert in case of error
            alert(error)
        })
        Alert.alert(
            'Login Successful. Welcome To Your Expressions Journal',
        );
        navigation.navigate('Home');
  }
    return(
        <View style={styles.container}>
            <ImageBackground 
            source={require('../assets/background.png')}
            style={styles.image}
            ></ImageBackground>
            <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification={true}
            />
            <Text style={styles.otpText}>
                Login using OTP
            </Text>
            <TextInput
                placeholder='Enter your phone number with your dialling code'
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
                autoCompleteType='tel'
                style={styles.TextInput}
                />
                <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                    <Text style={styles.buttonText}>
                        Send OTP
                    </Text>
                </TouchableOpacity>
                <TextInput
                placeholder='Confirm code'
                onChangeText={setCode}
                keyboardType='number-pad'
                style={styles.TextInput}
                />
                       <TouchableOpacity style={styles.sendCode}
                       onPress = {confirmCode}>
                    <Text style={styles.buttonText}>
                        Confirm Login
                    </Text>
                </TouchableOpacity>
        </View>
    )
 }
export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EED6D3',
    },
    otpText: {
        fontSize: 25,
        color: '#67595E',
        marginTop: -120,
        padding: 20,        
    },
    TextInput: {
        width: '80%',
        height: 45,
        borderColor: '#67595E',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        color: '#67595E',
        fontSize: 11,
    },
    sendVerification: {
        width: '25%',
        height: 40,
        borderColor: '#67595E',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
        backgroundColor: '#E8B4B8',
        borderRadius: 5,
        color: '#67595E',
    },
    sendCode: {
        width: '30%',
        height: 40,
        borderColor: '#67595E',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
        backgroundColor: '#E8B4B8',
        borderRadius: 5,
        color: '#67595E',
    },
    image: {
        width: '100%',
        height: '80%',
        marginTop: -90,
    }
});