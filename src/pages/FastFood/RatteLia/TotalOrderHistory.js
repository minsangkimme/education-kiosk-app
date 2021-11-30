import React, {useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {convertCommaNumber} from "../../../utils/comma";
import UpButton from '@mui/icons-material/AddCircleOutline';
import DownButton from '@mui/icons-material/RemoveCircleOutline';

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
  height: calc(100% - 34px);
  padding: 5px 0;
 
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }

`;

const OrderInfo = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px dashed #eee;
`;

const Price = styled.strong`
   color: #e22137;
   font-size: 22px;
`;

const RemoveButton = styled.button`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
`;

const TotalOrderHistory = ({orderList, onClickAddOrder, onClickDecreaseOrder, onClickRemoveOrder}) => {
  const totalCount = orderList.reduce((acc, curr) => {
    const orderQuantity = curr.type === 'set' ? curr.setOrderCount : curr.orderCount;
    return acc + orderQuantity;
  }, 0);
  const totalPrice = convertCommaNumber(orderList.reduce((acc, curr) => {
    const price = curr.type === 'set' ? curr.setPrice : curr.price;
    const orderQuantity = curr.type === 'set' ? curr.setOrderCount : curr.orderCount;
    return (acc + (price * orderQuantity));
  }, 0));

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
        {orderList.map((order, i) => {
          const price = order.type === 'set' ? order.setPrice : order.price;
          const orderQuantity = order.type === 'set' ? order.setOrderCount : order.orderCount;
          return (
            <OrderInfo key={i}>
              <strong style={{maxWidth: 90, width: 90}}>
                {order.type === 'set'
                  ? <strong>{order.name} 세트</strong>
                  : <span>{order.name}</span>
                }
              </strong>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <DownButton onClick={() => onClickDecreaseOrder(order)}/>
                <strong style={{margin: '0 5px'}}>{orderQuantity}</strong>
                <UpButton onClick={() => onClickAddOrder(order)}/>
              </div>
              <strong>{convertCommaNumber(price)} </strong>
              <RemoveButton onClick={() => onClickRemoveOrder(order)}>삭제</RemoveButton>
            </OrderInfo>
          )
        })}
      </MenuOrderHistoryWrap>
    </Wrap>
  );
};

export default TotalOrderHistory;
