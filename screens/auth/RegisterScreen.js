import { CommonActions } from "@react-navigation/native"; // Import CommonActions for navigation
import React, { useState } from "react";
import { StatusBar, Text, View, StyleSheet, Alert } from "react-native";
import { Inputs, Submit } from "../../components";
import { Input, Pressable } from "native-base";
import { MainTabs } from "../MainBottomTab";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";


const RegisterScreen = ({ navigation }) => {
  const [nama, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegistration = async () => {
    try {
      if (!nama || !email || !password) {
        setError("All fields are required");
        return;
      }

      const data = {
        nama,
        email,
        password,
      };

      const response = await axios.post(
        "https://gaspol.weza.co.id/register",
        data
      );
      console.log("Registration successful:", response.data);

      // After successful registration, navigate to the login screen
      navigation.navigate("LoginScreen"); // Replace 'LoginScreen' with your actual login screen name
    } catch (error) {
      console.error("Registration Error:", error);
      setError("An error occurred during registration");
    }
  };
  return (
    
    <View style={styles.container}>
      <StatusBar backgroundColor="#343A40" barStyle="dark-content" />
      
      <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Ionicons name="chevron-back-circle-outline" size={28} />
          <Text style={styles.textButton}>back</Text>
      </Pressable>
      
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Welcome back 👋</Text>
        <Text style={styles.text}>Register your account to continue</Text>
      </View>

      <View style={styles.separator} />

      <View style={{ flex: 1, marginLeft: 19 }}>
        <Input
          placeholder="Nama"
          icon="user"
          style={{ height: 50 }}
          value={nama}
          onChangeText={setName}
          mb={5}
          mr={5}
        />
        <Input
          placeholder="Email"
          icon="user"
          style={{ height: 50 }}
          value={email}
          onChangeText={setEmail}
          mb={5}
          mr={5}
        />
        <Input
          secureTextEntry
          mr={5}
          style={{ height: 50 }}
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
        />
        <Submit
          title="Register Account"
          color="#0F7EF8"
          clicked={handleRegistration}
        />
        {/* Display error message */}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {/* Rest of the code remains the same */}
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 100,
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#000", fontWeight: "bold", marginBottom: 8 }}>
          Project Management
        </Text>
        <Text style={{ color: "#000" }}>Pasukan Langit ❤</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 110,
  },
  contentContainer: {
    marginLeft: 19,
  },
  titleText: {
    fontSize: 28,
    marginVertical: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
  },
  separator: {
    marginTop: 30,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  backButton: {
    marginLeft: 20,
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  textButton: {
    marginLeft: 6,
    fontSize: 15,
  },
});

export default RegisterScreen;
