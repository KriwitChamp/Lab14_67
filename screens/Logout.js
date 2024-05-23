import React from "react";
 import { TouchableOpacity, Text } from "react-native";
 import AsyncStorage from "@react-native-async-storage/async-storage";
 import { useNavigation } from "@react-navigation/native";
 import { MaterialIcons } from "@expo/vector-icons";
 import styles from "../styles";
 const Logout = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
     <MaterialIcons name="logout" size={24} color="white" />
      <Text style={styles.loginText}>Logout</Text>
    </TouchableOpacity>
  );
 };
 export default Logout;