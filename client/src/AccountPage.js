import './css/App.css';
import { useEffect, useState } from 'react';
import { useAuth } from './auth/authContext';

//UI components
import sidebarAccount from './components/account management/sidebarAccountManagement';
import NavbarAccountManagement from './components/account management/NavbarAccountManagement';
import Popup from './components/Popup';

//popup components
import DeletePopup from './components/popups/deleteProductPopup';     //change to deleteUserPopup - will be done by Sophia
import PopupMessage from './components/popups/popupMessage';


//table components
import UserTable from './components/users/UserTable';

//function components

//state containers
import AddUserState from './components/users/containers/addUserState';

//api functions
import UserAddAPI from './api/user/UserAddAPI';       //change to user
import UserGetAPI from './api/user/UserGetAPI';        //change to user
import UserDeleteAPI from './api/user/UserDeleteAPI';  //change to user
import SidebarAccount from './components/account management/sidebarAccountManagement';

//url to fetch data from
const FETCH_URL = 'http://localhost:3001';


function AccountPage() {

	const {user} = useAuth();

	const [statusPopup, setStatusPopup] = useState(false);
	const [deletePopup, setDeletePopup] = useState(false);
	const [addPopup, setAddPopup] = useState(false);

	const [selectedUser, setSelectedUser] = useState({});

	//general popup message states
	const [isSuccess, setIsSuccess] = useState(false);
	const [message, setMessage] = useState('Loading...');

	//delete states
	const [isDelete, setDelete] = useState(false);
	const [isDeleteConfirm, setDeleteConfirm] = useState(false);
	const [userDeleteEmail, setUserDeleteEmail] = useState('');

	//fetched data to store
	const [users, setUsers] = useState([]);

	//loading states
	const [isFetching, setIsFetching] = useState(false);	//tells table to display loading
	const [isUpdating, setIsUpdating] = useState(false);	//tells app to fetch upon success
	const [isLoading, setIsLoading] = useState(true);		//tells app when operation is being performed

	/*************************************
	 *          Popup functions          *
	 *************************************/
	
	const updateDisplay = (message) => {
		setIsUpdating(true);
		setIsLoading(false);
		setMessage(message);
		setIsSuccess(true);
		setStatusPopup(true);
	}

	const errorPopup = (error) => {
		setMessage(error);
		setIsLoading(false);
		setIsSuccess(false);
		setStatusPopup(true);
	}

	const closePopup = () => {
		setStatusPopup(false);
		setIsLoading(false);
		setMessage('Loading...');
		setIsSuccess(false);
	}

	/*************************************
	 * 		    API Call functions       *
	 *************************************/

	//adds a user using data (used in add popup)
	const addUser = async (data) => {
		setIsLoading(true);
		try{
			setStatusPopup(true);
			await UserAddAPI(data, FETCH_URL)
			updateDisplay('User added successfully.');
		}
		catch(err){
			console.log(err);
			errorPopup(String(err))
		}
	}

	//delets a list of users using userIDList (used in delete popup)
	const deleteUser = async () => {
		setIsLoading(true);
		try{
			await UserDeleteAPI({userID: userDeleteEmail, FETCH_URL});
			updateDisplay('User deleted successfully.');
		}
		catch(err){
			errorPopup(String(err))
		}
	}

	//fetches data from api
	const fetchData = async () => {
		setIsFetching(true);
		try{	
			const resUsers = await UserGetAPI({FETCH_URL});
			setUsers(resUsers);
			
		}catch(err){
			setMessage(String(err));
		}
		setIsFetching(false);
	}

	/*************************************
	 * 		    React Hooks              *
	 *************************************/

	//initialization
	useEffect(() => {
		fetchData();
	}, []);

	//update table when product table is updated (add, delete, edit)
	useEffect(() => {
		if (isUpdating === false) return;
		fetchData();
		setIsUpdating(false);
	}, [isUpdating]);

	//delete call
	useEffect(() => {
		if (isDeleteConfirm === false) return;
		//delete products
		deleteUser();
		setStatusPopup(true);
		//reset delete state
		setDelete(false);
		setDeleteConfirm(false);
	}, [isDeleteConfirm]);
	

	useEffect(() => {
		if (userDeleteEmail === '') return;
			console.log(userDeleteEmail);
			setDeletePopup(true);
	}, [userDeleteEmail])

	useEffect(() => {
		if (!isDeleteConfirm){
			setUserDeleteEmail('');
			return;
		}
		
		deleteUser();
	}, [isDeleteConfirm])
	
	/*************************************
	 * 		    	 Render              *
	 *************************************/
	return(
		<div className="Container">

			<SidebarAccount 
				user={user}
			/>

			<NavbarAccountManagement 
				setAdd={setAddPopup} 
				setDelete={setDelete} 
				isDelete={isDelete}
			/>

			<main className ="content">
				<UserTable
					users={users}
					isFetching={isFetching}
					isDelete={isDelete}
					setDeleteID={setUserDeleteEmail}
				/>
			</main>
	
			<AddUserState 
				addPopup={addPopup} 
				setAddPopup={setAddPopup}
				addUser={addUser} 
			/>
	
			<Popup trigger = {statusPopup} id="Message">
				<PopupMessage 
					isSuccess={isSuccess} 
					message={message} 
					setClose={closePopup} 
					isLoading={isLoading}
				/>
			</Popup>
			
			<Popup trigger = {deletePopup} id="Delete">
				<DeletePopup 
					setDelete={setDeleteConfirm} 
					setDeletePopup={setDeletePopup} 
				/>
			</Popup>

		</div>
	);
}
export default AccountPage;