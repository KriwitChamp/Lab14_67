import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles";
const DetailScreen = ({navigation}) => {
 const handleLoginPress = () => {
   navigation.navigate("LoginScreen");
 };
 const handleApiTestPress = () => {
   navigation.navigate("ApiTest");
 };
 return (
   <View style={styles.container}>
     <Text style={styles.logo}>Details</Text>
     <ScrollView style={styles.scrollView}>
       <Text style={styles.loginText}>You are logged in!</Text>
       <TouchableOpacity style={styles.button} 
onPress={handleApiTestPress}>
         <Text style={styles.buttonText}>ApiTest</Text>
       </TouchableOpacity>
     </ScrollView>
     <View>
       <TouchableOpacity style={styles.button} 
onPress={handleLoginPress}>
         <Text style={styles.buttonText}>Login</Text>
       </TouchableOpacity>
     </View>
   </View>
 );
};
export default DetailScreen;