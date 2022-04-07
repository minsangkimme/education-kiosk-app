import React from 'react';
import * as Styled from './styled';


const OrderCancel = ({setOrderCancelAlarm, onClickCancle}) => {
  return (
    <Styled.Wrap>
      <p>
        주문 내역을 취소하시겠습니까?<br/>
      </p>
      <Styled.ButtonWrap>
        <button onClick={onClickCancle}>예</button>
        <button onClick={setOrderCancelAlarm}>아니오</button>
      </Styled.ButtonWrap>
    </Styled.Wrap>
  );
};

export default OrderCancel;

