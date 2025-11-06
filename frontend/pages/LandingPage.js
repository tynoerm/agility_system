import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Purple Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{isLogin ? "Zim Wallet" : "Create Account"}</Text>
        </View>

        {/* White Section */}
        <View style={styles.body}>
          {isLogin ? (
            <Text style={styles.label}>Please enter your phone number</Text>
          ) : (
            <Text style={styles.label}>Sign up with your phone number</Text>
          )}

          {/* Phone Input */}
          <View style={styles.inputRow}>
            <Text style={styles.countryCode}>+263</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputRow}>
            <Icon name="lock-outline" size={20} color="#6C40FF" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Confirm Password Input (Signup only) */}
          {!isLogin && (
            <View style={styles.inputRow}>
              <Icon name="lock-outline" size={20} color="#6C40FF" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Confirm your password"
                placeholderTextColor="#A0A0A0"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          )}

          {/* Terms Checkbox (Signup only) */}
          {!isLogin && (
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAccepted(!accepted)}
            >
              <View style={[styles.checkbox, accepted && styles.checkedBox]} />
              <Text style={styles.termsText}>
                I agree to the{" "}
                <Text style={styles.link}>Terms & Conditions</Text>
              </Text>
            </TouchableOpacity>
          )}

          {/* Sign In / Sign Up Button */}
          <TouchableOpacity style={styles.signInBtn}>
            <Text style={styles.signInText}>{isLogin ? "Sign In" : "Sign Up"}</Text>
          </TouchableOpacity>

          {/* Toggle Login / Signup */}
          <View style={styles.accountRow}>
            <Text style={styles.accountText}>
              {isLogin ? "Don’t have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={styles.createText}>{isLogin ? "Create Account" : "Sign In"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C40FF",
  },
  header: {
    backgroundColor: "#6C40FF",
    height: "35%",
    borderBottomRightRadius: 60,
    paddingHorizontal: 25,
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  body: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    marginTop: -40,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#BFBFBF",
    marginBottom: 30,
    paddingBottom: 5,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  signInBtn: {
    backgroundColor: "#6C40FF",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  accountText: {
    color: "#555",
    fontSize: 14,
  },
  createText: {
    color: "#6C40FF",
    fontWeight: "bold",
    fontSize: 14,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#6C40FF",
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    backgroundColor: "#EDE6FF",
  },
  termsText: {
    color: "#444",
    fontSize: 14,
  },
  link: {
    color: "#6C40FF",
    textDecorationLine: "underline",
  },
});
