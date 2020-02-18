import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Main from "./Main";


test("test presentation Main class",()=>{

    render(<Main/>);



});
test("test  App",()=>{

    render(<App/>);

});
