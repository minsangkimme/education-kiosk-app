import React from 'react';
import {HomeOutlined} from '@ant-design/icons';
import {useHistory} from "react-router";
import {playAudio} from "../../utils/playAudio";
import * as Styled from './styled';

const Header = ({title}) => {
  const history = useHistory();
  const {pathname} = history.location;
  const onClickHome = () => playAudio().then(() => history.replace('/main/menuType'));

  const showHomeBtn = pathname !== '/main/menuType';

  return (
    <Styled.Wrapper>
      <Styled.ServiceName>{title}</Styled.ServiceName>
      {showHomeBtn && <HomeOutlined style={{fontSize: 25}} onClick={onClickHome} />}
    </Styled.Wrapper>
  );
};

export default Header;
