import React from 'react';
import styles from './receipt.module.css';
import receipt from '../../../../../../assets/images/receipt.png';

const ReceiptModal = ({onClickNextStep}) => {
  return (
    <section className={styles.receipt}>
      <div className={styles.infoWrap}>
        <div className={styles.icon}>
          <img src={receipt} alt=""/>
        </div>
        <p className={styles.description}>
          <span className={styles.strong}>결제영수증이</span> 필요하신 <br/>
          고객께서는 <span className={styles.strong}>발행버튼</span>을 <br/>
          눌러주세요.
        </p>
      </div>
      <span className={styles.text}>미발행 선택 시 대기번호만 출력</span>
      <div className={styles.buttonWrap}>
        <button onClick={onClickNextStep} className={styles.receiptPrint}>영수증 발행</button>
        <button onClick={onClickNextStep} className={styles.receiptPrint}>대기번호 발행<br/> (영수증 미발행)</button>
      </div>
    </section>
  );
};

export default ReceiptModal;
