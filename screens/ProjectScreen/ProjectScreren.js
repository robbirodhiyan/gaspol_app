import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Pressable,
  Text,
  Image,
  Input,
  HStack,
  VStack,
  Heading,
  FlatList,
  Spacer,
  Avatar,
  Stack,
  Icon,
} from "native-base";

const ProjectScreen = () => {
  const route = useRoute();
  const selectedTeam = route.params?.selectedTeam || {};
  const projectData = selectedTeam.list_project[0];
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
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
        <Box>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate("ListTeam")}
          >
            <Ionicons name="chevron-back-circle-outline" size={28} />
            <Text style={styles.textButton}>back</Text>
          </Pressable>
        </Box>
        <Box p={5}>
          <HStack space={[2, 3]} justifyContent="space-between">
            <VStack>
              <Heading>{selectedTeam.team}</Heading>
              <Text>{selectedTeam.deskripsi_team}</Text>
              <HStack mt={3}>
                <Box mr={3}>
                  <Ionicons name="document-outline">
                    {selectedTeam.total_project}
                  </Ionicons>
                </Box>
                <Ionicons name="people-outline">
                  {selectedTeam.total_member}
                </Ionicons>
              </HStack>
            </VStack>
            <Box
              backgroundColor="#E6E6E7"
              rounded={15}
              alignItems="center"
              justifyContent="center"
              px="5px"
              py="5px"
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/d/da/Logo_dewabiz.png",
                }}
                size="md"
                resizeMode="contain"
                alt="logo"
              />
            </Box>
          </HStack>
        </Box>
        <HStack p={5} direction="row" justifyContent="space-between">
          <Box>
            <Heading>Project List</Heading>
          </Box>
          <Pressable
            onPress={() =>
              navigation.navigate("CreateProjectScreen", {
                id_team: selectedTeam.id, // Pass the team ID as a parameter
              })
            }
          >
            <Ionicons name="add" size={26}></Ionicons>
          </Pressable>
        </HStack>
        <Box ml={5} mr={5} p={2} bgColor="#E6E6E7" borderRadius={10}>
          <HStack direction="row">
            <Pressable
              w={"50%"}
              p={3}
              bg={selectedTab == 1 ? "#E6E6E7" : "#0F7EF8"}
              borderRadius={"7px"}
              justifyContent={"center"}
              alignItems={"center"}
              onPress={() => {
                setSelectedTab(0);
              }}
            >
              <Text
                color={selectedTab == 1 ? "#B3B3B3" : "#FFFFFF"}
                fontSize={12}
                fontWeight={500}
              >
                Project
              </Text>
            </Pressable>
            <Pressable
              w={"50%"}
              h={"37px"}
              bg={selectedTab == 0 ? "#E6E6E7" : "#0F7EF8"}
              borderRadius={"7px"}
              justifyContent={"center"}
              alignItems={"center"}
              onPress={() => {
                setSelectedTab(1);
              }}
            >
              <Text
                color={selectedTab == 0 ? "#B3B3B3" : "#FFFFFF"}
                fontSize={12}
                fontWeight={500}
              >
                Members
              </Text>
            </Pressable>
          </HStack>
        </Box>

        {selectedTab == 0 ? (
          <Box>
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
            <FlatList
              h="450px"
              data={projectData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
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
                  onPress={() =>
                    navigation.navigate("TaskScreen", { selectedProject: item })
                  }
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
                        {item.nama_project}
                      </Text>
                      <HStack>
                        <Ionicons name="document-outline" />
                        <Text>
                          Complete Task : {item.complete_task}/{item.total_task}
                        </Text>
                      </HStack>
                      <HStack>
                        <Ionicons name="people-outline" />
                        <Text>Total Members: {item.total_member}</Text>
                      </HStack>
                    </VStack>
                    <Spacer />
                    <VStack justifyContent={"space-between"}>
                      <Box
                        fontSize="xs"
                        bg={
                          item.status_project === "0"
                            ? "#FFC8C8" // Not started
                            : item.status_project === "1"
                            ? "#F8EFA1" // On progress
                            : item.status_project === "2"
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
                            item.status_project === "0"
                              ? "#DC0909" // Not started
                              : item.status_project === "1"
                              ? "#85780B" // On progress
                              : item.status_project === "2"
                              ? "#00B67A" // Completed
                              : "#DC0909" // Default color
                          }
                          bold
                        >
                          {item.status_project === "0"
                            ? "Not Started"
                            : item.status_project === "1"
                            ? "On Progress"
                            : item.status_project === "2"
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
                        {item.batas_waktu}
                      </Text>
                      <Heading
                        alignSelf="flex-end"
                        fontSize="xs"
                        color="red.500"
                      >
                        {calculateRemainingDays(item.batas_waktu)}
                      </Heading>
                    </VStack>
                  </HStack>
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
            />
          </Box>
        ) : (
          <Box pb={5}>
            <FlatList
              h="450px"
              data={selectedTeam.list_member[0]}
              renderItem={({ item }) => (
                <Box
                  mt={3}
                  mr={5}
                  ml={5}
                  borderRadius={10}
                  bgColor="white"
                  //   borderBottomWidth="1"
                  //   _dark={{
                  //     borderColor: "muted.50",
                  //   }}
                  //   borderColor="muted.800"

                  py="3"
                >
                  <HStack justifyContent="space-between">
                    <Avatar
                      ml={5}
                      mr={10}
                      size="48px"
                      source={{
                        uri: item.avatarUrl,
                      }}
                    />
                    <VStack>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                        alignSelf="flex-start"
                      >
                        {item.nama}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {item.posisi}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="xs"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      alignSelf="flex-start"
                    >
                      {item.timeStamp}
                    </Text>
                  </HStack>
                </Box>
              )}
              keyExtractor={(item) => item.id}
            />
          </Box>
        )}
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default ProjectScreen;
