import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = ({ auth, onClick }) => {
  return (
    <Navbar bg='dark' variant='dark' expand='sm' className='mb-3' style={{ minHeight: '4rem' }}>
      <Link to='/blog'>
        <Navbar.Brand>
          <img src='https://react-bootstrap.github.io/logo.svg' style={{ height: 30, width: 30 }} className='d-inline-block align-top' alt='' />
          {' Blog App (MERN)'}
        </Navbar.Brand>
      </Link>
      <Nav className='ml-auto'>
        {auth ? (<Link to='/logout'>
          <Button variant='outline-light' className='mr-sm-2' onClick={onClick}>
            Log out!
          </Button>
        </Link>
        ) : (<Link to='/login'>
          <Button variant='outline-light' className='mr-sm-2'>
            Log in!
          </Button>
        </Link>
          )}
      </Nav>
    </Navbar>
  )
}

NavigationBar.propTypes = {
  auth: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NavigationBar
