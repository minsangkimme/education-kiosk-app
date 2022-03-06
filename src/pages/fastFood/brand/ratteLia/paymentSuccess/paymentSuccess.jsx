import React, {useEffect} from 'react';
import styles from './paymentSuccess.module.css';
import receipt from '../../../../../assets/images/receipt.png';
import {useHistory} from "react-router";

const PaymentSuccess = ({setOrderList}) => {
  const orderNumber = Math.ceil(Math.random() * 999);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setOrderList([]);
      history.push('/main');
    }, 2500)
  }, []);

  return (
    <section className={styles.wrap}>
      <h1 className={styles.logo}>RATTERIA</h1>
      <h2 className={styles.success}>결제가 되었습니다</h2>
      <p className={styles.info}>주문번호</p>
      <p className={styles.orderNumber}>{orderNumber}</p>
      <p className={styles.info}>메뉴가 준비 되면 주문번호 호출 모니터로 안내해 드립니다.</p>
      <img src={receipt} alt="영수증" className={styles.receipt} />
    </section>
  );
};

export default PaymentSuccess;
