import axios from 'axios'

// Blog module state
export const state = {
  error: false,
  fetchingPosts: false,
  posts: [],
  myPosts: []
}

// Get values from the state
export const getters = {
  // Return posts for other users
  getPostsForOtherUsers(state) {
    return state.posts
  },
  // Return my posts userId = 1
  getMyPosts(state) {
    return state.myPosts
  },
  // Return loader indicating if posts are being fetched
  getFetchingPostsLoader(state) {
    return state.fetchingPosts
  },
  // Return error status
  getBlogFetchError(state) {
    return state.error
  }
}

// Perform any side effects like fetching from  the api
export const actions = {
  // Fetch all the posts
  fetchPosts({commit}) {
    // Switch on the loader to indicate that posts are being fetched
    commit('setLoader', true)
    // Fetch posts from the api
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(resp => {
        // Handle the response
        // We need to separate posts for myPosts and otherUsers' posts
        console.log('response', resp)
        const posts = resp.data.reduce((obj, post) => {
          // Check if it is my posts
          // If it is then push to myPosts
          // otherwise push to other posts
          if (post.userId === 1) {
            obj['myPosts'].push(post)
          } else {
            obj['posts'].push(post)
          }
          // Return object with updated posts
          return obj
        }, {myPosts: [], posts: []})
        commit('setPosts', posts)
        commit('setLoader', false)
      })
      .catch(err => {
        // Handle the error
        console.error('error', err)
        commit('setError', err)
        commit('setLoader', false)
      })
  }
}

// Mutatate the state
export const mutations = {
  // Update the state with posts
  setPosts(state, {myPosts, posts}) {
    state.myPosts = myPosts
    state.posts = posts
  },
  // Update the 'fetchingPosts'
  setLoader(state, payload) {
    state.fetchingPosts = payload
  },
  // Set the error in state
  setError(state, payload) {
    state.error = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}