import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Input from '../form/Input';
import Textarea from '../form/Textarea'


const PostForm = ({ post, onChange, onBlur, loading, onSubmit }) => {
  const { title, body, errors } = post
  return (
    <Container>
      <Row>
        <Col className='mx-auto'>
          <Form noValidate onSubmit={onSubmit} className='p-sm-3 p-xs-1'>
            <Input name='title' type='text' placeholder='Enter a title for your post' value={title} onChange={onChange} onBlur={onBlur} text={{ module: 'post', label: 'Title', error: errors.title }} />
            <Textarea name='body' type='text' placeholder='Write what you wanna say with your post here' value={body} onChange={onChange} onBlur={onBlur} text={{ module: 'post', label: 'Description', error: errors.body }} />
            <Button variant='outline-info' type='submit' disabled={loading} className='mt-3'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

PostForm.propTypes = {
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
export default PostForm
