import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import  AddTask  from './src/screens/AddTask'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListOfTask from './src/screens/ListOfTask'

export default function App() {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='ListOfTask' >
                <Stack.Screen name="ListOfTask" component={ListOfTask} />
                <Stack.Screen name="AddTask" component={AddTask} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}