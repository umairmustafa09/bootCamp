import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import LogIn from '../containers/login/index';
import ChatRoom from '../containers/shell/ChatShell';

function Routes() {
	return (
		<BrowserRouter>
			<div>
				<Route exact path="/" component={LogIn} />
				<Route path="/chatRoom" component={ChatRoom} />
			</div>
		</BrowserRouter>
	);
}

export default Routes;
