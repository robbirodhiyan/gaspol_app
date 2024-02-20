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
  Checkbox,
} from "native-base";

const ChecklistScreen = () => {
  const route = useRoute();
  const checklistData = route.params?.checklistData || {};
  const Data = checklistData.checklist_task[0];
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
              <Heading mt={2}>{checklistData.nama_task}</Heading>
              <Text>{checklistData.deskripsi_task}</Text>
              <HStack mt={3}>
                <Box mr={3}>
                  <Ionicons name="document-outline">
                    {checklistData.passed_list_task}/
                    {checklistData.total_list_task}
                  </Ionicons>
                </Box>
                <Ionicons name="people-outline">
                  {checklistData.total_member_task}
                </Ionicons>
              </HStack>
            </VStack>
          </HStack>
        </Box>
        <HStack p={5} direction="row" justifyContent="space-between">
          <Box>
            <Heading>Checklist</Heading>
          </Box>
          <Pressable onPress={() => navigation.navigate("")}>
            <Ionicons name="add" size={26}></Ionicons>
          </Pressable>
        </HStack>

        <Box>
          <Stack p={5}>
            <Input
              size="lg"
              w="100%"
              placeholder="Search Checklist..."
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
            data={Data}
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

                py="5"
              >
                <HStack space={[2, 3]} justifyContent="space-evenly">
                  <Checkbox colorScheme="blue">{item.list}</Checkbox>

                  <Spacer />
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

export default ChecklistScreen;
