import React , {useState} from "react";
import { View , Text, StyleSheet, Modal, TouchableHighlight , StyleProp , ViewStyle , Alert} from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function Task_list () : JSX.Element  {
    const [task , setTask] = useState('');
    const [tasks , setTasks] = useState<{ id: number; title: string; completed: boolean }[]>([]);
    const [showModal , setShowModal] = useState(false);

    const addTask = () => {
        if (task.trim() !== '')
            {
                setTasks([...tasks, { id: Date.now(), title: task, completed: false }]);
                setTask('');
                setShowModal(false);
            }
    } ;
    const toggleTaskCompletion = (task_id : number) => {
        const update_task = tasks.map(item => {
            if (item.id === task_id){
                return {...item , completed: !item.completed };
            }
            return item;
        });
        setTasks(update_task);
    }
    const deleteTask = (task_id: number) => {
        setTasks(tasks.filter((item) => item.id !== task_id));
    }
    const handleLongPress = (task_id : number) => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "Delete",
                onPress: () => deleteTask(task_id),
                style: "destructive"
              }
            ]
          );
        };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>To-Do List</Text>
            <ScrollView>
                {
                tasks.map(item => (
                <TouchableOpacity 
                key={item.id}
                onPress={() =>{
                    console.log("Task toggled:", item.title); 
                    toggleTaskCompletion(item.id)
                } }
                onLongPress={() => {handleLongPress(item.id)}}
                style={styles.task}
                >
                <Text style={[styles.task_text, item.completed && styles.completed_task_text as StyleProp<ViewStyle>]}>{item.title}</Text>
                </TouchableOpacity>
                    ))
                }
                {/* <TouchableOpacity style={styles.task}>
                <Text style={styles.task_text}>Hi !! How are you</Text>
                </TouchableOpacity> */}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowModal(true)}>
                <View style={styles.circle_area}>
                <Text style={styles.plus_text}>+</Text>
                </View>
            </TouchableOpacity>
            <Modal visible={showModal} animationType="slide">
            <View style={styles.modalContainer}>
                    <TextInput 
                    placeholder="Enter Task" 
                    style={styles.TextInput}
                    value={task}
                    onChangeText={text => setTask(text)}/>
                    <TouchableHighlight onPress={addTask} >
                        <View style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add</Text>
                        </View>
                    </TouchableHighlight>  
                    </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create(
    {
        container:{
            flex : 1,
            backgroundColor : 'plum',
            alignItems : 'center'

        },
        title:{
            fontSize : 20 ,
            fontWeight : 'bold',
            marginBottom : 30 , 
            color : 'black'
        },
        task: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderWidth: 2,
            width:'100%',
            backgroundColor: 'white',
            borderRadius: 10 ,
            marginBottom : 15
          },
          task_text:{
            color: 'black',
            fontSize: 16, 
            fontWeight : 'bold'
          },
          circle_area:{
            backgroundColor: '#7CFC00',
            width: 100,
            height: 100,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom : 20
          },
          plus_text: {
            fontSize: 50, 
            fontWeight : 'bold'
          },
          modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          },
          TextInput: {
            borderWidth: 3,
            borderColor: 'black',
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
            width: '80%',
            fontWeight : 'bold'
          },
          addButton: {
            backgroundColor: '#ADFF2F',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderWidth: 3,
            borderRadius: 5, 
            marginTop: 10
          },
          addButtonText:{
            fontSize : 16,
            fontWeight: 'bold',
            fontStyle: 'italic'
          },
          completed_task_text: {
            color: 'black',
            fontSize: 16, 
            fontWeight : 'bold',
            textDecorationLine: 'line-through',
            textDecorationStyle: 'solid'
          }
    }
)
