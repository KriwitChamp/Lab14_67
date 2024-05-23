import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Image,
 } from "react-native";
 import { Ionicons } from "@expo/vector-icons";
 import styles from "./styles";

 const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalVisible, setAddModalVisible] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {

      const response = await fetch(
    "http://mgt2.pnu.ac.th/6360704011/employee/all_users.php"
      );
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
        setLoading(false);
      } else {
        console.error("API request failed");
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const deleteUser = async (userId) => {
    try {
      //Send a DELETE request to your API endpoint to delete the user
      const response = await fetch(
        `http://mgt2.pnu.ac.th/6360704011/employee/delete_users.php?id=${userId}
 `,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== 
userId));
        alert("User deleted successfully!");
      } else {
        console.error("Delete request failed");
        alert("User deletion failed. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setAddModalVisible(true);
  };
  const updateUser = async () => {
    try {
     
      const response = await fetch(
    `http://mgt2.pnu.ac.th/6360704011/employee/update_users.php?id=$
 {selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: selectedUser.id,
            name: updatedName,
            email: updatedEmail,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
 ? { ...user, name: updatedName, email: updatedEmail }
              : user
          )
        );
        setAddModalVisible(false); 
        alert("User updated successfully!");
      } else {
        console.error("Update request failed");
        alert("User update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    }
  };
  const openAddUserModal = () => {
    // Clear the new user input fields
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setAddModalVisible(true); 
    setSelectedUser(null); 
  };

  const addUser = async () => {
    try {
      const response = await fetch(
     "http://mgt2.pnu.ac.th/6360704011/employee/add_users.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newUserName,
            email: newUserEmail,
            password: newUserPassword,
          }),
        }
      );

      const responseData = await response.text();

      try {
        const data = JSON.parse(responseData); 
        if (data.success) {
          
          setUsers((prevUsers) => [...prevUsers, data.user]);
          setAddModalVisible(false);
          alert("User added successfully!");
        } else {
          alert("User addition failed. Please try again.");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("An error occurred while processing the response.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred while adding the user.");
    }
  };
  const renderUserItem = ({ item }) => (
    <View style={styles.userContainer}>
    <Image
        source={{ uri: "http://mgt2.pnu.ac.th/6360704011/employee/profile_pics/default.jpg" }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userInfo}>{item.name}</Text>
        <Text style={styles.userInfo}>{item.email}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteUser(item.id)}>
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          style={styles.userIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openUpdateModal(item)}>
        <Ionicons
          name="pencil-outline"
          size={24}
          color="orange"
          style={styles.userIcon}
        />
      </TouchableOpacity>
    </View>
  );
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.userContainer}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
      />
      <TouchableOpacity onPress={openAddUserModal} 
style={styles.addButton}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
      <Modal
        visible={isAddModalVisible} 
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              value={selectedUser ? updatedName : newUserName}
              onChangeText={(text) =>
                selectedUser ? setUpdatedName(text) : 
setNewUserName(text)
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={selectedUser ? updatedEmail : newUserEmail}
              onChangeText={(text) =>
                selectedUser ? setUpdatedEmail(text) : 
setNewUserEmail(text)
              }
            />
            {selectedUser ? null : (
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Password"
                value={newUserPassword}
                onChangeText={(text) => setNewUserPassword(text)}
              />
            )}
            <Button
              title={selectedUser ? "Update" : "Add User"}
              onPress={selectedUser ? updateUser : addUser}
            />
            <Button
              title="Cancel"
              onPress={() => setAddModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
 };
 export default UserList;