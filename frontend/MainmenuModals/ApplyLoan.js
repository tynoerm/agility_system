import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const ApplyLoanModal = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [idImage, setIdImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);

  // Take selfie
  const handleTakeSelfie = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Cannot use camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelfieImage(result.assets[0]);
    }
  };

  // Upload ID
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Cannot access gallery');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setIdImage(result.assets[0]);
    }
  };

  // Submit
  const handleSubmit = async () => {
    if (!fullName || !email || !phone || !amount || !purpose || !idImage || !selfieImage) {
      Alert.alert('Incomplete', 'Please complete all steps before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('amount', amount);
    formData.append('purpose', purpose);

    formData.append('idImage', {
      uri: Platform.OS === 'android' ? idImage.uri : idImage.uri.replace('file://', ''),
      type: 'image/jpeg',
      name: 'id.jpg',
    });

    formData.append('selfieImage', {
      uri: Platform.OS === 'android' ? selfieImage.uri : selfieImage.uri.replace('file://', ''),
      type: 'image/jpeg',
      name: 'selfie.jpg',
    });

    try {
      await axios.post('https://agilitysystemmobileapp.onrender.com/api/loans', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', 'Loan submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting loan:', error);
      Alert.alert('Error', 'Failed to submit loan application.');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.stepTitle}>Step 1: Take a Selfie</Text>
            <TouchableOpacity style={styles.selfieBtn} onPress={handleTakeSelfie}>
              <Text style={styles.uploadText}>
                {selfieImage ? 'Retake Selfie' : 'Take Selfie'}
              </Text>
            </TouchableOpacity>
            {selfieImage && <Image source={{ uri: selfieImage.uri }} style={styles.preview} />}
            <TouchableOpacity
              style={[styles.nextBtn, { marginTop: 20 }]}
              disabled={!selfieImage}
              onPress={() => setStep(2)}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </>
        );

      case 2:
        return (
          <>
            <Text style={styles.stepTitle}>Step 2: Personal Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={setPhone}
            />
            <View style={styles.navBtns}>
              <TouchableOpacity style={styles.prevBtn} onPress={() => setStep(1)}>
                <Text style={styles.nextText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextBtn}
                disabled={!fullName || !email || !phone}
                onPress={() => setStep(3)}>
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 3:
        return (
          <>
            <Text style={styles.stepTitle}>Step 3: Loan Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Loan Amount"
              value={amount}
              keyboardType="numeric"
              onChangeText={setAmount}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Purpose of Loan"
              value={purpose}
              onChangeText={setPurpose}
              multiline
            />
            <View style={styles.navBtns}>
              <TouchableOpacity style={styles.prevBtn} onPress={() => setStep(2)}>
                <Text style={styles.nextText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextBtn}
                disabled={!amount || !purpose}
                onPress={() => setStep(4)}>
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 4:
        return (
          <>
            <Text style={styles.stepTitle}>Step 4: Upload ID & Submit</Text>
            <TouchableOpacity style={styles.uploadBtn} onPress={handlePickImage}>
              <Text style={styles.uploadText}>
                {idImage ? 'Change ID Image' : 'Upload ID Image'}
              </Text>
            </TouchableOpacity>
            {idImage && <Image source={{ uri: idImage.uri }} style={styles.preview} />}
            <View style={styles.navBtns}>
              <TouchableOpacity style={styles.prevBtn} onPress={() => setStep(3)}>
                <Text style={styles.nextText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitBtn}
                disabled={!idImage}
                onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ScrollView>
            <Text style={styles.title}>Loan Application</Text>
            {renderStepContent()}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    maxHeight: '85%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  preview: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  selfieBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  uploadBtn: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 8,
  },
  uploadText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  nextBtn: {
    backgroundColor: '#6A0DAD',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  prevBtn: {
    backgroundColor: '#999',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  navBtns: {
    flexDirection: 'row',
    marginTop: 10,
  },
  nextText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  closeBtn: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  closeText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ApplyLoanModal;
