import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import 'antd/dist/antd.css';

const MainRoutes = lazy(() => import('./router/mainRoutes'));
const Routes = () => {

  return (
    <BrowserRouter>
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
