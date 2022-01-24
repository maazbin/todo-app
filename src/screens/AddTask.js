import React, {
    useState
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native'

const  AddTask = ({navigation,route}) => {

    const [taskDescription, setTaskDescription] = useState('');

    const [taskTitle, setTaskTitle] = useState('');

    return (
        <View style={styles.contianer}>
            <View style={{...styles.textInputContainer, marginTop: 5}}>
                <TextInput 
                    placeholder="Enter task title"
                    value={taskTitle}
                    onChangeText={text => setTaskTitle(text)}
                />
            </View>
        
                <TextInput 
                    placeholder="Enter your task details..."
                    value={taskDescription}
                    onChangeText={text => setTaskDescription(text)}
                    style={{height:100,width:'100%',backgroundColor:'gray',borderRadius:10,marginTop:20,paddingHorizontal:10}}
                    numberOfLines={5}
                    textAlignVertical='top'
                />
     
            <TouchableOpacity 
                style={styles.buttonStyle}
                onPress={ ()  => {
                    route.params.addTasksCallback(taskTitle, taskDescription)
                    navigation.pop()
                }}
            >
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddTask;

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    textInputContainer: {
        height: 50,
        width: '100%',
        fontSize: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 10,
        marginTop: 30
    },
    buttonStyle: {
        width: '50%',
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 20,

    }
});