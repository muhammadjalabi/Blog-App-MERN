import axios from 'axios'
import {
  CREATE_POST,
  GET_POST,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_POST_LOADING,
  RESET_POST,

  GET_ALL_POSTS,
  TOGGLE_POSTS_LOADING
} from './types'





const togglePostLoading = () => {
  return { type: TOGGLE_POST_LOADING }
}
const togglePostsLoading = () => {
  return { type: TOGGLE_POSTS_LOADING }
}
const resetPost = () => {
  return { type: RESET_POST }
}


const createPost = (post, history) => dispatch => {
  dispatch(togglePostLoading())
  axios.post('/api/post/create', post).then(result => {
    dispatch({ type: CREATE_POST, payload: result.data })
    dispatch(togglePostLoading())
    history.push('/blog')
  }).catch(error => {
    dispatch(setErrors(error.response.data))
    dispatch(togglePostLoading())
  })
}

const getPostByID = id => dispatch => {
  dispatch(togglePostLoading())
  axios.get(`/api/posts/post/${id}`).then(result => {
    dispatch({ type: GET_POST, payload: result.data })
    dispatch(clearErrors())
    dispatch(togglePostLoading())
  }).catch(error => {
    dispatch(setErrors(error.response.data))
    dispatch(togglePostLoading())
  })
}
const getAllPostsFromAuthor = author => dispatch => {
  dispatch(togglePostLoading())
  axios.get(`/api/posts/author/${author}`).then(result => {
    dispatch({ type: GET_ALL_POSTS, payload: result.data })
    dispatch(togglePostsLoading())
  }).catch(error => {
    dispatch(setErrors(error.response.data))
    dispatch(togglePostsLoading())
  })
}

const getAllPosts = () => dispatch => {
  dispatch(togglePostLoading())
  axios.get('/api/posts/').then(result => {
    dispatch({ type: GET_ALL_POSTS, payload: result.data })
    dispatch(clearErrors())
    dispatch(togglePostsLoading())
  }).catch(error => {
    dispatch(setErrors(error.response.data))
    dispatch(togglePostsLoading())
  })
}

const editPost = (id, post, history) => dispatch => {
  dispatch(togglePostLoading())
  axios.patch(`/api/posts/update/${id}`).then(result => {
    dispatch({ type: UPDATE_POST, payload: result.data })
    dispatch(togglePostLoading())
    history.push(`/blog/post/${result.data._id}`)
  }).catch(error => {
    dispatch(setErrors(error.response.data))
    dispatch(togglePostLoading())
  })
}

const deletePost = (id, history) => dispatch => {
  dispatch(togglePostLoading())
  axios.delete(`/api/posts/delete/${id}`).then(result => {
    dispatch({ type: DELETE_POST, payload: _id })
    dispatch(togglePostLoading())
    history.push('/blog')
  }).catch(error => {
    dispatch(setErrors(error.response.data))
    dispatch(togglePostLoading())
  })
}

export default = {
  togglePostLoading,
  togglePostsLoading,
  resetPost,
  createPost,
  getPostByID,
  getAllPostsFromAuthor,
  getAllPosts,
  editPost,
  deletePost
}