import styled from "styled-components";

export const Wrap = styled.div`
   height: 100%;
   overflow-y: auto;
   font-family: blackHanSans, serif;
   background: #ededed;
`;

export const ScreenWrap = styled.div`
  display: flex;
  flex-direction: column;    
`;

export const TopView = styled.div`
  background-color: #fff;
  padding: 30px 0 0;
  min-height: 421px;
  border-bottom: 3px solid #000;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
`;

export const BottomView = styled.div`
  border-top: 3px solid #000;  
  text-align: center;  
  background-color: #fff;
  cursor: pointer;
  min-height: 421px;
`;

export const HereOrderText = styled.p`
  font-size: 64px;
  letter-spacing: -4px;
  line-height: 1;
  color: #a33;
  margin: 15px;
`;

export const ScreenTouchTextWrap = styled.div`
  color: #000;
  background: #ffde55;
  position: relative;
  font-size: 25px;
  width: 240px;
  margin: 0 auto 30px;
  left: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
`;

export const ScreenTouchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: #ffde55;
  width: 50px;
  height: 50px;
  border: 4px solid #c53;
  position: absolute;
  left: -34px;
  top: -6px;  
`;

export const ImageWrap = styled.span`
  border-radius: 25px;
  background: #ffde55;
  width: 30px;
  height: 30px;
  border: 4px solid #c53;
`;

export const AdOnText = styled.p`
  color: #a33;
  font-size: 30px;
  margin: 15px 0 0;
  letter-spacing: -1px;
`;
