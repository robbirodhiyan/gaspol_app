import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button } from "@rneui/base";

const Submit = (props) => {
  return (
    <TouchableOpacity
      onPress={props.clicked}
      style={[styles.container, { backgroundColor: props.color }]}
    >
      <Text style={styles.submitText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 49,
    borderColor: "blue",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0,
    justifyContent: "center",
  },
  submitText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default Submit;