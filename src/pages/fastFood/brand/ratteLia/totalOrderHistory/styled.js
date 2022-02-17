import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  max-width: 28rem;
  position: fixed;
  bottom: 95px;
  height: 170px;
  background-color: #fff;
`;

export const OrderPriceWrap = styled.div`
  background-color: #eee;
  display: flex;
  align-items: center;   
  justify-content: space-around;   
`;

export const MenuOrderHistoryWrap = styled.div`
  overflow-y: scroll;
  height: calc(100% - 34px);
  padding: 5px 0;
 
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }

`;

export const OrderInfo = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px dashed #eee;
`;

export const Price = styled.strong`
   color: #e22137;
   font-size: 22px;
`;

export const RemoveButton = styled.button`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
`;
