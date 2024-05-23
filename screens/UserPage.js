import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
const loremIpsum = `
 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id 
tristique arcu. Nullam scelerisque odio in urna hendrerit venenatis. 
Suspendisse potenti. Sed gravida enim non quam ultrices, in 
bibendum libero mattis. Vivamus dignissim quam nec tortor 
bibendum vehicula. Fusce convallis erat et tortor mattis, vel volutpat 
elit suscipit. Duis vestibulum, mi a vulputate hendrerit, nulla urna 
tincidunt ligula, nec suscipit urna libero eget arcu. Proin ac sodales 
felis. Fusce sit amet sollicitudin arcu. Nulla facilisi. Sed id nisi in risus 
tincidunt egestas. Aenean id ante nec erat tristique tristique. 
Phasellus aliquam libero eget augue euismod mattis.
 Phasellus eget justo in urna consequat bibendum nec ut libero. 
Etiam a fringilla massa. Maecenas id purus a felis vulputate lacinia ac 
ac sapien. Morbi sit amet elit ac est gravida viverra. Nunc ac tincidunt 
mi. Nulla facilisi. Etiam convallis cursus enim, quis tincidunt leo 
fringilla non. Praesent non nunc in enim congue condimentum. 
Vestibulum cursus varius hendrerit.
 Integer et enim ac nisi cursus ultrices id id felis. Pellentesque sed 
ante eget ex venenatis bibendum nec eu odio. Maecenas ac volutpat 
purus. Nam in scelerisque urna. Nullam vel magna nec nisl vehicula 
blandit. Integer pharetra, odio eget eleifend vehicula, dolor neque 
malesuada turpis, a blandit libero lorem eu purus. Praesent congue 
viverra justo, non tristique ligula elementum non.
 Suspendisse potenti. Praesent vel arcu sit amet lectus scelerisque 
sodales. Etiam laoreet turpis ut lectus auctor congue. Fusce sed 
libero facilisis, euismod purus sed, dapibus nunc. Nullam hendrerit 
ipsum ac libero venenatis, quis pharetra nisi auctor. In hac habitasse 
platea dictumst. Vestibulum sit amet vulputate libero, ut posuere 
ipsum. Nulla facilisi. Nulla aliquam tellus a purus ullamcorper, non 
eleifend sapien convallis. Vivamus ac odio eu ante tristique dictum.
 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id 
tristique arcu. Nullam scelerisque odio in urna hendrerit venenatis. 
Suspendisse potenti. Sed gravida enim non quam ultrices, in 
bibendum libero mattis. Vivamus dignissim quam nec tortor 
bibendum vehicula. Fusce convallis erat et tortor mattis, vel volutpat 
elit suscipit. Duis vestibulum, mi a vulputate hendrerit, nulla urna 
tincidunt ligula, nec suscipit urna libero eget arcu. Proin ac sodales 
felis. Fusce sit amet sollicitudin arcu. Nulla facilisi. Sed id nisi in risus 
tincidunt egestas. Aenean id ante nec erat tristique tristique. 
Phasellus aliquam libero eget augue euismod mattis.
 Phasellus eget justo in urna consequat bibendum nec ut libero. 
Etiam a fringilla massa. Maecenas id purus a felis vulputate lacinia ac 
ac sapien. Morbi sit amet elit ac est gravida viverra. Nunc ac tincidunt 
mi. Nulla facilisi. Etiam convallis cursus enim, quis tincidunt leo 
fringilla non. Praesent non nunc in enim congue condimentum. 
Vestibulum cursus varius hendrerit.
 Integer et enim ac nisi cursus ultrices id id felis. Pellentesque sed 
ante eget ex venenatis bibendum nec eu odio. Maecenas ac volutpat 
purus. Nam in scelerisque urna. Nullam vel magna nec nisl vehicula 
blandit. Integer pharetra, odio eget eleifend vehicula, dolor neque 
malesuada turpis, a blandit libero lorem eu purus. Praesent congue 
viverra justo, non tristique ligula elementum non.
 Suspendisse potenti. Praesent vel arcu sit amet lectus scelerisque 
sodales. Etiam laoreet turpis ut lectus auctor congue. Fusce sed 
libero facilisis, euismod purus sed, dapibus nunc. Nullam hendrerit 
ipsum ac libero venenatis, quis pharetra nisi auctor. In hac habitasse 
platea dictumst. Vestibulum sit amet vulputate libero, ut posuere 
ipsum. Nulla facilisi. Nulla aliquam tellus a purus ullamcorper, non 
eleifend sapien convallis. Vivamus ac odio eu ante tristique dictum.
 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id 
tristique arcu. Nullam scelerisque odio in urna hendrerit venenatis. 
Suspendisse potenti. Sed gravida enim non quam ultrices, in 
bibendum libero mattis. Vivamus dignissim quam nec tortor 
bibendum vehicula. Fusce convallis erat et tortor mattis, vel volutpat 
elit suscipit. Duis vestibulum, mi a vulputate hendrerit, nulla urna 
tincidunt ligula, nec suscipit urna libero eget arcu. Proin ac sodales 
felis. Fusce sit amet sollicitudin arcu. Nulla facilisi. Sed id nisi in risus 
tincidunt egestas. Aenean id ante nec erat tristique tristique. 
Phasellus aliquam libero eget augue euismod mattis.
 Phasellus eget justo in urna consequat bibendum nec ut libero. 
Etiam a fringilla massa. Maecenas id purus a felis vulputate lacinia ac 
ac sapien. Morbi sit amet elit ac est gravida viverra. Nunc ac tincidunt 
mi. Nulla facilisi. Etiam convallis cursus enim, quis tincidunt leo 
fringilla non. Praesent non nunc in enim congue condimentum. 
Vestibulum cursus varius hendrerit.
 Integer et enim ac nisi cursus ultrices id id felis. Pellentesque sed 
ante eget ex venenatis bibendum nec eu odio. Maecenas ac volutpat 
purus. Nam in scelerisque urna. Nullam vel magna nec nisl vehicula 
blandit. Integer pharetra, odio eget eleifend vehicula, dolor neque 
malesuada turpis, a blandit libero lorem eu purus. Praesent congue 
viverra justo, non tristique ligula elementum non.
 Suspendisse potenti. Praesent vel arcu sit amet lectus scelerisque 
sodales. Etiam laoreet turpis ut lectus auctor congue. Fusce sed 
libero facilisis, euismod purus sed, dapibus nunc. Nullam hendrerit 
ipsum ac libero venenatis, quis pharetra nisi auctor. In hac habitasse 
platea dictumst. Vestibulum sit amet vulputate libero, ut posuere 
ipsum. Nulla facilisi. Nulla aliquam tellus a purus ullamcorper, non 
eleifend sapien convallis. Vivamus ac odio eu ante tristique dictum.
 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id 
tristique arcu. Nullam scelerisque odio in urna hendrerit venenatis. 
Suspendisse potenti. Sed gravida enim non quam ultrices, in 
bibendum libero mattis. Vivamus dignissim quam nec tortor 
bibendum vehicula. Fusce convallis erat et tortor mattis, vel volutpat 
elit suscipit. Duis vestibulum, mi a vulputate hendrerit, nulla urna 
tincidunt ligula, nec suscipit urna libero eget arcu. Proin ac sodales 
felis. Fusce sit amet sollicitudin arcu. Nulla facilisi. Sed id nisi in risus 
tincidunt egestas. Aenean id ante nec erat tristique tristique. 
Phasellus aliquam libero eget augue euismod mattis.
 Phasellus eget justo in urna consequat bibendum nec ut libero. 
Etiam a fringilla massa. Maecenas id purus a felis vulputate lacinia ac 
ac sapien. Morbi sit amet elit ac est gravida viverra. Nunc ac tincidunt 
mi. Nulla facilisi. Etiam convallis cursus enim, quis tincidunt leo 
fringilla non. Praesent non nunc in enim congue condimentum. 
Vestibulum cursus varius hendrerit.
 Integer et enim ac nisi cursus ultrices id id felis. Pellentesque sed 
ante eget ex venenatis bibendum nec eu odio. Maecenas ac volutpat 
purus. Nam in scelerisque urna. Nullam vel magna nec nisl vehicula 
blandit. Integer pharetra, odio eget eleifend vehicula, dolor neque 
malesuada turpis, a blandit libero lorem eu purus. Praesent congue 
viverra justo, non tristique ligula elementum non.
 Suspendisse potenti. Praesent vel arcu sit amet lectus scelerisque 
sodales. Etiam laoreet turpis ut lectus auctor congue. Fusce sed 
libero facilisis, euismod purus sed, dapibus nunc. Nullam hendrerit 
ipsum ac libero venenatis, quis pharetra nisi auctor. In hac habitasse 
platea dictumst. Vestibulum sit amet vulputate libero, ut posuere 
ipsum. Nulla facilisi. Nulla aliquam tellus a purus ullamcorper, non 
eleifend sapien convallis. Vivamus ac odio eu ante tristique dictum.
 `;
const UserPage = ({ route }) => {
 const { Email,UserId } = route.params;
 const navigation = useNavigation();
 const [token, setToken] = useState("");
console.log(Email)
 useEffect(() => {
   const checkToken = async () => {
     try {
       const storedToken = await AsyncStorage.getItem("token");
       if (storedToken) {
         setToken(storedToken);
       } else {
         navigation.replace("LoginScreen");
       }
     } catch (error) {
       console.error("Error checking token:", error);
       Alert.alert("Error", "An error occurred while checking the token.");
     }
   };
   checkToken();
 }, []);
 return (
   <View style={styles.container}>
     <Text style={styles.logo}>UserPage:{UserId}</Text>
     <Text style={styles.loginText}>Email: {Email}</Text>
     <TouchableOpacity
       style={styles.loginBtn}
       onPress={() => navigation.navigate("Profile", { Email: Email })}
     >
       <Text style={styles.loginText}>Profile</Text>
     </TouchableOpacity>
     <ScrollView style={styles.scrollView}>
       <Text style={styles.loginText}>{loremIpsum}</Text>
       {/* Add any additional content you want to display when logged 
in */}
     </ScrollView>
   </View>
 );
};
export default UserPage;