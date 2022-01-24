import React, {
    useState,
    useEffect
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'

const  ListOfTask = ({navigation})=> {

    const [tasks, setTasks] = useState([]);

    useEffect(_ => {
        getTasksFromLS();
    }, []);

    const getTasksFromLS = async _ => {
        try {
            const jsonValue = await AsyncStorage.getItem('tasks');
            console.log('Array: ', jsonValue);
            jsonValue != null ? setTasks(JSON.parse(jsonValue)) : null
        } catch (e) {
        
        }
    }

    const pushTask = async (title, taskDiscription) => {
        const allTasks = tasks;
        setTasks([...allTasks, {
            id: tasks.length,
            title,
            activity: taskDiscription,
            completed: false
        }]);

        try {
            const jsonValue = JSON.stringify([...allTasks, {
                id: tasks.length,
                title,
                activity: taskDiscription,
                completed: false
            }])
            await AsyncStorage.setItem('tasks', jsonValue)
        } catch (e) {
        
            console.error(e);
        }
        console.log('Done.')
    }

    const deleteTask = async id => {
        const updatedTasksList = tasks.filter(task => task.id !== id);
        setTasks([...updatedTasksList]);
        try {
            const jsonValue = JSON.stringify(updatedTasksList)
            await AsyncStorage.setItem('tasks', jsonValue)
        } catch (e) {
            // save error
            console.error(e);
        }
        console.log('Done.')
    }

    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.contianer}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'lightgreen',paddingHorizontal:10,borderRadius:10,marginTop:10}}>
                <TextInput
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                    placeholder='Search'
                    placeholderTextColor={'pink'}
                    style={{width:'80%',height:50,backgroundColor:'red',paddingHorizontal:10,borderRadius:10}}
                />
                <Image  source={require('../../assets/Vector.png')} style={{tintColor:'black',width:20,height:20}}/>

            </View>
            {tasks.length > 0 ? <FlatList
                data={tasks}
                renderItem={({ item, index }) => {
                    if (item.title.toLowerCase().startsWith(searchText.toLowerCase()) == true) {
                    return (

                        <View style={styles.taskItemContainer}>
                            <View>
                                <Text style={styles.itemTitleStyle}>{item.title}</Text>
                                <Text style={styles.taskDiscriptionStyle}>{item.activity}</Text>
                            </View>
                            <View
                                style={styles.secondaryContainer}
                            >
                                <View>
                                    <CheckBox
                                        disabled={false}
                                        value={item.completed}
                                        onValueChange={newValue => {
                                            const allTasks = tasks;
                                            allTasks[index].completed = newValue
                                            setTasks([...allTasks]);
                                        }}
                                        tintColor="red"
                                        onTintColor="red"
                                        onCheckColor="red"
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.binView}
                                    onPress={_ => {
                                        deleteTask(item.id)
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/bin.png')}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            tintColor:'red'
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    else{
                        return;
                    }
                }}
                showsVerticalScrollIndicator={false}
            /> : <View style={styles.noTaskTextContainer}>
                <Text style={styles.noTaskTextStyle}>Nothing to show</Text>
            </View>}
            <View style={styles.addIconContainer}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate('AddTask', {
                        addTasksCallback: (title, taskDesc) => {
                            pushTask(title, taskDesc)
                        }
                    })}
                >
                    <Image
                        source={require('../../assets/add.png')}
                        style={styles.addIconStyle}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ListOfTask;

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        paddingHorizontal: 20
    },
    headingTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    taskItemContainer: {
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'pink',
        marginVertical: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    taskDiscriptionStyle: {
        fontSize: 20,
        color:'red'
    },
    addIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    headingTextStyle: {
        fontSize: 30,
    },
    buttonStyle: {
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusIcon: {
        fontSize: 30,
        color: 'white'
    },
    taskItemParentContainer: {
        flexDirection: 'row',
        width: '80%'
    },
    binImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    noTaskTextContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    noTaskTextStyle: {
        fontSize: 30
    },
    addIconStyle: {
        width: 40,
        height: 40
    },
    secondaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    binView: {
        marginLeft: 20
    },
    itemTitleStyle: {
        fontSize: 30,
        color:'red'
    }
});