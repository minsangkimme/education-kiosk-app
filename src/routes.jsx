import {Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import AppLayout from "./layout/appLayout";
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainRoutes = lazy(() => import('./router/mainRoutes'));
const Routes = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <AppLayout>
          <Route
            path="/"
            render={() => (
              <Switch>
                <Redirect exact from="/" to="/main"/>
                <Route path="/main" component={MainRoutes}/>
              </Switch>
            )}
          />
          </AppLayout>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
