import styled from "styled-components";
import {CustomSlider, settings} from '../../selectMenuList/styled';
import ClearIcon from "@mui/icons-material/Clear";

export const BottomWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
  & ul {
    margin: 0;
    padding: 2px 25px;
    background: #ffecdb;
    list-style: none;
  }
  & ul li::before {
    content: "\\2022";
    color: red;
    font-weight: bold;
    display: inline-block; 
    width: 1em;
    margin-left: -1em;
  }
`;

export const CancleButton = styled.button`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
`;

export const CompleteButton = styled.button`
  background: #ddfbd9;
  border: 1px solid #ddfbd9;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
`;

export const Wrap = styled.div`
  padding: 0 10px;  
  min-height: 300px;
  max-height: 350px;
  display: flex !important;
  flex-wrap: wrap;
  overflow-y: auto;
  justify-content: center;
`;

export const MenuWrap = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  word-break: break-all;
  text-align: center;
  margin: 10px;  
  
  & img {
    width: 65px;
    height: 45px;
  }
`;

export const Slider = styled(CustomSlider)`
  .slick-dots {
    bottom: 0;
  }
  .slick-prev, .slick-next  {
    top: 50%;
  }
`;

export const RemoveButton = styled(ClearIcon)`
  border: 1px solid #339dd6;
  border-radius: 50%;
  padding: 5px;
  position: absolute;
  left: 100%;
  bottom: 30px;
  z-index: 1;
`;

export const OrderNumber = styled.div`
  position: absolute;
  background: rgba(0,0,0,0.5);
  color: #fff;
  padding: 13px;
  text-align: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

export {
  settings
}
