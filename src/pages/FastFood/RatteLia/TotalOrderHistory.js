import React from 'react';
import styled from 'styled-components';
import {convertCommaNumber} from "../../../utils/comma";

const Wrap = styled.div`
  width: 100%;
  max-width: 28rem;
  position: fixed;
  bottom: 95px;
  height: 120px;
  background-color: #fff;
`;

const OrderPriceWrap = styled.div`
  background-color: #eee;
  display: flex;
  align-items: center;   
  justify-content: space-around;   
`;

const MenuOrderHistoryWrap = styled.div`
  overflow-y: scroll;
`;

const Price = styled.strong`
   color: #e22137;
   font-size: 22px;
`;
const TotalOrderHistory = ({orderList, onClickAddOrder, onClickDecreaseOrder, onClickRemoveOrder}) => {
  const totalCount = orderList.length;
  const totalPrice = convertCommaNumber(orderList.reduce((acc, curr) => (acc + curr.price), 0));
  return (
    <Wrap>
      <OrderPriceWrap>
        <strong>총주문내역</strong>
        <strong>
          <span style={{fontSize: 18, marginRight: 5}}>{totalCount}</span>
          <span>개</span>
        </strong>
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
    </Wrap>
  );
};

export default TotalOrderHistory;
