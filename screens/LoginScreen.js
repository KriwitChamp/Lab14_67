import React, { useState } from "react";
 import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
 import { useNavigation } from "@react-navigation/native";
 import AsyncStorage from "@react-native-async-storage/async-storage";
 import styles from "../styles";
 const LoginScreen = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigation = useNavigation();
  const isEmailValid = (email) => {
    const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const handleLogin = async () => {
    try {
      if (!Email) {
        Alert.alert("กรุณากรอกอีเมล!");
        return; 
      } else if (!isEmailValid(Email)) {
        Alert.alert("รูปแบบอีเมลไม่ถูกต้อง!");
        return; 
      } else if (!Password) {
        Alert.alert("กรุณากรอกรหัสผ่าน!");
        return; 
      }
      const response = await fetch(
        "http://mgt2.pnu.ac.th/6360704011/employee/login.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: Email,
            password: Password,
          }),
        }
      );
      const rawResponse = await response.text();
      const data = JSON.parse(rawResponse);
      let UserId = data.user.id[0];
      if (data.success === 1) {
        const status = data.user?.status;
        const token = data.token;
        await AsyncStorage.setItem("token", token);
        if (data.user) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        }
        if (status === "users") {
          navigation.navigate("UserPage", {UserId,Email});
        }  else if (status === "admin") {
          navigation.navigate("AdminPage", { UserId,Email });
        } else {
          Alert.alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
      } else {
        Alert.alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyApp</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)} 
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}
 >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => 
navigation.navigate("Register")}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
 };
 export default LoginScreen;