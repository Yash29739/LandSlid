import React, { useState } from "react";
import { Link ,router} from "expo-router";
import { View, Text, ScrollView,Dimensions, Image,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { signIn ,getCurrentUser} from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [form,setForm]=useState({
    email:'',
    password:''
  })
  const {setUser,setIsLoggedIn}=useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false)    
  const submit=async()=>{
    if(form.email===""||form.password===""){
      Alert.alert('Error','Please fill in all the fields.')
    }
    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");

    } catch (error) {
      Alert.alert('Error',error.message)
    }finally{
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="justify-center text-2xl text-white text-semibold mt-10 font-psemibold">
            Log-In to Aora
          </Text>
          <FormField 
          title="Email"
          value={form.email}
          handleChangeText={(e)=>setForm({...form,email: e})}
          otherStyles="mt-7"
          keyboardType="email-address"
          />
          <FormField 
          title="Password"
          value={form.password}
          handleChangeText={(e)=>setForm({...form,password: e})}
          otherStyles="mt-7"
          keyboardType="email-address"
          />
          <CustomButton 
          title="Sign-In"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading = {isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Dont have an Account?</Text>
            <Link href="/signup" className="text-lg text-secondary font-psemibold underline">Sign-Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
