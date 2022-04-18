import {Redirect, Route, Switch} from "react-router-dom";
import BrandContainer from "../pages/fastFood/brand/brandContainer";
import MainMenuType from "../pages/main/mainMenuType";

const MainRoutes = () => {

  return (
    <Switch>
      <Redirect exact from="/main" to="/main/menuType"/>
      <Route exact path="/main/menuType" component={MainMenuType} />
      <Route exact path="/main/menuType/:id" component={MainMenuType} />
      <Route exact path="/main/menuType/:id/:brand" component={BrandContainer} />
    </Switch>
  );
};

export default MainRoutes;
