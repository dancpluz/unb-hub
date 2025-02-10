import { Image, Text, View } from 'react-native'
import { Tabs, Redirect } from "expo-router";
import React from 'react'
import home from '../../assets/icons/home.png'
import bookmark from '../../assets/icons/bookmark.png'


export function TabIcon({ icon, color, name, focused }) {
  return (
    <View className='items-center justify-center'>
      <Image 
        source={icon}
        style={{ resizeMode: 'cover', tintColor: color }}
        className='w-20 h-20'
        //style={{ width: 200, height: 200 }}
      />
      <Text className={`text-xs ${focused ? 'text-semantic-action-0 font-isemibold' : 'font-iregular text-text-1'}`}>
        {name}
      </Text>
    </View>
  )
}

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name='home'
          options={{ 
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={home}
                color={color}
                name='Home'
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='agenda'
          options={{
            title: 'Agenda',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={bookmark}
                color={color}
                name='Agenda'
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='grade'
          options={{
            title: 'Grade',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={bookmark}
                color={color}
                name='Grade'
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='fluxograma'
          options={{
            title: 'Fluxograma',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={home}
                color={color}
                name='Fluxograma'
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='materias'
          options={{
            title: 'Matérias',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={home}
                color={color}
                name='Matérias'
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}