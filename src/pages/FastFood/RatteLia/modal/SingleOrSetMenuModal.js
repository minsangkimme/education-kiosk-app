import React from 'react';
import sytled from 'styled-components';

const TitleWrap = styled.div`
  padding: 10px 30px;
  background-color: #bae7ff;
  text-align: center;
`;
const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;  
`;
const SelectWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
const SingleOrSetMenuModal = ({menu}) => {
  return (
    <div>
      <TitleWrap>
        <Title>세트로 드시겠어요?</Title>
      </TitleWrap>
      <SelectWrap>
        <div>
          <div>
            <img src={''} alt="버거만"/>
            <strong>버거만</strong>
          </div>
          <div>{menu.price}</div>
        </div>
        <div>
          <div>
            <img src={''} alt="세트"/>
            <strong>세트</strong>
          </div>
          <div>{menu.price}</div>
        </div>
      </SelectWrap>
    </div>
  );
};

export default SingleOrSetMenuModal;
