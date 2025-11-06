import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const LoanStatusModal = ({ visible, onClose }) => {
  const [loans, setLoans] = useState([]);
  const [selectedLoanId, setSelectedLoanId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) fetchLoans();
  }, [visible]);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://agilitysystemmobileapp.onrender.com/api/getstatusloans'); 
      if (res.data.success) setLoans(res.data.data);
    } catch (err) {
      console.error('Fetch Loans Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const loan = loans.find(l => l.id === Number(selectedLoanId));

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Loan Status</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <>
              <Text style={styles.label}>Select Loan:</Text>
              <Picker
                selectedValue={selectedLoanId}
                onValueChange={value => setSelectedLoanId(value)}
              >
                <Picker.Item label="-- Select a Loan --" value="" />
                {loans.map(l => (
                  <Picker.Item
                    key={l.id}
                    label={`#${l.id} - ${l.fullName}`}
                    value={l.id}
                  />
                ))}
              </Picker>

              {loan && (
                <ScrollView>
                  <View style={styles.row}>
                    <Text style={styles.label}>Loan ID:</Text>
                    <Text style={styles.value}>{loan.id}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Applicant Name:</Text>
                    <Text style={styles.value}>{loan.fullName}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Loan Amount:</Text>
                    <Text style={styles.value}>{loan.amount}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Status:</Text>
                    <Text
                      style={[
                        styles.value,
                        {
                          color:
                            loan.status === 'Approved'
                              ? 'green'
                              : loan.status === 'Rejected'
                              ? 'red'
                              : 'orange',
                        },
                      ]}
                    >
                      {loan.status || 'Pending'}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Remarks:</Text>
                    <Text style={styles.value}>{loan.remarks || '-'}</Text>
                  </View>
                </ScrollView>
              )}
            </>
          )}

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  value: {
    color: '#555',
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#999',
    padding: 12,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default LoanStatusModal;
