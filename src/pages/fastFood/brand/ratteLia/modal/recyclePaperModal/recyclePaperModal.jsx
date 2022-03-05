import React from 'react';
import styles from './recyclePaperModal.module.css';
import recyclePaper from '../../../../../../assets/images/recycle-bag.png';

const RecyclePaperModal = ({onClickButton}) => {
  return (
    <section className={styles.wrap}>
      <div className={styles.content}>
        <img src={recyclePaper} alt="종이백" />
        <p className={styles.desc}>
          <span className={styles.strong}>종이백</span>이 필요하신 <br/>
          고객께서는 <span className={styles.strongX2}>100원</span>에 <br/>
          구매 가능합니다.
        </p>
      </div>
      <div className={styles.text}>비닐봉투 제공 불가</div>
      <div className={styles.buttonWrap}>
        <button onClick={onClickButton} className={styles.button}>예</button>
        <button onClick={onClickButton} className={styles.button}>아니오</button>
      </div>
    </section>
  );
};

export default RecyclePaperModal;
