import React from 'react';
import {convertCommaNumber} from "../../../../../utils/comma";
import UpButton from '@mui/icons-material/AddCircleOutline';
import DownButton from '@mui/icons-material/RemoveCircleOutline';
import * as Styled from './styled';


const TotalOrderHistory = ({orderList, handleAddOrder, onClickSubtractOrder, onClickDeleteOrder}) => {
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
    <Styled.Wrap>
      <Styled.OrderPriceWrap>
        <strong>총주문내역</strong>
        <strong>
          <span style={{fontSize: 18, marginRight: 5}}>{totalCount}</span>
          <span>개</span>
        </strong>
        <Styled.Price>{totalPrice}</Styled.Price>
      </Styled.OrderPriceWrap>
      <Styled.MenuOrderHistoryWrap>
        {orderList.map((order, i) => {
          const price = order.type === 'set' ? order.setPrice : order.price;
          const orderQuantity = order.type === 'set' ? order.setOrderCount : order.orderCount;
          return (
            <Styled.OrderInfo key={i}>
              <strong style={{maxWidth: 90, width: 90}}>
                {order.type === 'set'
                  ? <strong>{order.name} 세트</strong>
                  : <span>{order.name}</span>
                }
              </strong>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <DownButton onClick={() => onClickSubtractOrder(order)}/>
                <strong style={{margin: '0 5px'}}>{orderQuantity}</strong>
                <UpButton onClick={() => handleAddOrder(order)}/>
              </div>
              <strong>{convertCommaNumber(price)} </strong>
              <Styled.RemoveButton onClick={() => onClickDeleteOrder(order)}>삭제</Styled.RemoveButton>
            </Styled.OrderInfo>
          )
        })}
      </Styled.MenuOrderHistoryWrap>
    </Styled.Wrap>
  );
};

export default TotalOrderHistory;
