import React from 'react';
import * as Styled from './styled';
import adSense from "../../../../../assets/images/adSense.png";
import FooterNav from "../../../../../components/footer/footerNav";
import OrderList from "./orderList";
import PayOption from "./payOption";

const OrderPayment = ({onClickNextStep, orderList, setOrderList}) => {

  return (
    <Styled.Wrap>
      <Styled.AdWrap>
        <img src={adSense} alt="배너광고"/>
      </Styled.AdWrap>
      <Styled.ContentWrap>
        {/* 주문 내역 */}
        <OrderList orderList={orderList} />

        {/* 결제 옵션 */}
        <PayOption />
      </Styled.ContentWrap>
      <FooterNav
        showInfo="payment"
        goBackFunc={() => onClickNextStep(3)}
        onClickCancle={() => {
        }}
        goToNext={() => onClickNextStep(4)}
      />
    </Styled.Wrap>
  );
};

export default OrderPayment;
