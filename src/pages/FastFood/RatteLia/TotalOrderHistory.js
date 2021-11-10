import React from 'react';
import styled from 'styled-components';
import {convertCommaNumber} from "../../../utils/comma";

const OrderPriceWrap = styled.div`
  background-color: #eee;
  display: flex;
  align-items: center;  
`;

const MenuOrderHistoryWrap = styled.div`
  overflow-y: scroll;
`;

const Price = styled.strong`
   color: #e22137;
`;
const TotalOrderHistory = ({orderList, onClickAddOrder, onClickDecreaseOrder, onClickRemoveOrder}) => {
  const totalCount = orderList.length;
  const totalPrice = convertCommaNumber(orderList.reduce((acc, curr) => (acc + curr.price), 0));
  return (
    <div>
      <OrderPriceWrap>
        <strong>총주문내역</strong>
        <strong>{totalCount} <span>개</span></strong>
        <Price>{totalPrice}</Price>
      </OrderPriceWrap>
      <MenuOrderHistoryWrap>
        {orderList.map((order) => (
          <div>
            <strong>{order.name}</strong>
            <div>
              <span>{order.orderCount}</span>
              <div>
                <button onClick={() => onClickAddOrder(order)}>+</button>
                <button onClick={() => onClickDecreaseOrder(order)}>-</button>
              </div>
            </div>
            <div>{convertCommaNumber(order.price)} </div>
            <button onClick={() => onClickRemoveOrder(order)}>삭제</button>
          </div>
        ))}
      </MenuOrderHistoryWrap>
    </div>
  );
};

export default TotalOrderHistory;
