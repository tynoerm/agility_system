import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';

const ProfileModal = ({ visible, onClose, profile, onSave }) => {
  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [phone, setPhone] = useState(profile?.phone || '');

  const handleSave = () => {
    const updatedProfile = { fullName, email, phone };
    if (onSave) onSave(updatedProfile);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Profile</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
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
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  content: { width: '90%', backgroundColor: '#fff', borderRadius: 15, padding: 20, maxHeight: '80%' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 15 },
  saveBtn: { backgroundColor: '#6A0DAD', padding: 12, borderRadius: 8, marginBottom: 10 },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  closeBtn: { backgroundColor: '#999', padding: 12, borderRadius: 8 },
  closeText: { color: '#fff', textAlign: 'center' }
});

export default ProfileModal;
