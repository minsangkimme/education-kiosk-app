import React, {forwardRef, useEffect} from 'react';
import {categoryInformation} from "../../../../../service/ratteLia/menuInfo";
import {convertCommaNumber} from "../../../../../utils/comma";
import * as Styled from './styled';


const SelectMenuList = forwardRef(({selectCategory, onClickSelectMenu}, ref) => {
  const pageSize = 6;
  const selectedCategory = categoryInformation[selectCategory].flat();
  const totalCount = selectedCategory.length;
  const totalPage = Math.ceil(totalCount / pageSize);
  const pageNumberList = '*'.repeat(totalPage).split("");

  return (
    <Styled.CustomSlider ref={ref} {...Styled.settings} style={{overflow: 'hidden'}}>
      {pageNumberList.map((_, i) => (
        <Styled.Wrap key={i}>
          {categoryInformation[selectCategory][i].map((order) => {
            const price = order.type === 'single' ? order.price : order.setPrice;
            return (
              <Styled.MenuWrap key={order.id}>
                <Styled.ItemWrap onClick={() => onClickSelectMenu(order)}>
                  <img src={order.src} alt={order.name}/>
                  <Styled.MenuInfoWrap>
                    <strong>{order.name}</strong>
                    <strong style={{color: '#e22137'}}>
                      {convertCommaNumber(price)}
                      {order.type === 'single' && <span style={{marginLeft: 5}}>~</span>}
                    </strong>
                  </Styled.MenuInfoWrap>
                </Styled.ItemWrap>
              </Styled.MenuWrap>
            )
          })}
        </Styled.Wrap>
      ))}
    </Styled.CustomSlider>
  )
});

export default SelectMenuList;
