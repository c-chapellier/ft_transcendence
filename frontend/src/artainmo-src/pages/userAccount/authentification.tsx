import React, { useState } from 'react';
import accountType from '../../types/accountType';
import Home from '../home/home';
import { dataBaseAccounts } from '../../types/database';

type authState = "login" | "signup" | "done" | null;

interface authProps3 {
	changeState: (newState: authState) => void
	changeAccount: (newAccount: any) => void
	account: accountType
	signup: boolean
}

interface authProps2 {
	changeState: (newState: authState) => void
	changeAccount: (newAccount: any) => void
	account: accountType
}

interface authProps {
	changeState: (newState: authState) => void
	changeAccount: (newAccount: any) => void
	account: accountType
	unlog: () => void
	loginOrSignup: authState
}



const LogForm: React.FC<authProps3> = ({ changeState, changeAccount, account, signup }) => {
	let [accountAlreadyInUse, setAccountAlreadyInUse] = useState<boolean>(false);
	let [nonExistingAccount, setNonExistingAccount] = useState<boolean>(false);
	let [wrongPassword, setWrongPassword] = useState<boolean>(false);;

	const onSubmitLogin: () => void = () => {
		if (dataBaseAccounts.find(e => e[0].toLowerCase() === account.name.toLowerCase() && e[1] === account.password) !== undefined) {
			changeState("done");
			setNonExistingAccount(false);
		} else if (dataBaseAccounts.find(e => e[0].toLowerCase() === account.name.toLowerCase()) !== undefined) {
						setWrongPassword(true);
						setNonExistingAccount(false);
						changeAccount({password: '', avatar: null});
		} else {
			setNonExistingAccount(true);
			setWrongPassword(false);
			changeAccount({name: '', password: '', avatar: null});
		}
	}

	const onSubmitSignup: () => void = () => {
		if (dataBaseAccounts.find(e => e[0].toLowerCase() === account.name.toLowerCase()) !== undefined) {
			changeAccount({name: '', password: '', avatar: null});
			setAccountAlreadyInUse(true);
		} else {
			changeState("done");
			setAccountAlreadyInUse(false);
		}
	}

	return (<div>
					<form>
						<label>Name:</label><br/>
						<input required type="text" value={account.name} onChange={(e)=>changeAccount({name: e.target.value})}/><br/><br/>
						<label>Password:</label><br/>
						<input required type="password" value={account.password} onChange={(e)=>changeAccount({password: e.target.value})}/>
						{signup && <br/>}
						{signup && <br/>}
						{signup && <label>Download Avatar Image: </label>}
						{signup && <input type="file" id="fileInput" onChange={(e)=> e.target.files && changeAccount({avatar: URL.createObjectURL(e.target.files[0])})}/>}
						<br/><br/>
						{accountAlreadyInUse && <p>This account already exists, try another one</p>}
						{nonExistingAccount && <p>This account does not exist, try another one</p>}
						{wrongPassword && <p>Try another password</p>}
						<input type="submit" onClick={()=> signup ? onSubmitSignup() : onSubmitLogin()}/>
					</form>
				</div>);
}

const Signup: React.FC<authProps2> = ({ changeState, changeAccount, account }) => {
	return (<div>
				<button onClick={()=>{changeState(null)}}>Back</button>
				<h1>Sign up</h1>
				<LogForm changeState={changeState} changeAccount={changeAccount} signup={true} account={account}/>
			</div>);
}

const Login: React.FC<authProps2> = ({ changeState, changeAccount, account }) => {
	return (<div>
				<button onClick={()=>{changeState(null)}}>Back</button>
				<h1>Log in</h1>
				<LogForm changeState={changeState} changeAccount={changeAccount} signup={false} account={account}/>
			</div>);
}

const LoginOrSignup: React.FC<{changeState: (newState: any) => void}> = ({ changeState }) => {
	return (<div>
				<h1>Pong Game</h1>
				<button onClick={()=>{changeState('login')}}>Log in</button><>&nbsp;&nbsp;&nbsp;</>
				<button onClick={()=>{changeState('signup')}}>Sign up</button><>&nbsp;&nbsp;&nbsp;</>
				<button onClick={()=>{changeState('done')}}>Intra 42 login</button>
			</div>);
}

const Authentification: React.FC<authProps> = ({ account, changeAccount, changeState, unlog, loginOrSignup}) => {

	if (loginOrSignup === null) {
		return (<LoginOrSignup changeState={changeState}/>);
	} else if (loginOrSignup === "done") {
		return (<Home account={account} changeAccount={changeAccount} unlog={unlog}/>);
	} else if (loginOrSignup === "signup") {
		return (<Signup changeState={changeState} changeAccount={changeAccount} account={account}/>);
	} else if (loginOrSignup === "login"){
		return (<Login changeState={changeState} changeAccount={changeAccount} account={account}/>);
	} else {
		return <h1>Authentification Error</h1>;
	}
}


export default Authentification;

//A user must log in using the OAuth system of 42 intranet
//A user must be able to activate a 2-factor authentication (like google authenticatoror an SMS etc...)
