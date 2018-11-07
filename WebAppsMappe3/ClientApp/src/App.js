import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Ask } from './components/Ask';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
			<Route path='/ask' component={Ask} />
			<Route path='/faq' component={Ask} />
      </Layout>
    );
  }
}
