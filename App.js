import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import UpdateProfile from "./screens/UpdateProfile";
import UserPage from "./screens/UserPage";
import AdminPage from "./screens/AdminPage";
import LoginScreen from "./screens/LoginScreen";
import ContentScreen from "./screens/ContentScreen";
import DetailScreen from "./screens/DetailScreen";
import HomeScreen from "./screens/HomeScreen";
import UserList from "./UserList";
import ApiTest from "./ApiTest";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const horizontalAnimation = {
  gestureDirection: "horizontal",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
 };

 function HomeStack() {
  return (
    <Stack.Navigator screenOptions={horizontalAnimation}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "หน้า HomeScreen",
          headerStyle: {
            backgroundColor: "#FF7F50",
          },
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          title: "หน้า LoginScreen",
          headerStyle: {
            backgroundColor: "#FF7F50",
          },
        }}
      />

<Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          title: "โปรไฟล์",
          headerStyle: {
            backgroundColor: "#FF7F50",
          },
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#003f5c", 
          },
          title: "แก้ไขข้อมูล",
          headerStyle: {
            backgroundColor: "#FF7F50",
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#003f5c", 
          },
          title: "สมัครสมาชิก",
          headerStyle: {
            backgroundColor: "#FF7F50",
          },
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#003f5c",
          },
          title: "หน้า DetailScreen",
          headerStyle: {
            backgroundColor: "#FF7F50",
          },
        }}
      />
      <Stack.Screen
        name="AdminPage"
        component={AdminPage}
        options={{
          headerShown: true,
          title: "หน้า Admin",
          headerStyle: {
            backgroundColor: "#FF7F50",
          },
        }}
      />
      <Stack.Screen
        name="UserPage"
        component={UserPage}
        options={{
          headerShown: true,
          title: "หน้า User",
          headerStyle: {
            backgroundColor: "#FF7F50",
          },
        }}
      />
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{
          headerShown: true,
          title: "หน้า UserList",
          headerStyle: {
            backgroundColor: "#FF7F50",
          },
        }}
      />
      <Stack.Screen
        name="ApiTest"
        component={ApiTest}
        options={{
          headerShown: true,
          title: "หน้า ApiTest",
          headerStyle: {
            backgroundColor: "#FF7F50",
          },
        }}
      />
    </Stack.Navigator>
  );
 }

 const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName=""
        screenOptions={{
          headerShown: true,
          //tabBarShowLabel: false, 
          tabBarActiveTintColor: "#e91e63",
          activeColor: "#f0edf6",
          inactiveColor: "#3e2465",
          //tabBarStyle: { backgroundColor: "#003f5c" },
          headerStyle: {
            backgroundColor: "#003f5c", 
          },
        }}
        barStyle={{ paddingBottom: 48 }}
      >
        <Tab.Screen
          name="TabHomeScreen"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#003f5c", 
            },
            title: null, 
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-home" color="blue" size={18} />
            ),
          }}
        />
        <Tab.Screen
          name="ContentScreen"
          component={ContentScreen}
          options={{
            tabBarLabel: "Content",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#003f5c", 
            },
            title: null, 
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="content-paste"
                color="blue"
                size={18}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TabDetailScreen"
          component={DetailScreen}
          options={{
            tabBarLabel: "Details",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#003f5c", 
            },
            title: null, 
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color="blue" 
size={18} />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Logout"
          component={LoginScreen}
          options={{
            tabBarLabel: "Login",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#003f5c", 
            },
            title: null, 
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color="blue" size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
 };
 export default App;