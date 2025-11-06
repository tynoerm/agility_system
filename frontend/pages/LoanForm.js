import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";

const CombinedLoanForm = () => {
  // Step control
  const [step, setStep] = useState(1);

  // Personal Info
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [gender, setGender] = useState("");

  // Employment Info
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [income, setIncome] = useState("");

  // Contact Info
  const [contact1Phone, setContact1Phone] = useState("");
  const [contact1Relation, setContact1Relation] = useState("");
  const [contact2Name, setContact2Name] = useState("");
  const [contact2Phone, setContact2Phone] = useState("");
  const [contact2Relation, setContact2Relation] = useState("");

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const formData = {
      personal: { fullName, idNumber, gender },
      employment: { company, position, income },
      contactInfo: {
        contact1Phone,
        contact1Relation,
        contact2Name,
        contact2Phone,
        contact2Relation,
      },
    };
    console.log("Form Submitted:", formData);
    alert("✅ Loan application submitted successfully!");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Loan Application Form</Text>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <Text
          style={[
            styles.stepText,
            step === 1 && styles.activeStepText,
          ]}
        >
          Step 1
        </Text>
        <Text
          style={[
            styles.stepText,
            step === 2 && styles.activeStepText,
          ]}
        >
          Step 2
        </Text>
        <Text
          style={[
            styles.stepText,
            step === 3 && styles.activeStepText,
          ]}
        >
          Step 3
        </Text>
      </View>

      {/* ===== STEP 1: PERSONAL INFO ===== */}
      {step === 1 && (
        <View>
          <Text style={styles.sectionTitle}>1. Personal Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>National ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter ID number"
              value={idNumber}
              onChangeText={setIdNumber}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <Picker
              selectedValue={gender}
              onValueChange={setGender}
              style={styles.picker}
            >
              <Picker.Item label="Select gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>
      )}

      {/* ===== STEP 2: EMPLOYMENT INFO ===== */}
      {step === 2 && (
        <View>
          <Text style={styles.sectionTitle}>2. Employment Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Company</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter company name"
              value={company}
              onChangeText={setCompany}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Position</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter position"
              value={position}
              onChangeText={setPosition}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Monthly Income</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter income"
              keyboardType="numeric"
              value={income}
              onChangeText={setIncome}
            />
          </View>
        </View>
      )}

      {/* ===== STEP 3: CONTACT INFO ===== */}
      {step === 3 && (
        <View>
          <Text style={styles.sectionTitle}>3. Contact Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Emergency Contact 1</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={contact1Phone}
              onChangeText={setContact1Phone}
            />
            <Picker
              selectedValue={contact1Relation}
              onValueChange={setContact1Relation}
              style={styles.picker}
            >
              <Picker.Item label="Select relation" value="" />
              <Picker.Item label="Colleague" value="Colleague" />
              <Picker.Item label="Manager" value="Manager" />
              <Picker.Item label="Friend" value="Friend" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Emergency Contact 2</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={contact2Name}
              onChangeText={setContact2Name}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={contact2Phone}
              onChangeText={setContact2Phone}
            />
            <Picker
              selectedValue={contact2Relation}
              onValueChange={setContact2Relation}
              style={styles.picker}
            >
              <Picker.Item label="Select relation" value="" />
              <Picker.Item label="Family" value="Family" />
              <Picker.Item label="Sibling" value="Sibling" />
              <Picker.Item label="Parent" value="Parent" />
            </Picker>
          </View>

          <View style={styles.approvalBox}>
            <Icon name="check-circle" size={20} color="green" />
            <Text style={styles.approvalText}>
              Over 99% of users were successfully approved in the past 7 days
            </Text>
          </View>
        </View>
      )}

      {/* ===== NAVIGATION BUTTONS ===== */}
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {step === 3 ? "Submit" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1, padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A148C",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A1B9A",
    marginVertical: 15,
  },
  inputContainer: { marginBottom: 15 },
  label: { color: "#555", marginBottom: 5 },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
  },
  picker: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  stepText: { color: "#aaa", fontWeight: "bold" },
  activeStepText: { color: "#6A1B9A", textDecorationLine: "underline" },
  approvalBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  approvalText: { color: "green", marginLeft: 8, fontSize: 13, flex: 1 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: "#ccc",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
  },
  backText: { color: "#000", fontWeight: "bold" },
  nextButton: {
    flex: 1,
    backgroundColor: "#6A1B9A",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  nextText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default CombinedLoanForm;
