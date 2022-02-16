import React from 'react';
import hamburger from '../../assets/images/hamburger.jpg';
import {useHistory} from "react-router";
import {playAudio} from "../../utils/playAudio";
import * as Styled from './styled';
import Header from "../../components/header/header";
import ratteLiaLogo from "../../assets/images/ratteLia-logo.png";

const brandList = [{
  id: 'ratteLia',
  imageSrc: ratteLiaLogo,
  label: '라떼리아',
}];

const menuList = [{
  id: 'fastFood',
  imageSrc: hamburger,
  label: '패스트푸드',
}];

const MainMenuType = () => {
  const history = useHistory();
  const {pathname} = history.location;
  const onClickMenuType = (id) => playAudio().then(() => history.push(`/main/menuType/${id}`));
  const onClickBrand = (brand) => playAudio().then(() => history.push(`${pathname}/${brand}`));
  const menus = pathname === '/main/menuType' ? menuList : brandList;
  const onClickEvent = pathname === '/main/menuType' ? onClickMenuType : onClickBrand;

  return (
    <>
      <Header title="키오스크 (교육용)"/>
      <Styled.Wrap>
        <Styled.MenuWrap>
          {menus.map(menu => (
            <Styled.ImgRoundWrapper key={menu.id} onClick={() => onClickEvent(menu.id)}>
              <img src={menu.imageSrc} alt={menu.label} style={{width: '100%', borderRadius: '50%'}}/>
              <b>{menu.label}</b>
            </Styled.ImgRoundWrapper>
          ))}
        </Styled.MenuWrap>
      </Styled.Wrap>
    </>
  );
};

export default MainMenuType;
