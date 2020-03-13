import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const LogIn = () => {
	return (
		<div className="logIn">
			<h1>Log in</h1>
			<br />
			<input type="text" name="username" placeholder="Username" id="username" />
			<input
				type="password"
				name="password"
				placeholder="Password"
				id="password"
			/>
			<Link to="/chatRoom">
				<button className="button">Log in</button>
			</Link>
		</div>
	);
};
export default LogIn;
