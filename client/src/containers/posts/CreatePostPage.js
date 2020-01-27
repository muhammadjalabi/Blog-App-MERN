import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import PostForm from "../../components/posts/PostForm";
import Validate from "../../components/form/Validate";
import { connect } from "react-redux";
import { createPost } from "../../actions/post_actions";

const CreatePostPage = ({ errors, createPost, loading, history }) => {
  const [post, setPost] = useState({ title: '', body: '', errors: {} });
  useEffect(() => {
    setPost(post => {
      return { ...post, errors };
    });
  }, [errors]);

  const handleChange = event => setPost({ ...post, [event.target.name]: event.target.value })

  const handleBlur = event => {
    const { name, value } = event.target;
    const error = { ...post.errors, ...Validate(name, value).errors }
    setPost({ ...post, errors: { ...error } })
  }

  const handleSubmit = event => {
    event.preventDefault();
    const { title, body } = post;
    createPost({ title, body }, history);
  }

  return (
    <PostForm
      loading={loading}
      post={post}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  )
}
const mapStateToProps = (state) => ({
  loading: state.post.postLoading,
  errors: state.errors
})


CreatePostPage.propTypes = {
  createPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}
export default connect(mapStateToProps, { createPost })(CreatePostPage);