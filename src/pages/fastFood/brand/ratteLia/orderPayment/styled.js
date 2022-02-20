import styled from "styled-components";

export const Wrap = styled.div`
   height: 100%;   
`;

export const ContentWrap = styled.div`
  height: calc(100% - 218.59px);
  padding: 5px;
  display: flex;
  
`;

export const AdWrap = styled.div`
  width: 100%;
  min-height: 122.75px;
  & img {
    width: 100%;    
  }
`;

export const OrderList = styled.div`
  width: 50%;
  height: 100%;
  background: #fff;
`;

export const PaymentOption = styled.div`
  width: 50%;
  height: 100%;
  box-shadow: 0 0 3px 1px rgb(255 0 0);
  background: rebeccapurple;
`
export const TableWrap = styled.div`
  height: 50%;
  overflow-y: auto;
`;

export const Table = styled.table`
  width: 100%;  
`;

export const Tr = styled.tr`
  text-align: center;
  border-bottom: 1px solid #d9d5d5;
`;

export const Th = styled.th`
  border-top: 1px solid #d9d5d5;
  background-color: #f5f5f5;
`;

export const Td = styled.td`
  font-size: 12px;
  font-weight: bold;
  padding: 10px 0;
`;
