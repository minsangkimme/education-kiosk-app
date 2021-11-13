import React from 'react';
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import single from "../../../../assets/images/single.png";
import {convertCommaNumber} from "../../../../utils/comma";
import setBurger from "../../../../assets/images/setburger.png";

const Wrap = styled.div`
  display: ${({open}) => open ? 'block' : 'none'};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: #fff;
  width: 90%;
`;

const ModalBackDrop = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: ${({open}) => open ? 'block' : 'none'};
`;

const TitleWrap = styled.div`
  background-color: #bae7ff;
  text-align: center;
  padding: 10px;
`;
const Title = styled.h3`
  display: inline-block;
  font-weight: bold;  
  margin: 0;
`;
const SelectWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
`;
const CloseButton = styled(ClearIcon)`
  vertical-align: bottom;
  position: relative;
  left: 50px;
  color: #339dd6;
  font-weight: bold;
  border: 1px solid #339dd6;
  border-radius: 3px;
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

const ChoiceDesertModal = ({open, setOpen}) => {
  return (
    <>
      <Wrap open={open}>
        <TitleWrap>
          <Title>세트로 드시겠어요?</Title>
          <CloseButton onClick={() => setOpen(false)} />
        </TitleWrap>
        {/*<SelectWrap>*/}
        {/*  <div>*/}
        {/*    <TypeWrap onClick={() => onClickMenuType('single')}>*/}
        {/*      <img src={single} alt="버거만"/>*/}
        {/*      <strong>버거만</strong>*/}
        {/*    </TypeWrap>*/}
        {/*    <Price>{convertCommaNumber(menu.price)}</Price>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <TypeWrap onClick={() => onClickMenuType('set')}>*/}
        {/*      <img src={setBurger} alt="세트"/>*/}
        {/*      <strong>세트</strong>*/}
        {/*    </TypeWrap>*/}
        {/*    <Price>{convertCommaNumber(menu.setPrice)}</Price>*/}
        {/*  </div>*/}
        {/*</SelectWrap>*/}
      </Wrap>
      <ModalBackDrop open={open} />
    </>
  );
};

export default ChoiceDesertModal;
