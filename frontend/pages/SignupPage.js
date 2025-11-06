import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupPage({ navigation }) {
  const [step, setStep] = useState(1);

  // Personal Info
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Next of Kin Info
  const [nok1Name, setNok1Name] = useState('');
  const [nok1Surname, setNok1Surname] = useState('');
  const [nok1Id, setNok1Id] = useState('');
  const [nok1Phone, setNok1Phone] = useState('');

  const handleSignUp = async () => {
    const payload = {
      name,
      surname,
      address,
      phone,
      password,
      nextOfKin1: {
        name: nok1Name,
        surname: nok1Surname,
        id: nok1Id,
        phone: nok1Phone,
      },
    };

    try {
      await axios.post(
        'https://agilitysystemmobileapp.onrender.com/api/signup',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('LandingPage');
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Network Error', 'Please try again later.');
      }
      console.error(error);
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <>
          <Text style={styles.sectionTitle}>Step 1: Personal Information</Text>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Surname" value={surname} onChangeText={setSurname} />
          <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, { opacity: name && surname && address && phone && password ? 1 : 0.5 }]}
            disabled={!name || !surname || !address || !phone || !password}
            onPress={() => setStep(2)}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#f6e05e', '#6b46c1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <Text style={styles.sectionTitle}>Step 2: Next of Kin Information</Text>
          <TextInput style={styles.input} placeholder="Name" value={nok1Name} onChangeText={setNok1Name} />
          <TextInput style={styles.input} placeholder="Surname" value={nok1Surname} onChangeText={setNok1Surname} />
          <TextInput style={styles.input} placeholder="ID Number" value={nok1Id} onChangeText={setNok1Id} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={nok1Phone}
            onChangeText={setNok1Phone}
          />

          <View style={styles.navBtns}>
            <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
              <LinearGradient colors={['#6b46c1', '#6b46c1']} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Back</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { flex: 1, opacity: nok1Name && nok1Surname && nok1Id && nok1Phone ? 1 : 0.5 }]}
              disabled={!nok1Name || !nok1Surname || !nok1Id || !nok1Phone}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <LinearGradient colors={['#f6e05e', '#6b46c1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      );
    }
  };

  return (
    <LinearGradient colors={['#6b46c1', '#f6e05e']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>Zim Wallet</Text>
          <Text style={styles.subtitle}>
            {step === 1 ? 'Sign Up - Personal Info' : 'Sign Up - Next of Kin'}
          </Text>

          {renderStep()}

          <StatusBar style="light" />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#6b46c1',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6b46c1',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#6b46c1',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backBtn: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 10,
  },
});
