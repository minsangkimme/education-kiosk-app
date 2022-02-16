import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";

export const Wrap = styled.div`
  display: ${({open}) => open ? 'block' : 'none'};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: #fff;
  width: 90%;
  text-align: center;
`;

export const ModalBackDrop = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: ${({open}) => open ? 'block' : 'none'};
`;

export const TitleWrap = styled.div`
  background-color: ${({bgColor}) => bgColor ? bgColor : '#bae7ff'};
  text-align: center;
  padding: 10px;
`;
export const Title = styled.h3`
  display: inline-block;
  font-weight: bold;  
  margin: 0;
`;
export const CloseButton = styled(ClearIcon)`
  vertical-align: bottom;
  position: absolute;
  right: 15px;
  color: #339dd6;
  font-weight: bold;
  border: 1px solid #339dd6;
  border-radius: 3px;
`;
