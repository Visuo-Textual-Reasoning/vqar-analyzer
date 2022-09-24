import { Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaBars } from 'react-icons/fa';

export default function Sidebar() {
	const [ open, setOpen ] = useState(false);
	const Tasks = [ 'VQA', 'VCR' , 'FAQs' ];
	const navigate = useNavigate();


	const toggleDrawer = (e) => {
		setOpen(!open);
	};

	return (
		<Box>
			<Button
				// variant="outlined"
				color="secondary"
				onClick={toggleDrawer}
				startIcon={<FaBars />}
				sx={{ display: 'grid', placeItems: 'center' }}
			/>
			{/* <FaBars/> */}
			<Drawer anchor={'left'} open={open} onClose={toggleDrawer}>
				<List sx={{ width: '150px', textAlign: 'center' }}>
					{Tasks.map((t) => {
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
