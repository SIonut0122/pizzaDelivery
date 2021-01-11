import React 		from 'react';
import ReactDOM 	from 'react-dom';
import Home 		from './Home';
import store        from './store';
import { Provider } from 'react-redux';
import './firebase';


ReactDOM.render(
 <Provider store={store}>
			<Home />
		</Provider>,
  document.getElementById('root')
);
