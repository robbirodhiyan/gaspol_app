import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
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
  Flex,
  Container,
  FlatList,
  Spacer,
  Avatar,
  Stack,
  Icon,
} from "native-base";

const TaskScreen = () => {
  const route = useRoute();
  const selectedProject = route.params?.selectedProject || {};
  const taskData = selectedProject.task[0];
  const navigation = useNavigation();
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
            onPress={() => {
              // Perform project creation logic here
              // Once done, navigate back to "ProjectScreen"
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back-circle-outline" size={28} />
            <Text style={styles.textButton}>back</Text>
          </Pressable>
        </Box>
        <Box p={5}>
          <HStack>
            <VStack>
              <Box
                fontSize="xs"
                bg={
                  selectedProject.status_project === "0"
                    ? "#FFC8C8" // Not started
                    : selectedProject.status_project === "1"
                    ? "#F8EFA1" // On progress
                    : selectedProject.status_project === "2"
                    ? "#C3E6CB" // Completed
                    : "#F8EFA1" // Default color
                }
                paddingLeft={2}
                paddingRight={2}
                mr={200}
                rounded={8}
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
              >
                <Text
                  color={
                    selectedProject.status_project === "0"
                      ? "#DC0909" // Not started
                      : selectedProject.status_project === "1"
                      ? "#85780B" // On progress
                      : selectedProject.status_project === "2"
                      ? "#00B67A" // Completed
                      : "#DC0909" // Default color
                  }
                  bold
                >
                  {selectedProject.status_project === "0"
                    ? "Not Started"
                    : selectedProject.status_project === "1"
                    ? "On Progress"
                    : selectedProject.status_project === "2"
                    ? "Completed"
                    : "Unknown Status"}
                </Text>
              </Box>
              <Heading mt={2}>{selectedProject.nama_project}</Heading>
              <Text>{selectedProject.deskripsi_project}</Text>
              <HStack mt={3}>
                <Box mr={3}>
                  <Ionicons name="document-outline">
                    {selectedProject.total_task}
                  </Ionicons>
                </Box>
                <Ionicons name="people-outline">
                  {selectedProject.total_member}
                </Ionicons>
              </HStack>
            </VStack>
          </HStack>
        </Box>
        <HStack p={5} direction="row" justifyContent="space-between">
          <Box>
            <Heading>Task List</Heading>
          </Box>
          <Pressable
            onPress={() =>
              navigation.navigate("CreateTaskScreen", {
                id_project: selectedProject.id_project, // Pass the team ID as a parameter
              })
            }
          >
            <Ionicons name="add" size={26}></Ionicons>
          </Pressable>
        </HStack>

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
            data={taskData}
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
                  navigation.navigate("ChecklistScreen", {
                    checklistData: item, // Kirim data checklist sebagai parameter
                  })
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
                      {item.nama_task}
                    </Text>
                    <HStack>
                      <Ionicons name="document-outline" />
                      <Text>
                        Checklist : {item.passed_list_task}/
                        {item.total_list_task}
                      </Text>
                    </HStack>
                    <HStack>
                      <Ionicons name="people-outline" />
                      <Text>Total Members: {item.total_member_task}</Text>
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
                    <Heading alignSelf="flex-end" fontSize="xs" color="red.500">
                      {calculateRemainingDays(item.batas_task)}
                    </Heading>
                  </VStack>
                </HStack>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
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

export default TaskScreen;
