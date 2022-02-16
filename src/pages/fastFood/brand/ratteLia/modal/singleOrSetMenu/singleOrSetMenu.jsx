import React from 'react';
import single from "../../../../../../assets/images/single.png";
import {convertCommaNumber} from "../../../../../../utils/comma";
import setBurger from "../../../../../../assets/images/setburger.png";
import * as Styled from './styled';


const SingleOrSetMenu = ({onClickMenuType, menu}) => {
  return (
    <Styled.SelectWrap>
      <div>
        <Styled.TypeWrap onClick={() => onClickMenuType('single')}>
          <img src={single} alt="버거만"/>
          <strong>버거만</strong>
        </Styled.TypeWrap>
        <Styled.Price>{convertCommaNumber(menu.price)}</Styled.Price>
      </div>
      <div>
        <Styled.TypeWrap onClick={() => onClickMenuType('set')}>
          <img src={setBurger} alt="세트"/>
          <strong>세트</strong>
        </Styled.TypeWrap>
        <Styled.Price>{convertCommaNumber(menu.setPrice)}</Styled.Price>
      </div>
    </Styled.SelectWrap>
  );
};

export default SingleOrSetMenu;
