import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import Svg, { Circle } from "react-native-svg";
import PieChart from "react-native-pie-chart";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChartSkeleton, SkeletonLoader } from "../../components";
import tinycolor from "tinycolor2";

const Dashboard = () => {
  const navigation = useNavigation();
  const [teamData, setTeamData] = useState([]);
  const [projectCounts, setProjectCounts] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); // Tambahkan selectedTeam
  const [chartData, setChartData] = useState({
    series: [], // Data awal, bisa juga diisi sesuai kebutuhan
    sliceColor: [], // Warna awal, bisa juga diisi sesuai kebutuhan
  });
  const [userName, setUserName] = useState(""); // Tambah state untuk nama pengguna
  const [isRefreshing, setIsRefreshing] = useState(false);
  
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
            })
            .then((response) => {
              setTeamData(response.data.teams);
              setProjectData(response.data.teams.list_project);

              const seriesData = response.data.teams.map((team) =>
                parseInt(team.total_project, 10)
              );

              const generatedSliceColors = generateSliceColors(
                seriesData.length
              );
              setChartData({
                series: seriesData,
                sliceColor: generatedSliceColors,
              });

              setIsRefreshing(false); // Set refreshing to false after data is updated
            })
            .catch((error) => {
              console.error(error);
              setIsRefreshing(false); // Set refreshing to false even in case of error
            });
  
          AsyncStorage.getItem("userName")
            .then((name) => {
              if (name) {
                setUserName(name);
              }
            })
            .catch((error) => {
              console.error(error);
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
          // Jika token ditemukan, gunakan token dalam permintaan HTTP
          axios
            .get("https://gaspol.weza.co.id/detailTeam/9", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setTeamData(response.data.teams); // Menggunakan array karena respons dari endpoint detailTeam adalah objek tunggal

              // Set data project langsung dari list_project pada respons
              setProjectData(response.data.teams.list_project);

              // Mengambil data total_project dari setiap tim
              const seriesData = response.data.teams.map((team) =>
                parseInt(team.total_project, 10)
              );

              // Dynamically generate slice colors based on the number of slices
              const generatedSliceColors = generateSliceColors(
                seriesData.length
              );
              setChartData({
                series: seriesData,
                sliceColor: generatedSliceColors,
              });
            })
            .catch((error) => {
              console.error(error);
            });

          AsyncStorage.getItem("userName")
            .then((name) => {
              if (name) {
                setUserName(name);
              }
            })
            .catch((error) => {
              console.error(error);
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
  const generateSliceColors = (numSlices) => {
    const colors = [];
    for (let i = 0; i < numSlices; i++) {
      // Generate a random color in hexadecimal format and ensure it's valid
      let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      randomColor = tinycolor(randomColor).isValid() ? randomColor : "#000000"; // Use black if the color is not valid
      colors.push(randomColor);
    }
    return colors;
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.upperText}>Hi, {userName}</Text>
          <Text style={styles.lowerText}>Lets done your task today 🔥</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../../assets/Profile.png")}
            style={styles.image}
          />
        </Pressable>
      </View>

      <HStack
        style={{
          width: 350,
          height: 123,
          borderRadius: 20,
          backgroundColor: "#343A40",
          marginTop: 15,
          alignSelf: "center",
        }}
      >
        <Box>
          <Text
            color={"#FFFFFF"}
            width={130}
            fontSize={12}
            fontWeight={500}
            mt={15}
            ml={19}
          >
            Summary your active projects in all teams
          </Text>
          <Box flexDirection={"row"}>
            <Box flexDirection={"column"} alignItems={"flex-start"}>
              {teamData.map((team, index) => {
                // Ambil jumlah proyek untuk tim berdasarkan id_team dari projectCounts
                const projectCount = projectCounts[team.id] || 0;

                return (
                  <Box
                    ml={19}
                    mt={1}
                    flexDirection={"row"}
                    alignItems={"center"}
                    key={team.id}
                  >
                    <Svg
                      height={5}
                      width={5}
                      viewBox="0 0 5 5"
                      fill={chartData.sliceColor[index]}
                    >
                      <Circle
                        cx={2.5}
                        cy={2.5}
                        r={2.5}
                        fill={chartData.sliceColor[index]}
                      />
                    </Svg>
                    <Text
                      ml={4}
                      color={"#FFFFFF"}
                      fontSize={8}
                      fontWeight={500}
                    >
                      {team.team} : {team.total_project}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box ml={20} mt={15}>
          {chartData.series.length === 0 ? (
            // Render PieChartSkeleton while waiting for data
            <PieChartSkeleton />
          ) : (
            // Render PieChart when data is available
            <PieChart
              widthAndHeight={100}
              series={chartData.series}
              sliceColor={chartData.sliceColor}
              coverRadius={0.7}
              coverFill={"#FFF"}
            />
          )}
        </Box>
      </HStack>

      <Box>
        <Text mb={5} fontSize={16} fontWeight={600} mt={"20px"} ml={"20px"}>
          Project by Teams
        </Text>
        <FlatList
          ml={5}
          mr={5}
          mb={5}
          horizontal
          data={teamData}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              bgColor="#0F7EF8"
              borderRadius={20}
              px={5}
              p={2}
              marginRight={3}
              style={{
                backgroundColor:
                  selectedTeam === item.id ? "#0F7EF8" : "#0F7EF833",
              }}
              onPress={() => setSelectedTeam(item.id)} // Mengatur tim yang dipilih
            >
              <Text
                alignSelf="center"
                height={4}
                fontSize={12}
                color={
                  selectedTeam === item.id
                    ? "#FFFFFF"
                    : selectedTeam
                    ? "#0F7EF833"
                    : "#0F7EF8"
                }
                bold
              >
                {item.team}
              </Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />

        <FlatList
          h="400px"
          data={
            teamData.find((team) => team.id === selectedTeam)
              ?.list_project[0] || []
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            // Render SkeletonLoader if data is not available or is loading
            !item.nama_project ? (
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
                    <HStack alignItems={"center"}>
                      <Ionicons name="document-outline" />
                      <Text ml={2}>
                        Complete Task : {item.complete_task}/{item.total_task}
                      </Text>
                    </HStack>
                    <HStack alignItems={"center"}>
                      <Ionicons name="people-outline" />
                      <Text ml={2}>Total Members: {item.total_member}</Text>
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
                    <Heading alignSelf="flex-end" fontSize="xs" color="red.500">
                      {calculateRemainingDays(item.batas_waktu)}
                    </Heading>
                  </VStack>
                </HStack>
              </Box>
            )
          }
          keyExtractor={(item) => item.id_project}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    marginRight: 10, // Jarak antara teks dan gambar
  },
  upperText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 15,
  },
  lowerText: {
    fontSize: 12,
    marginLeft: 20,
    marginTop: 8,
  },
  image: {
    width: 47,
    height: 47,
    marginRight: 20,
    marginTop: 15,
  },
});

export default Dashboard;
