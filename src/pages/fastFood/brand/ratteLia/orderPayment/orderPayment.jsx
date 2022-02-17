import React from 'react';
import * as Styled from './styled';
import adSense from "../../../../../assets/images/adSense.png";
import FooterNav from "../../../../../components/footer/footerNav";

const OrderPayment = ({onClickNextStep}) => {
  return (
    <Styled.Wrap>
      <Styled.AdWrap>
        <img src={adSense} alt="배너광고"/>
      </Styled.AdWrap>
      <Styled.ContentWrap>
        {/* 주문 내역 */}
        <Styled.OrderList>
          <Styled.Table>
            <thead>
              <Styled.Tr>
                <Styled.Th>제품</Styled.Th>
                <Styled.Th>수량</Styled.Th>
                <Styled.Th>금액</Styled.Th>
              </Styled.Tr>
            </thead>
            <tbody>
              <Styled.Tr>
                <Styled.Td>사이다 (S.스몰)</Styled.Td>
                <Styled.Td>1</Styled.Td>
                <Styled.Td>1,000</Styled.Td>
              </Styled.Tr>
            </tbody>
          </Styled.Table>
        </Styled.OrderList>

        {/* 결제 옵션 */}
        <Styled.PaymentOption>
        </Styled.PaymentOption>
      </Styled.ContentWrap>
      <FooterNav
        showInfo="payment"
        goBackFunc={() => onClickNextStep(3)}
        onClickCancle={() => {}}
        goToNext={() => onClickNextStep(4)}
      />
    </Styled.Wrap>
  );
};

export default OrderPayment;
