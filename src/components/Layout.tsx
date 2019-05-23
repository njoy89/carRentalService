import * as React from 'react';
import { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ClientService from '../services/clientService';

import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CarIcon from '@material-ui/icons/DirectionsCar';
import ListIcon from '@material-ui/icons/List';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = 250;

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    extend: {
        flex: 1
    }
});

interface Link {
    id: string;
    name: string;
    link: string;
    Icon: React.ComponentType<any>
}

interface LayoutProps extends WithStyles<typeof styles>, RouteComponentProps {}

const Layout: React.FunctionComponent<LayoutProps> = ({ classes, children, history, location }) => {
    const userIsAuthenticated = ClientService.isAuthenticated();
    let links: Link[] = [];

    if (userIsAuthenticated) {
        links = [
            { id: 'cars', name: 'Cars', link: '/cars', Icon: CarIcon },
            { id: 'myRentals', name: 'My Rentals', link: '/myRentals', Icon: ListIcon }
        ];
    } else {
        links = [
            { id: 'login', name: 'Login', link: '/login', Icon: PersonIcon },
            { id: 'cars', name: 'Cars', link: '/cars', Icon: CarIcon },
        ];
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickAtProfile = () => {
        if (location.pathname !== '/profile') {
            history.push('/profile');
        }
        handleMenuClose();
    };
    const handleLogout = () => {
        ClientService.logout();
        handleMenuClose();
        if (location.pathname !== '/login') {
            history.push('/login');
        }
    };

    const renderMenu = !userIsAuthenticated
        ? null
        : (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleClickAtProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
        );
    const renderAccountIcon = !userIsAuthenticated
        ? null
        : (
            <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
        );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap className={classes.extend}>
                        Car Rental Service
                    </Typography>
                    { renderAccountIcon }
                    { renderMenu }
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    {links.map(({ id, name, Icon, link }) => (
                        <ListItem
                            key={id}
                            button
                            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                e.stopPropagation();
                                if (location.pathname !== link) {
                                    history.push(link);
                                }
                            }}
                        >
                            <ListItemIcon><Icon /></ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                { children }
            </main>
        </div>
    );
};

export default withRouter(withStyles(styles)(Layout));
