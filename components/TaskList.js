import React,{useState,useEffect} from 'react'
import { View, Text,FlatList,RefreshControl } from 'react-native'
import {deleteTask, getTasks} from '../api'
import TaskItem from './TaskItem'
import {useIsFocused} from '@react-navigation/native'


const TaskList = () => {


    const [tasks,setTasks] = useState([]);

    const [refresing,setRefresing] = useState(false);

const isfocused = useIsFocused();
    const loadTasks = async () => {
        const data = await getTasks()
        console.log('loaded')
        setTasks(data)
    }

    useEffect(() => {
        
        loadTasks();

    },[isfocused]);

    const handleDelete = async (id)  =>{
        await deleteTask(id)
        await loadTasks()
    }

    const renderItem = ({item}) => {
        return <TaskItem task = {item} handleDelete={handleDelete}/>;
        }

        const onRefresh = React.useCallback(async () => {
            setRefresing(true);
            await loadTasks();
            setRefresing(false);
        })

    return (
        <FlatList
        style={{
            width: '100%'
        }}
            data = {tasks}
            //probar si sirve el key extractor
            keyExtractor={(item) => item.id + ''}
            renderItem = {renderItem}
            refreshControl = {
                <RefreshControl
                refreshing= {refresing}
                colors={["#78e08f"]}
                onRefresh={onRefresh}
                progressBackgroundColor='#0a3d62'
                />
            }
            
            />
    )
}

export default TaskList
