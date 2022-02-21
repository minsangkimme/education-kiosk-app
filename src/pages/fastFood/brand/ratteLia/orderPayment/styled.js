import styled from "styled-components";
import Slider from "react-slick";
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
  width: 50%;
  height: 100%;
  background: #fff;
`;

export const PaymentOption = styled.div`
  width: 50%;
  height: 100%;
  box-shadow: 0 0 3px 1px rgb(255 0 0);
  background: rebeccapurple;
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
`;

export const CustomSlider = styled(Slider)`
  .slick-dots {
      bottom: 180px;
  }
  .slick-dots li button:before {
    font-size: 12px;
  }
  .slick-dots li.slick-active button:before {
    color: #e22137;
  }
  .slick-prev {
    left: 0;
    top: 25%;
    z-index: 1;
    display: flex;
    background: #aaa;
    font-size: 16px;
    width: 25px;
    height: 100px;
    align-items: center;
    text-align: center;
    border-radius: 0 15px 15px 0;
  }
  .slick-next {
    right: 0;
    top: 25%;
    display: flex;
    background: #aaa;
    font-size: 16px;
    width: 25px;
    height: 100px;
    align-items: center;
    text-align: center;
    border-radius: 15px 0 0 15px;
  }
  .slick-prev:before {
    content: '이전';
    font-size: 16px; 
  }
  .slick-next:before {
    content: '다음';
    font-size: 16px; 
  }
`;

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

export const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};
