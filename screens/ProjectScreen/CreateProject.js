import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Pressable, Text, Input, Heading, Flex } from "native-base";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateProjectScreen = () => {
  const [tanggal_mulai, setTanggalMulai] = useState(new Date());
  const [batas_waktu, setBatasWaktu] = useState(new Date());
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
  const [id_team, setTeamId] = useState(route.params?.id_team || ""); // Access team ID from params
  const [nama_project, setName] = useState("");
  const [deskripsi_project, setDeskripsi] = useState("");
  const [error, setError] = useState(null);
  const handleCreateProject = async () => {
    try {
      if (
        !nama_project ||
        !deskripsi_project ||
        !tanggal_mulai ||
        !batas_waktu
      ) {
        setError("All fields are required");
        return;
      }

      const data = {
        id_team,
        nama_project,
        deskripsi_project,
        tanggal_mulai,
        batas_waktu,
      };

      const response = await axios.post(
        "https://gaspol.weza.co.id/createProject",
        data
      );
      console.log("successful:", response.data);

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
        Create New Project
      </Heading>
      <Text mb={10} alignSelf="center" color="#FFFFFF">
        Create your awesome project 🔥
      </Text>
      <Box borderRadius={20} bgColor="#FFFFFF" paddingBottom={500}>
        <Box p={5}>
          <Text fontWeight={400} fontSize={14}>
            Team ID
          </Text>
          <Input
            isDisabled={true}
            placeholder="Team ID"
            mb={5}
            value={id_team} // Set the value of the input field to teamId
            onChangeText={setTeamId}
          ></Input>
          <Text fontWeight={400} fontSize={14}>
            Name (required)
          </Text>
          <Input
            placeholder="Project name"
            mb={5}
            value={nama_project}
            onChangeText={setName}
          ></Input>
          <Text fontWeight={400} fontSize={14}>
            Description
          </Text>
          <Input
            placeholder="Project description"
            mb={5}
            value={deskripsi_project}
            onChangeText={setDeskripsi}
          ></Input>
          <Text fontWeight={400} fontSize={14}>
            Start Date (required)
          </Text>
          <Pressable onPress={() => setShowStartDatePicker(true)}>
            <Input mb={5} isDisabled={true}>
              {tanggal_mulai.toDateString()}
            </Input>
          </Pressable>
          {showStartDatePicker && (
            <DateTimePicker
              value={tanggal_mulai}
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
              {batas_waktu.toDateString()}
            </Input>
          </Pressable>
          {showDueDatePicker && (
            <DateTimePicker
              value={batas_waktu}
              mode="date"
              display="default"
              onChange={handleDueDateChange}
            />
          )}
          <Pressable
            onPress={handleCreateProject}
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
              Create Project
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
};
export default CreateProjectScreen;
