import React from 'react';
import {shallow} from 'enzyme';
import App from './App.jsx';

const Element = shallow(<App/>);

describe('App tests',()=>{

  it('should render normally',()=>{

    expect(Element.find('h1').length).toEqual(1);

  });

});