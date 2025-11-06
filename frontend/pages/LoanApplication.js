import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";

const LoanApplication = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loanTerm, setLoanTerm] = useState("7");
  const cameraRef = useRef(null);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setPhoto(data.uri);
      } catch (error) {
        console.log("Error taking photo:", error);
      }
    }
  };

  const handleSubmit = () => {
    if (!photo) {
      Alert.alert("Missing photo", "Please take a selfie before submitting");
      return;
    }
    Alert.alert(
      "Loan Submitted",
      `Loan Term: ${loanTerm} days\nPhoto captured!\nThank you!`
    );
    // TODO: Send photo + loanTerm to backend
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Selfie Section */}
        <View style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.front}
              ref={(ref) => (cameraRef.current = ref)}
            />
          )}
          <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
            <Text style={styles.photoButtonText}>
              {photo ? "Retake Selfie" : "Take Selfie"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Loan Details Section */}
        <View style={styles.loanBox}>
          <Text style={styles.sectionTitle}>Loan Application</Text>

          <Text style={styles.label}>Loan Amount:</Text>
          <Text style={styles.value}>9 USD</Text>

          <Text style={styles.label}>Loan Term (days):</Text>
          <TextInput
            style={styles.input}
            value={loanTerm}
            onChangeText={setLoanTerm}
            keyboardType="numeric"
            placeholder="Enter loan term"
          />

          {/* Loan Breakdown */}
          <View style={styles.detailsBox}>
            <Text style={styles.sectionTitle}>Loan Details</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Disburse Amount:</Text>
              <Text style={styles.value}>6.30 USD</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Loan Amount:</Text>
              <Text style={styles.value}>9 USD</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>One-time Fee:</Text>
              <Text style={styles.value}>2.70 USD</Text>
            </View>

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>Repayment Amount</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Total Repayment:</Text>
              <Text style={styles.value}>9.07 USD</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Interest:</Text>
              <Text style={styles.value}>0.07 USD</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Overdue Penalty Interest:</Text>
              <Text style={styles.value}>2.00% per day</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  photoContainer: { alignItems: "center", marginBottom: 30 },
  camera: { width: 250, height: 250, borderRadius: 15 },
  photo: { width: 250, height: 250, borderRadius: 15, marginBottom: 10 },
  photoButton: {
    backgroundColor: "#6a1b9a",
    padding: 12,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
    marginTop: 10,
  },
  photoButtonText: { color: "#fff", fontWeight: "bold" },
  loanBox: { backgroundColor: "#f9f9f9", padding: 20, borderRadius: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  label: { fontSize: 14, color: "#333", marginTop: 10 },
  value: { fontSize: 16, fontWeight: "600", color: "#222" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    fontSize: 16,
  },
  detailsBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
  separator: { height: 1, backgroundColor: "#ddd", marginVertical: 10 },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#6a1b9a",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default LoanApplication;
