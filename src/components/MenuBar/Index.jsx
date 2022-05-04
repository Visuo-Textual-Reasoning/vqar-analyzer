import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router';

export default function MenuBar() {
	const [ open, setOpen ] = useState(false);
	const menuItems = [ 'VQA', 'VCR' ];
	const navigate = useNavigate();

	const toggleDrawer = (e) => {
		setOpen(!open);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon
                onClick={toggleDrawer}
             />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center'}}>
						VQAR Analyzer
					</Typography>
					<Button color="inherit">Login</Button>
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
