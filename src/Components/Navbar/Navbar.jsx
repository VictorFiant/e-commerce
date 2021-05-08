import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/commerce.png';
import useStyles from './styles';



const Navbar = ({ totalItem }) => {
    const classes = useStyles();
    const location = useLocation();



    return (
        <>
            <AppBar position='fixed' className={classes.appbar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='Commerce.js' height='25px' className={classes.image} />
                    Mercato
                </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color='inherit'>
                                <Badge badgeContent={totalItem} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div >)}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
