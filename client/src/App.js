import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import { fetchUser } from './store/actions/authActions';

import FrontPage from './components/frontPage';
import ProfilePage from './components/profilePage';
import ShopPage from './components/shopPage';

function App(props) {
    useEffect(() => {
        props.fetch_user();
    }, [props])
    
  return (
      <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/shops" component={ShopPage} />
      </Switch>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_user:() => {dispatch(fetchUser())}
    }
}

export default connect(null, mapDispatchToProps)(App);
