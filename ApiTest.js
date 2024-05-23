import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
export default function ApiTest() {
 const [users, setUsers] = useState([]);
 const fetchData = async () => {
   try {
     const res = await fetch("https://reqres.in/api/users/");
     const json = await res.json();
     setUsers(json.data);
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 };

 useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello ReqRes users!</Text>
      <View style={styles.flex}>
        {users.length > 0 ? (
          users.map((user) => (
            <View key={user.id} style={styles.userContainer}>
              <Text>
                <Text style={styles.boldText}>{user.first_name}</Text>
              </Text>
              <Text>{user.email}</Text>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
 }
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flex: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  userContainer: {
    margin: 10,
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
 });