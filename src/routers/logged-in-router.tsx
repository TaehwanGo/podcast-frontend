import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../components/header';
import { NotFound } from '../pages/404';
import { useMe } from '../hooks/useMe';
import { GetAllPodcsts } from '../pages/getAllPodcasts';
import { EditProfile } from '../pages/user/edit-profile';

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-800">
        <span className="font-medium text-xl tracking-wide text-white">
          Loading...
        </span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/edit-profile">
          <EditProfile />
        </Route>
        <Route path="/" exact>
          <GetAllPodcsts />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
