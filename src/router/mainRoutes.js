import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import MainMenuTypeView from "../pages/Main/MainMenuTypeView";
import MenuBrandView from "../pages/FastFood/MenuBrandView";
import {useLocation} from "react-router-dom";
import BrandContainer from "../pages/FastFood/BrandContainer";

const MainRoutes = () => {
  useLocation();

  return (
    <Switch>
      <Redirect exact from="/main" to="/main/menuType"/>
      <Route exact path="/main/menuType" component={MainMenuTypeView} />
      <Route exact path="/main/menuType/:id" component={MenuBrandView} />
      <Route exact path="/main/menuType/:id/:brand" component={BrandContainer} />
    </Switch>
  );
};

export default MainRoutes;
