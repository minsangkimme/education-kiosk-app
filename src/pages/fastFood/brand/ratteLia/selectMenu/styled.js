import styled from "styled-components";

export const Wrap = styled.div`
   height: 100%;   
`;

export const ContentLayout = styled.div`
  height: calc(100vh - 95px);
  overflow-y: auto;
`;

export const AdWrap = styled.div`
  width: 100%;
  min-height: 122.75px;
  & img {
    width: 100%;    
  }
`;
