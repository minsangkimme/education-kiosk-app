import React, {useRef} from 'react';
import * as Styled from './styled';
import adSense from "../../../../../assets/images/adSense.png";
import FooterNav from "../../../../../components/footer/footerNav";
import {convertCommaNumber} from "../../../../../utils/comma";

const OrderPayment = ({onClickNextStep, orderList, setOrderList}) => {
  const sliderRef = useRef(null);
  console.log(orderList)
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
              {orderList.map(order => (
                <Styled.Tr key={order.id}>
                  <Styled.Td>
                    {order.name}
                  </Styled.Td>
                  <Styled.Td>
                    {order.orderCount || order.setOrderCount}
                  </Styled.Td>
                  <Styled.Td>
                    {order.type === 'single'
                      ? convertCommaNumber(order.price)
                      : convertCommaNumber(order.setPrice)
                    }
                  </Styled.Td>
                </Styled.Tr>
              ))}
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
        onClickCancle={() => {
        }}
        goToNext={() => onClickNextStep(4)}
      />
    </Styled.Wrap>
  );
};

export default OrderPayment;
