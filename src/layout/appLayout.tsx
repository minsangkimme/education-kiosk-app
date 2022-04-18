import styled from 'styled-components';

const AppWrapper = styled.div`
  background: #fff;
  width: 100%;
  max-width: 28rem !important;
  margin: 0 auto;
  height: 100vh;
  box-shadow: 0px 2px 4px hsl(0deg 0% 81% / 50%);
  position: relative;
  overflow: hidden;
`;

interface Props {
  children: JSX.Element;
}

const AppLayout = ({children}: Props) => {
  return (
    <AppWrapper>
      {children}
    </AppWrapper>
  );
};

export default AppLayout;
