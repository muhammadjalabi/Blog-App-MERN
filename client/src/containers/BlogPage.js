import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Blog from '../components/user/Blog'
import { getAllPostsFromAuthor, getAllPosts } from '../actions/post_actions'

const BlogPage = ({ isAuthenticated, getAllPosts, getAllPostsFromAuthor, match, posts }) => {
  useEffect(() => isAuthenticated ? getAllPosts() : getAllPostsFromAuthor(match.params.author), [isAuthenticated, getAllPostsFromAuthor, getAllPosts, match])

  return (
    <Blog posts={posts} auth={isAuthenticated} />
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts
});

BlogPage.propTypes = {
  posts: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  getAllPostsFromAuthor: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getAllPosts, getAllPostsFromAuthor })(BlogPage)
