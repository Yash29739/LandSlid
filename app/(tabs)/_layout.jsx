import { View, Text ,Image} from 'react-native'
import {Tabs,Redirect} from 'expo-router'
import React from 'react'
import {icons} from '../../constants'

const Tabicons=({icon,color,name,focused})=>{
    return (
        <View className=" justify-center items-center  gap-1">
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused?'font-psemibold':'font-pregular'}text-xs`} style={{color:color}}>{name}</Text>
        </View>
    )
}

const Tabslayout = () => {
  return (
    <>
        <Tabs 
        screenOptions={{
            tabBarShowLabel:false,
            tabBarActiveTintColor:'#ffa001',
            tabBarInactiveTintColor:'#cdcde0',
            tabBarStyle:{
                backgroundColor:'#161622',
                borderTopWidth:1,
                borderTopColor:'#232533',
                height:64
            }
        }}
        >
            <Tabs.Screen name="home" 
                options={{
                    title:'Home',
                    headerShown:false,
                    tabBarIcon:({color,focused})=>(
                        <Tabicons
                            icon={icons.home}
                            color={color}
                            name='Home'
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen name="bookmarks" 
                options={{
                    title:'Bookmarks',
                    headerShown:false,
                    tabBarIcon:({color,focused})=>(
                        <Tabicons
                            icon={icons.bookmark}
                            color={color}
                            name='Bookmarks'
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen name="create" 
                options={{
                    title:'Create',
                    headerShown:false,
                    tabBarIcon:({color,focused})=>(
                        <Tabicons
                            icon={icons.plus}
                            color={color}
                            name='Create'
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen name="profile" 
                options={{
                    title:'Profile',
                    headerShown:false,
                    tabBarIcon:({color,focused})=>(
                        <Tabicons
                            icon={icons.profile}
                            color={color}
                            name='Profile'
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    </>
  )
}

export default Tabslayout