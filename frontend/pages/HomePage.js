import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Apply");

  const loans = [
    {
      id: 1,
      name: "Lelo Loans",
      amount: "500 USD",
      rate: "0.10% daily rate",
      color: "#3E63DD",
      tag: "Full disburse",
      tag2: "Amount increasing",
      btnText: "Check and apply now",
    },
    {
      id: 2,
      name: "Breath Cash",
      amount: "500 USD",
      rate: "0.07% daily rate",
      color: "#2D9CDB",
    },
    {
      id: 3,
      name: "Sunga Cash",
      amount: "500 USD",
      rate: "0.06% daily rate",
      color: "#F2C94C",
    },
  ];

  return (
    <View style={styles.container}>
      {/* TAB HEADER */}
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "Apply" && styles.activeTab]}
          onPress={() => setSelectedTab("Apply")}
        >
          <Text style={[styles.tabText, selectedTab === "Apply" && styles.activeTabText]}>
            Apply
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "Repay" && styles.activeTab]}
          onPress={() => setSelectedTab("Repay")}
        >
          <Text style={[styles.tabText, selectedTab === "Repay" && styles.activeTabText]}>
            Repay
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Section Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {selectedTab === "Apply" ? "Available Loans" : "Your Repayments"}
          </Text>
          <Image style={styles.badge} />
        </View>

        {/* Loan Cards */}
        {selectedTab === "Apply" &&
          loans.map((loan, index) => (
            <View key={index} style={[styles.card, { borderColor: loan.color }]}>
              <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                  <Image source={loan.icon} style={styles.icon} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.loanName}>{loan.name}</Text>
                  <Text style={styles.amount}>{loan.amount}</Text>
                  <Text style={styles.rate}>{loan.rate}</Text>
                </View>
              </View>

              {loan.id === 1 && (
                <View style={styles.tagRow}>
                  <View style={styles.tagBlue}>
                    <Text style={styles.tagText}>{loan.tag}</Text>
                  </View>
                  <View style={styles.tagOrange}>
                    <Text style={styles.tagText}>{loan.tag2}</Text>
                  </View>
                </View>
              )}

              {loan.btnText ? (
                <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={() => navigation.navigate("LoanApplication")}
                >
                  <Text style={styles.applyText}>{loan.btnText}</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.disabledBtn}>
                  <Text style={styles.disabledText}>Not achieved</Text>
                </View>
              )}
            </View>
          ))}

        {/* Repay Section */}
        {selectedTab === "Repay" && (
          <View style={styles.repaySection}>
            <Text style={styles.repayText}>You currently have no active loans to repay.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FF",
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  /* ===== TAB HEADER ===== */
  tabHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E5E9FF",
    borderRadius: 10,
    padding: 6,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  tabText: {
    color: "#555",
    fontWeight: "600",
    fontSize: 16,
  },
  activeTab: {
    backgroundColor: "#3E63DD",
  },
  activeTabText: {
    color: "#fff",
  },
  /* ===== SECTION HEADER ===== */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#DDE6FF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003399",
  },
  badge: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  /* ===== CARD STYLES ===== */
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1.2,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    backgroundColor: "#F0F3FF",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  info: {
    flex: 1,
  },
  loanName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  amount: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  rate: {
    fontSize: 13,
    color: "#888",
  },
  tagRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  tagBlue: {
    backgroundColor: "#E3EDFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
  },
  tagOrange: {
    backgroundColor: "#FFEBD9",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#444",
  },
  applyBtn: {
    backgroundColor: "#6B4EFF",
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
    paddingVertical: 10,
  },
  applyText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabledBtn: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
    paddingVertical: 10,
  },
  disabledText: {
    color: "#888",
  },
  /* ===== REPAY SECTION ===== */
  repaySection: {
    backgroundColor: "#F0F3FF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  repayText: {
    fontSize: 15,
    color: "#555",
  },
});
