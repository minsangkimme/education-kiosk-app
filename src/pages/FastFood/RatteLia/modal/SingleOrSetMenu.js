import React from 'react';
import single from "../../../../assets/images/single.png";
import {convertCommaNumber} from "../../../../utils/comma";
import setBurger from "../../../../assets/images/setburger.png";
import styled from "styled-components";

const SelectWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
`;

const TypeWrap = styled.div`
  border: 1px solid #fa1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5px;
`;

const Price = styled.strong`
  display: block;
  text-align: center;
  color: #e22137;
  margin-top: 10px;
`;

const SingleOrSetMenu = ({onClickMenuType, menu}) => {
  return (
    <SelectWrap>
      <div>
        <TypeWrap onClick={() => onClickMenuType('single')}>
          <img src={single} alt="버거만"/>
          <strong>버거만</strong>
        </TypeWrap>
        <Price>{convertCommaNumber(menu.price)}</Price>
      </div>
      <div>
        <TypeWrap onClick={() => onClickMenuType('set')}>
          <img src={setBurger} alt="세트"/>
          <strong>세트</strong>
        </TypeWrap>
        <Price>{convertCommaNumber(menu.setPrice)}</Price>
      </div>
    </SelectWrap>
  );
};

export default SingleOrSetMenu;
