import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Ask } from './components/Ask';
import { FAQ } from './components/FAQ';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
		<Route path='/ask' component={Ask} />
		<Route path='/faq' component={FAQ} />
      </Layout>
    );
  }
}
