import styles from './ListPage.module.scss'
import Inputs from '../../components/inputs/Inputs'
import { Filters } from '../../components/inputs/Inputs'
import GameList from '../../components/gameList/GameList'
import Footer from '../../components/footer/Footer'

function ListPage() {

  return (
    <>
      <div className={styles['title']}>
        <h1>Is your computer too potato?</h1>
        <p>Find out which games your PC can run</p>
      </div>
      <Inputs />
      <Filters />
      <GameList />
      <Footer />
    </>
  )
}

export default ListPage
