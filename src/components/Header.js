import React from 'react';
import styled from 'styled-components';
import {HomeOutlined} from '@ant-design/icons';
import {useHistory} from "react-router";
import {playAudio} from "../utils/playAudio";

const Wrapper = styled.header` 
  display: flex;
  align-items: center;
  border-bottom: 1px solid #fff;
  padding: 20px 15px;
  background-color: rgba(226,33,55, 0.9);
  color: #fff;
`

const ServiceName = styled.div`
  font-size: 25px;  
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;  
`;

const Header = ({title}) => {
  const history = useHistory();
  const {pathname} = history.location;
  const onClickHome = () => playAudio().then(() => history.replace('/main/menuType'));

  const showHomeBtn = pathname !== '/main/menuType';

  return (
    <Wrapper>
      <ServiceName>{title}</ServiceName>
      {showHomeBtn && <HomeOutlined style={{fontSize: 25}} onClick={onClickHome} />}
    </Wrapper>
  );
};

export default Header;
