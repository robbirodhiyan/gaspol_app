import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Pressable, Text, Input, Heading, Flex } from "native-base";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateTaskScreen = () => {
  const [tanggal_task, setTanggalMulai] = useState(new Date());
  const [batas_task, setBatasWaktu] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setTanggalMulai(selectedDate);
    }
    setShowStartDatePicker(false);
  };

  const handleDueDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setBatasWaktu(selectedDate);
    }
    setShowDueDatePicker(false);
  };
  const route = useRoute();
  const navigation = useNavigation();
  const [id_project, setTeamId] = useState(route.params?.id_project || ""); // Access team ID from params
  const [nama_task, setName] = useState("");
  const [deskripsi_task, setDeskripsi] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Ambil token dari AsyncStorage saat komponen pertama kali dimuat
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken);
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    getToken();
  }, []);
  const handleCreateTask = async () => {
    try {
      if (
        !token ||
        !nama_task ||
        !deskripsi_task ||
        !tanggal_task ||
        !batas_task
      ) {
        setError("All fields are required");
        return;
      }

      const data = {
        id_project,
        nama_task,
        deskripsi_task,
        tanggal_task,
        batas_task,
      };

      const response = await axios.post(
        "https://gaspol.weza.co.id/createTask",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("successful:");

      // After successful registration, navigate to the login screen
      navigation.navigate("ListTeam"); // Replace 'LoginScreen' with your actual login screen name
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during create");
    }
  };
  return (
    <Box flex={1} bgColor="#343A40">
      <Pressable
        p={5}
        onPress={() => {
          // Perform project creation logic here
          // Once done, navigate back to "ProjectScreen"
          navigation.goBack();
        }}
      >
        <Flex direction="row-reverse">
          <Ionicons
            color="#FFFFFF"
            size={30}
            name="close-circle-outline"
          ></Ionicons>
        </Flex>
      </Pressable>
      <Heading alignSelf="center" color="#FFFFFF">
        Create New Task
      </Heading>
      <Text mb={10} alignSelf="center" color="#FFFFFF">
        Create your awesome task 🔥
      </Text>
      <Box borderRadius={20} bgColor="#FFFFFF" paddingBottom={500}>
        <Box p={5}>
          <Text fontWeight={400} fontSize={14}>
            Project ID
          </Text>
          <Input
            isDisabled={true}
            placeholder="Team ID"
            mb={5}
            value={id_project} // Set the value of the input field to teamId
            onChangeText={setTeamId}
          ></Input>
          <Text fontWeight={400} fontSize={14}>
            Name Task (required)
          </Text>
          <Input
            placeholder="Task name"
            mb={5}
            value={nama_task}
            onChangeText={setName}
          ></Input>
          <Text fontWeight={400} fontSize={14}>
            Description Task
          </Text>
          <Input
            placeholder="Task description"
            mb={5}
            value={deskripsi_task}
            onChangeText={setDeskripsi}
          ></Input>
          <Text fontWeight={400} fontSize={14}>
            Start Date (required)
          </Text>
          <Pressable onPress={() => setShowStartDatePicker(true)}>
            <Input mb={5} isDisabled={true}>
              {tanggal_task.toDateString()}
            </Input>
          </Pressable>
          {showStartDatePicker && (
            <DateTimePicker
              value={tanggal_task}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}

          {/* Due Date */}
          <Text fontWeight={400} fontSize={14}>
            Due Date (required)
          </Text>
          <Pressable onPress={() => setShowDueDatePicker(true)}>
            <Input mb={5} isDisabled={true}>
              {batas_task.toDateString()}
            </Input>
          </Pressable>
          {showDueDatePicker && (
            <DateTimePicker
              value={batas_task}
              mode="date"
              display="default"
              onChange={handleDueDateChange}
            />
          )}
          <Pressable
            onPress={handleCreateTask}
            rounded={10}
            bgColor="#0F7EF8"
            padding={4}
          >
            <Text
              color="#FFFFFF"
              fontWeight={600}
              fontSize={14}
              alignSelf="center"
            >
              Create Task
            </Text>
          </Pressable>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateTaskScreen;
