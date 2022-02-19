import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
  createdAt: Date,
  text: string,
  tags?: string[],
  isCompleted: boolean
}

interface Todos {
    todos: Todo[]
}

const TODO_STORAGE_KEY = "@doday_todos"

export default function App() {
  const [todoValue, setTodoValue] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    initialGetTodos()
  }, [])

  const initialGetTodos = async () => {
    const todos = await getTodos()
    if (todos) console.log(todos.todos)
    if (todos) setTodos(todos.todos)
  }

  const handlePress = () => {
    if(!todoValue) return
    // console.log(todoValue)
    storeData(buildTodo(todoValue))
  }

  const buildTodo = (todoText: string): Todo => {
    return {
      text: todoText,
      createdAt: new Date(),
      isCompleted: false
    }
  }

  const getTodos = async (): Promise<Todos | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(TODO_STORAGE_KEY)
      return jsonValue != null ? JSON.parse(jsonValue) as Todos : null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const storeData = async (value: Todo) => {
    try {
      const existingTodos = await getTodos()
      if (existingTodos) {
        // console.log(existingTodos)
      }
      const todos = existingTodos ? [...existingTodos.todos, value] : [value]
      const jsonValue = JSON.stringify({ todos })
      await AsyncStorage.setItem(TODO_STORAGE_KEY, jsonValue)
      setTodos([...todos, value])
    } catch (e) {
      // saving error
      console.error(e)
    }
  }

  return (
    <View style={styles.container}>
      { todos.map((todo) => {
        return (<Text>{todo.text}</Text>)
      })}
      <Text>Open up App.tsx to start working on your app!</Text>
      <TextInput 
        placeholder="🥑 Buy some avocados..."
        value={todoValue}
        onChangeText={setTodoValue}
      />
      <Button 
        onPress={handlePress}
        disabled={!todoValue}
        title="submit"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
