import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import Header from '../header/Header'
import Inputs from '../inputs/Inputs'
import { Filters } from '../inputs/Inputs'
import Games from '../games/Games'

function App() {

  return (
    <>
      <Header />
      <div className={styles['title']}>
        <h1>Is your computer too potato?</h1>
        <p>Find out which games your PC can run</p>
      </div>
      <Inputs />
      <Filters />
      <Games />
    </>
  )
}

export default App
