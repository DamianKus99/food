import styles from '../styles/Home.module.scss';
import Navbar from './Navbar';
import { BsArrowRight } from 'react-icons/bs';
import eating from "../assets/4.jpg";


export const Home = () => {
  return (
    <div className={styles.home}>

      <div className={styles.nav}>
        <Navbar/>
      </div>

      <div className={styles.bg1}>
        <div className={styles.photo1}>
          <div className={styles.photoContainer}>
            <img src={eating} alt="eating" />
          </div>
        </div>
      </div>

      <div className={styles.slogan}>
        <h1>{`This Is The Place To Name Your Restaurant`}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        <button className={styles.btn}>
          <span>See More</span>
          <BsArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Home;