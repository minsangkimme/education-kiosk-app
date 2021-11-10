import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import adSense from "../../../assets/images/adSense.png";
import FooterNav from "../../../components/FooterNav";
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab, { tabClasses } from '@mui/material/Tab';
import SelectMenuList from "./SelectMenuList";
import TotalOrderHistory from "./TotalOrderHistory";

const Wrap = styled.div`
   height: 100%;
   overflow-y: auto;
`;

const ContentLayout = styled.div`
  height: calc(100vh - 95px);
  overflow-y: auto;
`;

const AdWrap = styled.div`
  width: 100%;
  min-height: 122.75px;
  & img {
    width: 100%;    
  }
`;

const SelectMenuView = ({onClickNextStep}) => {
  const [value, setValue] = React.useState(0);
  const [selectCategory, setSelectCategory] = React.useState('recommended'); // recommended | hamburger | desert | drink | event
  const [orderList, setOrderList] = useState([]);
  const menuCategory = ["추천메뉴", "햄버거", "디저트/치킨", "음료/커피", "행사메뉴"];
  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        return setSelectCategory('recommended');
      case 1:
        return setSelectCategory('hamburger');
      case 2:
        return setSelectCategory('desert');
      case 3:
        return setSelectCategory('drink');
      case 4:
        return setSelectCategory('event');
      default:
        return setSelectCategory('recommended');
    }
  }, [value, selectCategory]);

  // 오더 추가
  const onClickAddOrder = useCallback((menu) => {
    menu.orderCount += 1;
    const orders = [...orderList, menu];
    setOrderList(orders);
  }, [orderList]);

  // 카운트 감소
  const onClickDecreaseOrder = useCallback((menu) => {
    const orders = orderList.filter((v) => {
      if (v.id === menu.id) {
        menu.orderCount -= 1;
      }

      return v.orderCount >= 1;
    });

    setOrderList(orders);
  }, [orderList]);

  // 오더 삭제
  const onClickRemoveOrder = useCallback((menu) => {
    const orders = orderList.filter((v) => v.id !== menu.id);
    setOrderList(orders);
  }, [orderList]);

  return (
    <Wrap>
      <ContentLayout>
        <AdWrap>
          <img src={adSense} alt="배너광고" />
        </AdWrap>
        <Box sx={{ flexGrow: 1, background: '#ffecdb' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                display: 'inline-flex',
                '&.Mui-disabled': { opacity: 0.3 },
              },
              [`& .${tabsClasses.indicator}`]: {
                background: 'none'
              }
            }}
          >
            {menuCategory.map((v, i) =>  (
              <Tab
                key={i}
                label={v}
                sx={{
                  [`&.${tabClasses.selected}`]: {
                    background: '#fff',
                    mt: '3px',
                    borderRadius: '5px 5px 0 0',
                    color: '#000',
                  },
                  [`&.${tabClasses.root}`]: {
                    minWidth: 75,
                    padding: '12px 5px'
                  },
                  fontWeight: 'bold',
                }}
              />
            ))}
          </Tabs>
        </Box>
        <SelectMenuList
          selectCategory={selectCategory}
          onClickAddOrder={onClickAddOrder}
        />
        {/* 총 주문내역 */}
        <TotalOrderHistory
          orderList={orderList}
          onClickAddOrder={onClickAddOrder}
          onClickDecreaseOrder={onClickDecreaseOrder}
          onClickRemoveOrder={onClickRemoveOrder}
        />
      </ContentLayout>
      <FooterNav goBackFunc={() => onClickNextStep(2)} />
    </Wrap>
  );
};

export default SelectMenuView;
