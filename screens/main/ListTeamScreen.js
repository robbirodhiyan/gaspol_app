import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
  Image,
  Stack,
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { white, whitesmoke } from "color-name";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChartSkeleton, SkeletonLoader } from "../../components";

const ListTeamScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const [teamData, setTeamData] = useState([]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          axios
            .get("https://gaspol.weza.co.id/detailTeam/9", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }) // Gantilah URL dengan URL API yang sesuai
            .then((response) => {
              setTeamData(response.data.teams);

              setIsRefreshing(false); // Set refreshing to false after data is updated
            })
            .catch((error) => {
              console.error(error);
              setIsRefreshing(false); // Set refreshing to false even in case of error
            });
        } else {
          navigation.navigate("LoginScreen");
          setIsRefreshing(false); // Set refreshing to false if token is not found
        }
      })
      .catch((error) => {
        console.error(error);
        setIsRefreshing(false); // Set refreshing to false in case of error
      });
  };

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          axios
            .get("https://gaspol.weza.co.id/detailTeam/9", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }) // Gantilah URL dengan URL API yang sesuai
            .then((response) => {
              setTeamData(response.data.teams);
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
          <Box mt={"15px"} ml={"20px"}>
            <Heading>Teams</Heading>
            <Text>Build awesome project with your team 😎</Text>
          </Box>
          <Pressable p={5} mt={3}>
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
          <Heading fontSize="xl" p={5}>
            Your active teams
          </Heading>
        </Box>
        <FlatList
          h="480px"
          data={teamData}
          renderItem={({ item }) =>
            // Render SkeletonLoader if data is not available or is loading
            !item.team ? (
              <SkeletonLoader />
            ) : (
              <Pressable
                onPress={() =>
                  navigation.navigate("ProjectScreen", { selectedTeam: item })
                }
              >
                <Box
                  mr={5}
                  ml={5}
                  rounded={10}
                  shadow={5}
                  p={5}
                  bgColor="#FFFFFF"
                  mb={5}
                  py="5"
                >
                  <HStack space={[2, 3]}>
                    <VStack>
                      <Text
                        mb={3}
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item.team}
                      </Text>
                      <HStack alignItems={"center"}>
                        <Ionicons name="document-outline"></Ionicons>
                        <Text>Total Projects: {item.total_project}</Text>
                      </HStack>
                      <HStack alignItems={"center"}>
                        <Ionicons name="people-outline"></Ionicons>
                        <Text>Total Members: {item.total_member}</Text>
                      </HStack>
                    </VStack>
                    <Spacer />
                    <Box
                      backgroundColor="#E6E6E7"
                      rounded={15}
                      alignItems="center"
                      justifyContent="center"
                      px="5px"
                      py="5px"
                    >
                      <Image
                        // source={{ uri: item.logo }}
                        size="md"
                        resizeMode="contain"
                        alt="logo"
                      />
                    </Box>
                  </HStack>
                </Box>
              </Pressable>
            )
          }
          keyExtractor={(item) => item.id}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      </Box>
    </SafeAreaView>
  );
};

export default ListTeamScreen;
