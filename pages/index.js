import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from './login'

export default function Home() {
  return (
    <div style={{"overflow":"hidden"}}>
      <Login></Login>
    </div>
  )
}
