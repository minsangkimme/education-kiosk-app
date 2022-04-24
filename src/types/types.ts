import React from "react";
import menuService from "service/ratteLia/menuService";
import MenuService from "service/ratteLia/menuService";

export type INextStep = {
    onClickNextStep: (step: number) => void;
}

export type SelectedMenu = IOrderProps | null | object;

export type SetIOrderProps = React.Dispatch<React.SetStateAction<IOrderProps>>

export type MenuCategoryProps = {
    menuService: menuService;
    setSelectCategory: React.Dispatch<React.SetStateAction<string>>
}

export type AlarmActionProps = {
    data: boolean;
    label: string;
    type?: string;
}

export type AlarmState = {
    type: {
        menuTypeAlarm: boolean;
        sideMenuAlarm: boolean;
        alreadyTypeAlarm: boolean;
        nonSelectAlarm: boolean;
        orderCancelAlarm: boolean;
        selectMenuAlarm: boolean;
        receiptAlarm: boolean;
        recyclePaperAlarm: boolean;
    }
}

export interface IOrderProps {
    id: number,
    src: string,
    name: string,
    price: number,
    setPrice: number,
    type: string,
    orderCount: number,
    setOrderCount: number,
    sideMenuList: ISideMenuProps[],
    sideMenuPrice: number,
}

export interface ISideMenuProps {
    id: number,
    src: string,
    name: string,
    price: number,
    setPrice?: number,
    type: string,
    orderCount?: number,
    isSelected?: boolean,
}

export interface IFooterNavProps {
    goBackFunc?(): void;
    showInfo?: string;
    onClickCancle?(): void;
    goToNext?(): void;
}

export interface ISelectMenuProps {
    onClickNextStep: (step: number) => void;
    orderList: IOrderProps[];
    setOrderList: React.Dispatch<React.SetStateAction<IOrderProps[]>>;
    menuService: MenuService;
}

export interface IMenuService {
    category: string;
    selectedMenu: SelectedMenu;
    orderList: IOrderProps[];
    burgerTypeCategory: string[];
}

export interface ICategory {
    category: string;
    update: React.Dispatch<React.SetStateAction<string>>
}

export interface IDesertAndDrinkMenuProps {
    selectedMenu: IOrderProps | object;
    setSideMenuTab: React.Dispatch<React.SetStateAction<string>>;
    sideMenuTab: string;
    handleAddSideMenu(sideMenu: ISideMenuProps): void;
    onClickDeleteSideMenu(sideMenu: ISideMenuProps): void;
    onClickSubmitMenu(): void;
    handleCloseSideMenu(): void;
    sideMenuAlarm: boolean;
}

export interface ICategoryInfoProps {
    recommended: IOrderProps[][];
    hamburger: IOrderProps[][];
    event: IOrderProps[][];
    desert: ISideMenuProps[][];
    drink: ISideMenuProps[][];
    [prop:string]: any;
}

export interface ISideMenuInfoProps {
    desert: ISideMenuProps[][];
    drink: ISideMenuProps[][];
}

export interface ISelectMenuListProps {
    selectCategory: string;
    onClickSelectMenu: (menu: IOrderProps) => void;
}