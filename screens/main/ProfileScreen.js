import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {
  Box,
  Pressable,
  Text,
  Image,
  Input,
  IconButton,
  useToken,
  ScrollView,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [userName, setUserName] = useState(""); // Tambah state untuk nama pengguna
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  AsyncStorage.getItem("userName")
    .then((name) => {
      if (name) {
        setUserName(name);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  AsyncStorage.getItem("email")
    .then((email) => {
      if (email) {
        setEmail(email);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  AsyncStorage.getItem("position")
    .then((posisi) => {
      if (posisi) {
        setPosition(posisi);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const handleLogout = async () => {
    try {
      Alert.alert(
        "Konfirmasi Logout",
        "Apakah Anda yakin ingin logout?",
        [
          {
            text: "Batal",
            onPress: () => console.log("Logout dibatalkan"),
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: async () => {
              // Hapus token autentikasi dari penyimpanan
              await AsyncStorage.removeItem("token");

              // Navigasikan pengguna ke layar login
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "LoginScreen" }],
                })
              );
              console.log("Logout berhasil");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView>
      <Box
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Ionicons name="chevron-back-circle-outline" size={28} />
          <Text style={styles.textButton}>back</Text>
        </Pressable>
        <IconButton
          icon={<Ionicons name="log-out-outline" size={28} color={"#FF0000"} />}
          onPress={handleLogout}
          colorScheme={"danger"}
          mr={3}
        />
      </Box>
      <Box alignSelf={"center"} alignItems={"center"}>
        <Image
          source={require("../../assets/Profile.png")}
          alt="Profile"
          size={"81px"}
          alignSelf={"center"}
        />
        <Text fontSize={18} fontWeight={600} mt={5}>
          {userName}
        </Text>
        <Text fontSize={12} fontWeight={400} mt={1}>
          {position}
        </Text>
      </Box>
      <Box
        w={"100%"}
        h={"100%"}
        bg={"#F8F9FA"}
        mt={35}
        borderTopLeftRadius={"20px"}
        borderTopRightRadius={"20px"}
        alignItems={"center"}
      >
        <Box
          w={"350px"}
          h={"50px"}
          marginTop={"30px"}
          borderRadius={"7px"}
          bgColor={"#E6E6E7"}
          flexDirection={"row"}
          alignItems={"center"}
          paddingLeft={2}
          paddingRight={2}
        >
          <Pressable
            w={"50%"}
            h={"37px"}
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
              Your Profile
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
              Password
            </Text>
          </Pressable>
        </Box>
        {selectedTab == 0 ? (
          <ScrollView mb={537} showsVerticalScrollIndicator={false}>
            <Box alignSelf={"flex-start"} mt={5} ml={5} mr={5}>
              <Text fontSize={14} fontWeight={400}>
                Full Name
              </Text>
              <Input
                placeholder="Name"
                height={60}
                width={350}
                mt={1}
                defaultValue={userName}
              />
              <Text fontSize={14} fontWeight={400} mt={5}>
                Email
              </Text>
              <Input
                placeholder="Email"
                height={60}
                width={350}
                mt={1}
                defaultValue={email}
              />
              <Text fontSize={14} fontWeight={400} mt={5}>
                Position
              </Text>
              <Input
                isDisabled={true}
                placeholder="Position"
                height={60}
                width={350}
                mt={1}
                defaultValue={position}
              />
              <Pressable
                mt={5}
                onPress={() => navigation.navigate("#")}
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
                  Save
                </Text>
              </Pressable>
            </Box>
          </ScrollView>
        ) : (
          <ScrollView mb={537} showsVerticalScrollIndicator={false}>
            <Box alignSelf={"flex-start"} mt={5} ml={5} mr={5}>
              <Text fontSize={14} fontWeight={400}>
                Current Password
              </Text>
              <Input
                placeholder="Enter your current password"
                height={60}
                width={350}
                mt={1}
              />
              <Text fontSize={14} fontWeight={400} mt={5}>
                New Password
              </Text>
              <Input
                type="password"
                placeholder="Enter a new password"
                height={60}
                width={350}
                mt={1}
              />
              <Text color={"#8A8A8A"} fontSize={12}>
                Minimum password is 8 character
              </Text>
              <Text fontSize={14} fontWeight={400} mt={5}>
                Confirm Password
              </Text>
              <Input
                type="password"
                placeholder="Confirm your new password"
                height={60}
                width={350}
                mt={1}
              />
              <Pressable
                mt={5}
                onPress={() => navigation.navigate("#")}
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
                  Change Password
                </Text>
              </Pressable>
            </Box>
          </ScrollView>
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

export default ProfileScreen;
