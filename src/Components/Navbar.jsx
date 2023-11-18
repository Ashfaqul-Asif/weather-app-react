import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const BaseLayout = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">Weather Forecast</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default BaseLayout;