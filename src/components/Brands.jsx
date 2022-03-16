import styles from '../styles/Brands.module.scss';
import { ReactComponent as Logo1} from "../assets/logos/logo5.svg";
import { ReactComponent as Logo2} from "../assets/logos/logo6.svg";
import { ReactComponent as Logo3} from "../assets/logos/logo7.svg";

export const Brands = () => {
  return (
    <div className={styles.container}>
        <div className={styles.inner}>
            <div className={styles.logo}>
                <Logo1 />
            </div>
            <div className={styles.logo}>
                <Logo2 />
            </div>
            <div className={styles.logo}>
                <Logo3 />
            </div>
        </div>
    </div>
  )
}

export default Brands;