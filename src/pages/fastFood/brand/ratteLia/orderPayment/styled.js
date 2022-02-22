import styled from "styled-components";
import React from "react";

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
  flex-basis: 50%;
  height: 100%;
  background: #fff;
  padding: 0 5px;
`;

export const PaymentOption = styled.div`
  width: 50%;
  height: 100%;
  box-shadow: 0 0 3px 1px rgb(255 0 0);
  background: #fff;
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
  height: 21.84px;
  font-size: 12px;
  font-weight: bold;
`;

export const InfoWrap = styled.div`
  margin-top: 3.15rem;  
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #d9d5d5;
  padding: 0 5px;
`;

export const InfoData  = styled.div`
  height: 21.84px;
  font-weight: bold;  
`;

export const Pay = styled.td`
  font-size: 1.15rem;
  font-weight: bold;
`;

export const TotalPay = styled.td`
  font-size: 1.15rem;
  font-weight: bold;
  color: #e22137;
`;

export const OptionWrap = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StepWrap = styled.div`
  width: 100%;
`;

export const StepTitle = styled.div`
  background-color: #9c1919;
  color: #fff;
  font-weight: bold;
  font-size: 0.85rem;
  text-align: center;
  height: 42.72px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
