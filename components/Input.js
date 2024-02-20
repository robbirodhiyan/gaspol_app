import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Input } from "@rneui/base";

class Inputs extends Component {
  state = { isFocused: false };

  onFocusChange = () => {
    this.setState({ isFocused: true });
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          { borderColor: this.state.isFocused ? "#0F7EF8" : "#eee" },
        ]}
      >
        <Input
          placeholder={this.props.name}
          onFocus={this.onFocusChange}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          secureTextEntry={this.props.pass}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 50,
    borderRadius: 7,
    marginVertical: 10,
    borderWidth: 3.5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: "#000000",
    marginLeft: 5,
  },
});

export default Inputs;