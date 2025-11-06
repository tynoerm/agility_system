import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const LoanHistoryModal = ({ visible, onClose, loans }) => {
  // loans is an array of loan objects: [{ id, amount, status, date }, ...]

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Loan History</Text>
          <ScrollView>
            {loans && loans.length > 0 ? (
              loans.map((loan, index) => (
                <View key={index} style={styles.loanCard}>
                  <Text style={styles.label}>Loan ID: <Text style={styles.value}>{loan.id}</Text></Text>
                  <Text style={styles.label}>Amount: <Text style={styles.value}>{loan.amount}</Text></Text>
                  <Text style={styles.label}>Status: 
                    <Text style={[styles.value, {
                      color: loan.status === 'Approved' ? 'green' : loan.status === 'Rejected' ? 'red' : 'orange'
                    }]}>{loan.status}</Text>
                  </Text>
                  <Text style={styles.label}>Date: <Text style={styles.value}>{loan.date}</Text></Text>
                </View>
              ))
            ) : (
              <Text style={{ textAlign: 'center', marginVertical: 20 }}>No loan history available</Text>
            )}
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
    alignItems: 'center'
  },
  content: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center'
  },
  loanCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9'
  },
  label: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 3
  },
  value: {
    fontWeight: '400',
    color: '#555'
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#999',
    padding: 12,
    borderRadius: 8
  },
  closeText: {
    color: '#fff',
    textAlign: 'center'
  }
});

export default LoanHistoryModal;
