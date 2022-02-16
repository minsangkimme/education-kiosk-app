import React from 'react';
import * as Styled from './styled';


const CustomModal = ({open, title, tBgColor, backDrop, bodyData, setOpen}) => {
  return (
    <>
      <Styled.Wrap open={open}>
        <Styled.TitleWrap bgColor={tBgColor}>
          <Styled.Title>{title}</Styled.Title>
          <Styled.CloseButton onClick={() => setOpen(false)} />
        </Styled.TitleWrap>
        {bodyData}
      </Styled.Wrap>
      <Styled.ModalBackDrop open={backDrop} />
    </>
  );
};

export default CustomModal;
