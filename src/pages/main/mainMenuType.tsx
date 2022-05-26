import hamburger from '../../assets/images/hamburger.jpg';
import {useHistory} from "react-router";
import {playAudio} from "../../utils/playAudio";
import * as Styled from './styled';
import Header from "../../components/header/header";
import ratteLiaLogo from "../../assets/images/ratteLia-logo.png";
import {useEffect} from "react";

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



const MainMenuType = (): React.ReactElement => {
  const history = useHistory();
  const {pathname} = history.location;
  const onClickMenuType = (id: string) => playAudio().then(() => history.push(`/main/menuType/${id}`));
  const onClickBrand = (brand: string) => history.push(`${pathname}/${brand}`);
  const isIncludePathMenuType = pathname === '/main/menuType';
  const menus = isIncludePathMenuType ? menuList : brandList;
  const onClickEvent = isIncludePathMenuType ? onClickMenuType : onClickBrand;

  useEffect(() => {
    window.ReactNativeWebView?.postMessage(JSON.stringify({url: `/main/menuType`}));
  }, []);

  return (
    <>
      <Header title="키오스크 (학습용)"/>
      <Styled.Wrap>
        <Styled.MenuWrap>
          {menus.map(menu => (
            <Styled.ImgRoundWrapper key={menu.id} onClick={() => onClickEvent(menu.id)}>
              <Styled.Img src={menu.imageSrc} alt={menu.label} />
              <strong>{menu.label}</strong>
            </Styled.ImgRoundWrapper>
          ))}
        </Styled.MenuWrap>
      </Styled.Wrap>
    </>
  );
};

export default MainMenuType;
