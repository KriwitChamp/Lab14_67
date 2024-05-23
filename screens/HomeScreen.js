import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import styles from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeScreen = () => {
 const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object
 // Function to handle the log in button press
 const handleLoginPress = () => {
   // Redirect to the login screen
   navigation.navigate("LoginScreen");
 };
 return (
   <SafeAreaView style={styles.container}>
       <Text style={styles.logo}>Home</Text>
       <Text style={styles.inputText}>Place Home data.</Text>
       <TouchableOpacity style={styles.button} 
onPress={handleLoginPress}>
         <Text style={styles.inputText}>Login</Text>
       </TouchableOpacity>
   </SafeAreaView>
 );
};
export default HomeScreen;