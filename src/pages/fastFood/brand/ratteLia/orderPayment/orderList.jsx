import React from 'react';
import * as Styled from "./styled";
import {convertCommaNumber} from "../../../../../utils/comma";

const TOTAL_LINE = 10;

const OrderList = ({ orderList }) => {
  const dummyLine = '*'.repeat(TOTAL_LINE - orderList.length).split('');
  return (
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
        {/* 오더 리스트 */}
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
        {/* 더미 라인 */}
        {dummyLine.map((_, i) => (
          <Styled.Tr key={i}>
            <Styled.Td/>
            <Styled.Td/>
            <Styled.Td/>
          </Styled.Tr>
        ))}
        </tbody>
      </Styled.Table>
      <Styled.InfoWrap>
        <Styled.InfoRow>
          <Styled.InfoData>주문금액</Styled.InfoData>
          <Styled.InfoData>700</Styled.InfoData>
        </Styled.InfoRow>
        <Styled.InfoRow>
          <Styled.InfoData>할인금액</Styled.InfoData>
          <Styled.InfoData>0</Styled.InfoData>
        </Styled.InfoRow>
        <Styled.InfoRow>
          <Styled.Pay>결제할금액</Styled.Pay>
          <Styled.TotalPay>700</Styled.TotalPay>
        </Styled.InfoRow>
      </Styled.InfoWrap>
    </Styled.OrderList>
  );
};

export default OrderList;
