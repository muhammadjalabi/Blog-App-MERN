import React from 'react'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

const Textarea = ({ name, placeholder, value, onChange, onBlur, text }) => {
  return (
    <Form.Group controlId={text.module + name}>
      <Form.Label>{text.label}</Form.Label>
      <Form.Control
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={text.error ? true : false}
        rows='10'
        as='textarea'
      />
      <Form.Control.Feedback type='invalid'>
        {text.error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired
}

export default Textarea
