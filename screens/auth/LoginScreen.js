import { CommonActions } from "@react-navigation/native"; // Import CommonActions for navigation
import React, { useState } from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { Inputs, Submit } from "../../components";
import { Input, Button, Text, Heading } from "native-base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainTabs } from "../MainBottomTab";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("All fields are required");
        return;
      }

      const data = {
        email,
        password,
      };

      const response = await axios.post(
        "https://gaspol.weza.co.id/login",
        data
      );
      console.log("Login berhasil:", response.data);

      const token = response.data.token;
      const nama = response.data.nama;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("nama", nama);

      await AsyncStorage.setItem("userName", response.data.nama);
      await AsyncStorage.setItem("email", response.data.email);
      await AsyncStorage.setItem("position", response.data.posisi);

      props.navigation.dispatch(CommonActions.reset({index:0, routes: [{name: "MainTabs"}]}));
    } catch (error) {
      console.error("Login failed. Error response:", error.response);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#343A40" barStyle="dark-content" />

      <View style={styles.contentContainer}>
        <Heading>Welcome back 👋</Heading>
        <Text>Log in to your account to continue</Text>
      </View>

      <View style={styles.separator} />

      <View style={{ flex: 1, marginLeft: 19 }}>
        <Input
          mr={5}
          placeholder="Email Address"
          onChangeText={setEmail}
          value={email}
          fontSize={18}
          mb={5}
        />
        <Input
          fontSize={18}
          mb={5}
          mr={5}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button
          p={4}
          mr={5}
          mb={5}
          title="Login"
          color="#0F7EF8"
          borderRadius={15}
          style={{
            borderColor: "#0F7EF8", // Replace with your desired border color
            borderWidth: 1, // You can adjust the width of the border if needed
            backgroundColor: "#0F7EF8", // Set the background to transparent to keep it unchanged
          }}
          onPress={handleLogin}
        >
          <Heading size="xs" color="#FFFFFF">
            Login
          </Heading>
        </Button>
        <Button
          p={4}
          mr={5}
          title="Register Account"
          color="#FFFFFF"
          borderRadius={15}
          style={{
            borderColor: "#0F7EF8", // Replace with your desired border color
            borderWidth: 1, // You can adjust the width of the border if needed
            backgroundColor: "#FFFFFF", // Set the background to transparent to keep it unchanged
          }}
          onPress={() => {
            props.navigation.dispatch(CommonActions.navigate("RegisterScreen"));
          }}
        >
          <Heading size="xs" color="#0F7EF8">
            Register Account
          </Heading>
        </Button>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <View
        style={{
          // position: "absolute",
          // bottom: 100,
          marginBottom: 35,
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
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
