import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Products } from './Product/Index';

export const routes = <Layout>
    <Route exact path='/administrate-music-home' component={ Home } />
    <Route path='/administrate-stuff' component={ Products } />
</Layout>;
