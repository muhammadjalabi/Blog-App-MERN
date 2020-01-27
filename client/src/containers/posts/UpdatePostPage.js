
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostForm from "../../components/posts/PostForm";
import Validate from "../../components/form/Validate";

import { connect } from 'react-redux';
import { getPostByID, editPost } from '../../actions/post_actions'

const UpdatePostPage = ({ errors, editPost, loading, currentPost, getPostByID, match, history }) => {
  const [post, setPost] = useState({ title: '', body: '', errprs: {} })
  useEffect(() => getPostByID(match.params.id), [match, getPostByID])
  useEffect(() => {
    setPost(post => ({
      title: currentPost.title,
      body: currentPost.body,
      errors: { ...post.errors }
    }))
  }, [currentPost])

  useEffect(() => {
    setPost(post => {
      return { ...post, errors };
    });
  }, [errors]);

  const handleChange = event => setPost({ ...post, [event.target.name]: event.target.value })

  const handleBlur = event => {
    const { name, value } = event.target;
    const error = { ...post.errors, ...Validate(name, value).errors };
    setPost({ ...post, errors: { ...error } })
  }

  const handleSubmit = event => {
    event.preventDefault();
    const { title, body } = post;
    editPost(currentPost._id, { title, body }, history);
  }

  const isPostLoaded = () => post.title || post.body || Object.keys(post.errors).length > 0

  return isPostLoaded() ? (
    <PostForm loading={loading} post={post} onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit} />
  ) : (
      <div />
    )
}


const mapStateToProps = (state) => ({
  currentPost: state.post.post,
  loading: state.post.postLoading,
  errors: state.errors
})

UpdatePostPage.propTypes = {
  currentPost: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  getPostByID: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getPostByID, editPost })(UpdatePostPage)