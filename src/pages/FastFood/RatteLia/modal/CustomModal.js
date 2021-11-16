import React from 'react';
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";

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
  background-color: ${({bgColor}) => bgColor ? bgColor : '#bae7ff'};
  text-align: center;
  padding: 10px;
`;
const Title = styled.h3`
  display: inline-block;
  font-weight: bold;  
  margin: 0;
`;
const CloseButton = styled(ClearIcon)`
  vertical-align: bottom;
  position: relative;
  left: 9px;
  color: #339dd6;
  font-weight: bold;
  border: 1px solid #339dd6;
  border-radius: 3px;
`;

const CustomModal = ({open, title, tBgColor, backDrop, bodyData, setOpen}) => {
  return (
    <>
      <Wrap open={open}>
        <TitleWrap bgColor={tBgColor}>
          <Title>{title}</Title>
          <CloseButton onClick={() => setOpen(false)} />
        </TitleWrap>
        {bodyData}
      </Wrap>
      <ModalBackDrop open={backDrop} />
    </>
  );
};

export default CustomModal;
