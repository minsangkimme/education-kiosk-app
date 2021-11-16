import React from 'react';
import {CategoryInformation} from "./MenuInfo";
import styled from 'styled-components';
import Slider from 'react-slick';
import {convertCommaNumber} from "../../../utils/comma";

const Wrap = styled.div`
  padding: 0 10px;  
  min-height: 585px;
`;

const MenuWrap = styled.div`
  display: inline-block;
  width: 50%;  
  height: 100px;
  padding: 12px;
`;

const ItemWrap = styled.div`
  display: flex;
  padding: 10px 0;
  cursor: pointer;
  & img {
    width: 65px;
    height: 100%;
    margin-left: 5px;
  }
`;

const MenuInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  width: 85px;
`;

export const CustomSlider = styled(Slider)`
  .slick-dots {
      bottom: 150px;
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

const SelectMenuList = ({selectCategory, onClickInspectMenuType}) => {
  const pageSize = 8;
  const selectedCategory = CategoryInformation[selectCategory].flat();
  const totalCount = selectedCategory.length;
  const totalPage = Math.ceil(totalCount / pageSize);
  const pageNumberList = '*'.repeat(totalPage).split("");

  return (
    <CustomSlider {...settings} style={{overflow: 'hidden'}}>
      {pageNumberList.map((_, i) => (
        <Wrap key={i}>
          {CategoryInformation[selectCategory][i].map((order) => {
            const price = order.type === 'single' ? order.price : order.setPrice;
            return (
              <MenuWrap key={order.id}>
                <ItemWrap onClick={() => onClickInspectMenuType(order)}>
                  <img src={order.src} alt={order.name}/>
                  <MenuInfoWrap>
                    <strong>{order.name}</strong>
                    <strong style={{color: '#e22137'}}>
                      {convertCommaNumber(price)}
                      {order.type === 'single' && <span style={{marginLeft: 5}}>~</span>}
                    </strong>
                  </MenuInfoWrap>
                </ItemWrap>
              </MenuWrap>
            )
          })}
        </Wrap>
      ))}
    </CustomSlider>
  )
};

export default SelectMenuList;
