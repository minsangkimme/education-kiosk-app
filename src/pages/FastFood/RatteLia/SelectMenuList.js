import React from 'react';
import {CategoryInformation} from "./MenuInfo";
import styled from 'styled-components';
import Slider from 'react-slick';
import {convertCommaNumber} from "../../../utils/comma";

const Wrap = styled.div`
  padding: 0 10px;
  //min-height: 668.25px;
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
  & img {
    width: 65px;
    height: 100%;
  }
`;

const MenuInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;
  width: 85px;
`;

const CustomSlider = styled(Slider)`
  .slick-dots {
      bottom: 150px;
  }
  .slick-dots li button:before {
    font-size: 12px;
  }
  .slick-dots li.slick-active button:before {
    color: #e22137;
  }
`

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const SelectMenuList = ({selectCategory, onClickAddOrder}) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

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
            return (
              <MenuWrap key={order.id} onClick={() => onClickAddOrder(order)}>
                <ItemWrap>
                  <img src={order.src} alt={order.name}/>
                  <MenuInfoWrap>
                    <strong>{order.name}</strong>
                    <strong style={{color: '#e22137'}}>{convertCommaNumber(order.price)}</strong>
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
