import styled from "styled-components";

export const Wrap = styled.div`
   height: 100%;
   overflow-y: auto;
`;

export const AdWrap = styled.div`
  width: 100%;
  min-height: 122.75px;
  & img {
    width: 100%;    
  }
`;

export const NotiText = styled.div`
  background-color: #ffecdb;
  text-align: center;
  padding: 6px;
  font-size: 19px;
  font-weight: bold;
`

export const CardWrap = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
  padding: 15px;
  cursor: pointer;
  height: 262px;
  &:hover {
    background-color: #ff937f5c;
    color: #fff;
  }
`;

export const ImgWrap = styled.div`
  margin-top: 12px;
  & img {
    width: 100%;
  }
`;
export const CardTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding-left: 40px;
  color: #ff937f;
`;

export const ItemList = styled.ul`
  list-style: none;
  font-weight: bold;
`;

export const CouponCashWrap = styled.div`
  display: flex;
  cursor: pointer;
`;
export const BottomView = styled.div`
  width: 50%;
  min-height: 257px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 6px 10px;
  border-right: 1px solid;
  &:last-child {
    border-right: 0;
  }
  &:first-child:hover {
    background-color: #66aa8873;
    color: #fff;
  }
  &:last-child:hover {
    background-color: #4477aa69;
    color: #fff;
  }
`;

export const CouponTitle = styled.div`
  font-size: 17px;
  //margin: 25px 0 0;
  font-weight: bold;
  color: #6a8;
`;

export const CashTitle = styled.div`
  font-size: 17px;
  text-align: center;
  font-weight: bold;
  color: #47a;  
`;

export const ContentLayout = styled.div`
  height: calc(100vh - 95px);
  overflow-y: auto;
`;
