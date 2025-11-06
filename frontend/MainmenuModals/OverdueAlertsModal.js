import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const OverdueAlertsModal = ({ visible, onClose, overdueLoans }) => {
  // overdueLoans: [{ id, fullName, amount, dueDate, daysOverdue }, ...]
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Overdue Alerts</Text>
          <ScrollView>
            {overdueLoans && overdueLoans.length > 0 ? (
              overdueLoans.map((loan, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.label}>Loan ID: <Text style={styles.value}>{loan.id}</Text></Text>
                  <Text style={styles.label}>Applicant: <Text style={styles.value}>{loan.fullName}</Text></Text>
                  <Text style={styles.label}>Amount: <Text style={styles.value}>{loan.amount}</Text></Text>
                  <Text style={styles.label}>Due Date: <Text style={styles.value}>{loan.dueDate}</Text></Text>
                  <Text style={styles.label}>Days Overdue: <Text style={[styles.value, { color: 'red' }]}>{loan.daysOverdue}</Text></Text>
                </View>
              ))
            ) : (
              <Text style={{ textAlign: 'center', marginVertical: 20 }}>No overdue loans</Text>
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
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  content: { width: '90%', backgroundColor: '#fff', borderRadius: 15, padding: 20, maxHeight: '80%' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 15, textAlign: 'center' },
  card: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, marginBottom: 10, backgroundColor: '#f9f9f9' },
  label: { fontWeight: '600', color: '#333', marginBottom: 3 },
  value: { fontWeight: '400', color: '#555' },
  closeBtn: { marginTop: 20, backgroundColor: '#999', padding: 12, borderRadius: 8 },
  closeText: { color: '#fff', textAlign: 'center' }
});

export default OverdueAlertsModal;
