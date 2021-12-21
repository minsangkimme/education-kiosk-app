import React from 'react';
import styled from 'styled-components';

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 15px;
`;

const Wrap = styled.div`
  padding: 10px;
`

const OrderCancel = ({setOrderCancelAlarm, onClickCancle}) => {
  return (
    <Wrap>
      <p>
        주문 내역을 취소하시겠습니까?<br/>
      </p>
      <ButtonWrap>
        <button onClick={onClickCancle}>예</button>
        <button onClick={() => setOrderCancelAlarm(false)}>아니오</button>
      </ButtonWrap>
    </Wrap>
  );
};

export default OrderCancel;

