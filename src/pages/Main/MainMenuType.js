import React from 'react';
import hamburger from '../../assets/images/hamburger.jpg';
import styled from 'styled-components';
import clickSound from '../../assets/sound/mixkit-mouse-click-close-1113.wav';
import {useHistory} from "react-router";
import {playAudio} from "../../utils/playAudio";

const Wrap = styled.div`
  padding: 20px;
  height: 100%;  
`;

const MenuWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
const ImgRoundWrapper = styled.div`
  width: 85px;  
  text-align: center;
  margin: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const MainMenuType = (props) => {
  const history = useHistory();
  const menuList = [{
    id: 'fastFood',
    imageSrc: hamburger,
    label: '패스트푸드',
  }];

  const onClickMenuType = (id) => playAudio().then(() => history.push(`/main/menuType/${id}`));

  const renderMenus = menuList.map(v => {
    return (
      <ImgRoundWrapper key={v.id} onClick={() => onClickMenuType(v.id)}>
        <img src={v.imageSrc} alt={v.label} style={{width: '100%', borderRadius: '50%'}} />
        <b>{v.label}</b>
      </ImgRoundWrapper>
    )
  });

  return (
    <Wrap>
      <MenuWrap>
        {renderMenus}
      </MenuWrap>
    </Wrap>
  );
};

export default MainMenuType;
