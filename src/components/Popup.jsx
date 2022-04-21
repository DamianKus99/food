import React from "react";
import styles from "../styles/Popupstyle.scss"
 
const Popup = props => {
  return (
    <div className={styles.popupbox}>
      <div className={styles.box}>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;