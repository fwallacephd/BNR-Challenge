import { expect } from 'chai'
import sinon from 'sinon'

// We use an inject-loader so we can inject a function in place of another
// Basically we change dependendency
const actionsInjector = require('inject-loader!../../../src/store/modules/blog')

// Blog module
/*
  {state, actions, getters, mutations}
*/
const store = actionsInjector({
  // Here are are injecting a get function for axios dependency
  axios: {
    get(url) {
      console.log('url', url)
      return new Promise((resolve, reject) => {
        expect(url).to.equal('https://jsonplaceholder.typicode.com/posts')
        resolve({data: ['post1', 'post2', 'post3']})
      })
    }
  }
})

const { state, actions, mutations } = store
const { setPosts } = mutations
describe('mutations', () => {
  it('setPosts', () => {
    setPosts(state, {
      myPosts: ['post1', 'post2', 'post3'],
      posts: ['Post1', 'post2']
    })
    expect(state.myPosts).to.have.length(3)
    expect(state.posts).to.have.length(2)
    expect(state.myPosts).to.be.an('array')
    expect(state.posts).to.be.an('array')
  })
})

describe('fetchPosts action', () => {
  it('fetchPosts', () => {
    console.log('getting posts')
    const commit = sinon.spy()

    actions.fetchPosts({ commit, state })
    expect(actions.fetchPosts).to.be.a('function')
  })
})