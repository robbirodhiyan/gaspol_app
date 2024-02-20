import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, SafeAreaView } from "react-native";
import {
  ScrollView,
  Box,
  Input,
  Flex,
  Center,
  Text,
  Heading,
  Container,
  Pressable,
  VStack,
  FlatList,
  HStack,
  Avatar,
  Spacer,
  Stack,
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PieChartSkeleton, SkeletonLoader } from "../../components";

const IndividualTaskScreen = () => {
  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          axios
            .get("https://gaspol.weza.co.id/detailTask/9", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }) // Gantilah URL dengan URL API yang sesuai
            .then((response) => {
              setTeamData(response.data.task);
            });
        } else {
          // Token tidak ditemukan, mungkin pengguna belum login, atur navigasi ke halaman login di sini
          navigation.navigate("LoginScreen");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  function calculateRemainingDays(batasWaktu) {
    const batasWaktuDate = new Date(batasWaktu);
    const todayDate = new Date();

    const timeDifference = batasWaktuDate - todayDate;
    const daysRemaining = Math.round(timeDifference / (1000 * 60 * 60 * 24));

    if (daysRemaining > 0) {
      return `${daysRemaining} days remaining`;
    } else if (daysRemaining === 0) {
      return "Today is the deadline";
    } else {
      return "Deadline passed";
    }
  }
  return (
    <SafeAreaView>
      <Box>
        <Flex
          direction="row"
          mb="2.5"
          mt="1.5"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Box ml={"20px"} mt={"15px"}>
            <Heading>Tasks</Heading>
            <Text>Immediately complete your assigned task 🤘</Text>
          </Box>
          <Pressable mr={"20px"}>
            <Ionicons name="notifications-outline" size={26}></Ionicons>
          </Pressable>
        </Flex>
        <Stack p={5}>
          <Input
            size="lg"
            w="100%"
            placeholder="Search project..."
            InputRightElement={
              <Icon
                as={<Ionicons name="search" />}
                size={5}
                mr="4"
                color="muted.400"
              />
            }
          />
        </Stack>
        <Box>
          <Heading fontSize="xl" p="5">
            Task assigned to you
          </Heading>
        </Box>
        <FlatList
          h="450px"
          data={teamData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            // Render SkeletonLoader if data is not available or is loading
            !item.nama_task ? (
              <SkeletonLoader />
            ) : (
              <Box
                mr={5}
                ml={5}
                rounded={10}
                shadow={5}
                p={5}
                bgColor="#FFFFFF"
                mb={5}
                //   borderBottomWidth="1"
                //   _dark={{
                //     borderColor: "muted.50",
                //   }}
                //   borderColor="muted.800"

                py="5"
              >
                <HStack space={[2, 3]} justifyContent="space-evenly">
                  <VStack justifyContent="space-evenly">
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.nama_task}
                    </Text>
                    <HStack>
                      <Ionicons name="document-outline"></Ionicons>
                      <Text>
                        Checklist: {item.passed_list_task}/
                        {item.total_list_task}
                      </Text>
                    </HStack>
                    <HStack>
                      <Ionicons name="people-outline"></Ionicons>
                      <Text>Nama Team: {item.team}</Text>
                    </HStack>
                  </VStack>
                  <Spacer />
                  <VStack justifyContent={"space-between"}>
                    <Box
                      fontSize="xs"
                      bg={
                        item.status_task === "0"
                          ? "#FFC8C8" // Not started
                          : item.status_task === "1"
                          ? "#F8EFA1" // On progress
                          : item.status_task === "2"
                          ? "#C3E6CB" // Completed
                          : "#F8EFA1" // Default color
                      }
                      paddingLeft={2}
                      paddingRight={2}
                      rounded={8}
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                    >
                      <Text
                        alignSelf="flex-end"
                        color={
                          item.status_task === "0"
                            ? "#DC0909" // Not started
                            : item.status_task === "1"
                            ? "#85780B" // On progress
                            : item.status_task === "2"
                            ? "#00B67A" // Completed
                            : "#DC0909" // Default color
                        }
                        bold
                      >
                        {item.status_task === "0"
                          ? "Not Started"
                          : item.status_task === "1"
                          ? "On Progress"
                          : item.status_task === "2"
                          ? "Completed"
                          : "Unknown Status"}
                      </Text>
                    </Box>
                    <Text
                      alignSelf="flex-end"
                      fontSize="xs"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                    >
                      {item.batas_task}
                    </Text>
                    <Heading
                      alignSelf="flex-end"
                      fontSize="xs"
                      // _dark={{
                      //   color: "red",
                      // }}
                      color="red.500"
                    >
                      {calculateRemainingDays(item.batas_task)}
                    </Heading>
                  </VStack>
                </HStack>
              </Box>
            )
          }
          keyExtractor={(item) => item.id}
        />
      </Box>
    </SafeAreaView>
  );
};

export default IndividualTaskScreen;
