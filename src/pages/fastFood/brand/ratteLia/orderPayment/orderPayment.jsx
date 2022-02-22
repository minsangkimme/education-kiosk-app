import React from 'react';
import * as Styled from './styled';
import adSense from "../../../../../assets/images/adSense.png";
import FooterNav from "../../../../../components/footer/footerNav";
import OrderList from "./orderList";

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
        <Styled.PaymentOption>
            <Styled.OptionWrap>
              <Styled.StepWrap>
                <Styled.StepTitle>Step 1 포장을 선택하세요.</Styled.StepTitle>
                <ul>
                  <li>
                    <span>포장</span>
                    <span>(1회용기 제공)</span>
                  </li>
                  <li>
                    <span>매장</span>
                    <span>(다회용기 제공)</span>
                  </li>
                </ul>
              </Styled.StepWrap>
              <Styled.StepWrap>
                <Styled.StepTitle>Step 2 할인/적립을 선택하세요.</Styled.StepTitle>
                <ul>
                  <li>제휴사 할인</li>
                  <li>Point 적립/사용</li>
                  <li>선택없음</li>
                </ul>
              </Styled.StepWrap>
              <Styled.StepWrap>
                <Styled.StepTitle>Step 3 결제를 선택하세요.</Styled.StepTitle>
                <ul>
                  <li>신용/체크카드</li>
                  <li>모바일/바코드/페이류(PAY)</li>
                  <li>R.PAY</li>
                </ul>
              </Styled.StepWrap>
            </Styled.OptionWrap>
        </Styled.PaymentOption>
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
