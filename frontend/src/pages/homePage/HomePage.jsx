import styles from './HomePage.module.scss'
import Inputs from '../../components/inputs/Inputs'
import { Filters } from '../../components/inputs/Inputs'
import GameList from '../../components/gameList/GameList'
import Footer from '../../components/footer/Footer'
import { useEffect, useState } from 'react'

function HomePage() {
  const [gamesList, setGamesList] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [date, setDate] = useState("2019-01-01,2025-01-01");
  const [genre, setGenre] = useState("action")
  const [query, setQuery] = useState('')

  const fetchData = async () => {
    console.log('Fetching data...')
    setIsLoading(true)
    setError(false);
    try {
      let response = await fetch(`http://localhost:3000/games?page=${page}&date=${date}&genre=${genre}`);

      const result = await response.json()

      if (!result.next) {
        setHasMore(false)
        return console.warn('The End')
      }

      if (result.results == undefined || result.results.length == 0) {
        setError(true);
        return console.warn('No game found')
      }

      setGamesList(prevGamesList => [...prevGamesList, ...result.results])

      console.log(result)
    } catch (error) {
      console.error("Error fetching JSON:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
  }

  const fetchSearchData = async () => {
    console.log('Fetching search data...')
    setIsLoading(true)
    setError(false);
    try {
      const query_from_url = window.location.search.slice(1)
      console.log('QUERY: ', query_from_url)

      let response = await fetch(`http://localhost:3000/games/search/${query_from_url}&page=${page}&date=${date}&genre=${genre}`);

      const result = await response.json()

      if (!result.next) {
        setHasMore(false)
        return console.warn('The End')
      }

      if (result.results == undefined || result.results.length == 0) {
        setError(true);
        return console.warn('No game found')
      }

      setGamesList(prevGamesList => [...prevGamesList, ...result.results])

      console.log(result)
    } catch (error) {
      console.error("Error fetching JSON:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
  }

  useEffect(() => {
    window.location.search ? fetchSearchData() : fetchData();
    console.log(page)
  }, [page, date, genre]);

  return (
    <>
      <div className={styles['title']}>
        <h1>Is your computer too potato?</h1>
        <p>Find out which games your PC can run</p>
      </div>
      <Inputs />
      <Filters
        date={date}
        setDate={setDate}
        genre={genre}
        setGenre={setGenre}
        setGamesList={setGamesList}
        setQuery={setQuery}
        fetchData={fetchData} />
      <GameList
        date={date}
        setDate={setDate}
        setPage={setPage}
        gamesList={gamesList}
        error={error}
        isLoading={isLoading}
        hasMore={hasMore} />
    </>
  )
}

export default HomePage
