import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 TextInput,
 ActivityIndicator,
 TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";
const UpdateProfile = ({ route, navigation }) => {
 const [name, setName] = useState(route.params.name);
 const [email, setEmail] = useState(route.params.Email);
 const [id, setId] = useState(route.params.id);
 const [isLoading, setIsLoading] = useState(false);
 useEffect(() => {
   checkToken(); 
 }, []);
 const checkToken = async () => {
   try {
     const token = await AsyncStorage.getItem("token");
     if (!token) {
       navigation.navigate("LoginScreen");
     }
   } catch (error) {
     console.error(error);
   }
 };
 const handleUpdateProfile = async () => {
   if (!name || !email) {
     alert("Name and Email are required fields.");
     return;
   }
   setIsLoading(true);
   const data = {
     name: name,
     email: email,
     id: route.params.id,
   };
fetch("http://mgt2.pnu.ac.th/6360704011/employee/update_profile.php", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
   })
     .then((response) => response.json())
     .then((data) => {
       console.log(data);
       if (data.success) {
         alert("Profile updated successfully.");
         navigation.goBack();
       } else {
         alert("Failed to update profile.");
       }
     })
     .catch((error) => {
       console.log(error);
       console.error("Error:", error);
     })
     .finally(() => {
       setIsLoading(false);
     });
 };
 return (
   <View style={styles.container}>
     <Text style={styles.logo}>Profile:{id}</Text>
     <View style={styles.inputView}>
       <TextInput
         style={styles.inputText}
         placeholder="Name"
         onChangeText={(text) => setName(text)}
         value={name}
       />
     </View>
     <View style={styles.inputView}>
       <TextInput
         style={styles.inputText}
         placeholder="Email"
         onChangeText={(text) => setEmail(text)}
         value={email}
         keyboardType="email-address"
       />
     </View>
     <View style={styles.loginBtn}>
       <TouchableOpacity onPress={handleUpdateProfile} 
disabled={isLoading}>
         <MaterialIcons name="update" size={24} color="white" />
       </TouchableOpacity>
       <Text style={styles.text}>Update</Text>
     </View>
     {isLoading && <ActivityIndicator size="large" color="blue" />}
   </View>
 );
};
export default UpdateProfile;