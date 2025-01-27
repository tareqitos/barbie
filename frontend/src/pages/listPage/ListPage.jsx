import styles from './ListPage.module.scss'
import Inputs from '../../components/inputs/Inputs'
import { Filters } from '../../components/inputs/Inputs'
import GameList from '../../components/gameList/GameList'
import Footer from '../../components/footer/Footer'
import { useEffect, useState } from 'react'

function ListPage() {
  const [gamesList, setGamesList] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [date, setDate] = useState("");

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/games?page=${page}&date=${date}`);
      const result = await response.json()
      setGamesList(prevGamesList => [...prevGamesList, ...result.results])

      console.log(result)
    } catch (error) {
      console.error("Error fetching JSON:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
    }
  }

  useEffect(() => {
    // if (gamesList.length == 0) {
    //     window.scrollTo(0, 0);
    // }

    fetchData();

    console.log(page)
  }, [page]);

  return (
    <>
      <div className={styles['title']}>
        <h1>Is your computer too potato?</h1>
        <p>Find out which games your PC can run</p>
      </div>
      <Inputs />
      <Filters 
      setDate={setDate} 
      fetchData={fetchData}
      setGamesList={setGamesList} />
      <GameList
        date={date}
        setDate={setDate}
        setPage={setPage}
        gamesList={gamesList}
        isLoading={isLoading} />
      <Footer />
    </>
  )
}

export default ListPage
