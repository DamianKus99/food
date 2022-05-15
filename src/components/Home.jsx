import styles from '../styles/Home.module.scss';
import Navbar from './Navbar';
import { BsArrowRight } from 'react-icons/bs';
import eating from "../assets/4.jpg";
import torun from "../assets/torun.jpg";
import pierniczek from "../assets/pierniczek.png"


export const Home = () => {
  return (
    <div className={styles.home}>

      <div className={styles.nav}>
        <Navbar/>
      </div>

      <div className={styles.bg1}>
        <div className={styles.photo1}>
          <div className={styles.photoContainer}>
            <img src={torun} alt="eating" />
          </div>
        </div>
      </div>

      <div className={styles.slogan}>
        <img className={styles.piernik} src={pierniczek} alt="piernik"/>
        <p>BOGATE SMAKI I NIEPOWTARZALNE WNĘTRZE. KELNERJO TO COŚ WIĘCEJ NIŻ JEDZENIE, TO STYL BYCIA. POSZUKAJ TEGO JEDYNEGO ...</p>
      </div>
    </div>
  )
}

export default Home;