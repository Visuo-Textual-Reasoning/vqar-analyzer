import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthProvider';

export default function MenuBar() {
	const [ open, setOpen ] = useState(false);
	const [ auth, setAuth ] = useAuth();
	const menuItems = [ 'VQA', 'VCR', 'FAQs' ];
	const navigate = useNavigate();
	// const navigate = (x) => {
	// 	console.log(x);
	//   }
	  
	console.log(auth)

	const toggleDrawer = (e) => {
		setOpen(!open);
	};

	const goToLogin = () => {
		navigate('/login');
	};

	const logout = () => {
		setAuth({});
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={toggleDrawer}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
						VQAR Analyzer
					</Typography>
					{auth.name ? (
						<>
							{auth.name}
							<LogoutIcon onClick={logout} sx={{"cursor": "pointer", margin: "0 10px"}}/>
							{/* <Button size="small" color="inherit" onClick={logout} startIcon={<LogoutIcon/>}> */}
							{/* </Button> */}
						</>
						
					) : (
						<Button color="inherit" onClick={goToLogin}>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Drawer anchor={'left'} open={open} onClose={toggleDrawer}>
				<List sx={{ width: '150px', textAlign: 'center' }}>
					{menuItems.map((t) => {
						return (
							<ListItem button key={t} onClick={(e) => navigate(`/${t.toLowerCase()}`)}>
								<ListItemText primary={t} />
							</ListItem>
						);
					})}
				</List>
			</Drawer>
		</Box>
	);
}
