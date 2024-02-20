import React, { Component } from "react";
import { Image, Text, View } from "react-native";

import { StackActions } from "@react-navigation/native";
import Logo from "../../assets/Logo.png";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace("LoginScreen"));
    }, 3000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0F7EF8",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={Logo} style={{ width: 285, height: 95 }} />
        <View
          style={{
            position: "absolute",
            bottom: 100,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: "#FFFFFF", fontWeight: "bold", marginBottom: 8 }}
          >
            Project Management
          </Text>
          <Text style={{ color: "#FFFFFF" }}>Pasukan Langit ❤</Text>
        </View>
      </View>
    );
  }
}

export default SplashScreen;
