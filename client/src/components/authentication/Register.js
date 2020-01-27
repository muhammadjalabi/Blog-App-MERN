import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import Input from '../form/Input'


const Register = ({ loading, user, onBlur, onChange, onSubmit }) => {
  const { name, email, password, errors } = user;
  return (
    <Container>
      <Row>
        <Col className='mx-auto' sm={11} md={7} lg={5}>
          <Card className='my-4'>
            <Form noValidate onSubmit={onSubmit} className='p-sm-3 p-xs-1'>
              <Card.Body>
                <Card.Title as='h3' className='text-center mb-4 mt-2 theme-color'>
                  Register
                </Card.Title>
                <Input name='name' type='text' placeholder='Enter a username' value={name} onChange={onChange} onBlur={onBlur} text={{ module: 'Register', label: 'Username', error: errors.name }} />
                <Input name='email' type='email' placeholder='Enter an email' value={email} onChange={onChange} onBlur={onBlur} text={{ module: 'Register', label: 'Email', error: errors.email }} />
                <Input name='password' type='password' placeholder='Enter password' value={password} onChange={onChange} onBlur={onBlur} text={{ module: 'Register', label: 'Password', error: errors.password }} />
                <Button variant='info' type='submit' className='mt-4' disabled={loading}> Submit </Button>
                <Card.Text className='mt-2'>
                  Already have an account? {' '}
                  <Link to={'/login'}> Log in! </Link>
                </Card.Text>
              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>

  )
}

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default Register
