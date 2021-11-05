import React from 'react';
import ratteLiaLogo from '../../assets/images/ratteLia-logo.png';
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

const MenuBrand = () => {
  const history = useHistory();
  const {pathname} = history.location;
  const menuList = [{
    brand: 'ratteLia',
    imageSrc: ratteLiaLogo,
    label: '라떼리아',
  }];

  const onClickBrand = (brand) => playAudio().then(() => history.push(`${pathname}/${brand}`));

  const renderMenus = menuList.map(v => {
    return (
      <ImgRoundWrapper key={v.brand} onClick={() => onClickBrand(v.brand)}>
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

export default MenuBrand;
