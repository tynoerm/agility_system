import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const MakeRepaymentModal = ({ visible, onClose, onPayment }) => {
  const [loans, setLoans] = useState([]);
  const [selectedLoanId, setSelectedLoanId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('EcoCash');
  const [phonenumber, setPhonenumber] = useState('');

  
  useEffect(() => {
    if (visible) {
      axios
        .get('https://agilitysystemmobileapp.onrender.com/api/loanstobepaid')
        .then((res) => setLoans(res.data))
        .catch((err) => console.error('Error fetching loans:', err));
    }
  }, [visible]);

  
  const formatPhoneNumber = (number) => {
    let cleaned = number.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = '+263' + cleaned.slice(1);
    else if (!cleaned.startsWith('+263')) cleaned = '+263' + cleaned;
    return cleaned;
  };

  const handlePayment = async () => {
    if (!selectedLoanId || !amount.trim() || !phonenumber.trim()) {
      return Alert.alert('Error', 'Please fill all fields');
    }

    const formattedNumber = formatPhoneNumber(phonenumber);

    try {
      const res = await axios.post(
        'https://agilitysystemmobileapp.onrender.com/api/loanstobepaid/payments',
        {
          loanId: selectedLoanId,
          amount: parseFloat(amount), 
          phone: formattedNumber,
          paymentMethod: paymentMethod.toLowerCase(),
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      Alert.alert('Payment', res.data.message);
      onPayment && onPayment();
    } catch (err) {
      console.error(err);
      Alert.alert(
        'Payment failed',
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Make Repayment</Text>
          <ScrollView>
            <Text style={styles.label}>Select Loan:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedLoanId}
                onValueChange={setSelectedLoanId}
              >
                <Picker.Item label="-- Select Loan --" value="" />
                {loans.map((loan) => (
                  <Picker.Item
                    key={loan.id}
                    label={`${loan.id} - ${loan.amount}`}
                    value={loan.id}
                  />
                ))}
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={phonenumber}
              onChangeText={setPhonenumber}
            />

            <Text style={styles.label}>Payment Method:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <Picker.Item label="EcoCash" value="EcoCash" />
                <Picker.Item label="Innbuks" value="Innbuks" />
                <Picker.Item label="Omari" value="Omari" />
                <Picker.Item label="OneMoney" value="OneMoney" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
              <Text style={styles.payText}>Pay</Text>
            </TouchableOpacity>

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
    maxHeight: '80%',
  },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 15, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  label: { fontWeight: '600', marginBottom: 5, color: '#333' },
  payBtn: {
    backgroundColor: '#6A0DAD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  payText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  closeBtn: { backgroundColor: '#999', padding: 12, borderRadius: 8 },
  closeText: { color: '#fff', textAlign: 'center' },
});

export default MakeRepaymentModal;
