import Head from 'next/head'
import Image from 'next/image'
import TodoList from '../components/todoList'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="flex justify-center bg-blue-50 h-screen p-20">
      <TodoList />
    </div>
  )
}
