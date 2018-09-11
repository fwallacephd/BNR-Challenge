<template>
  <div>
    <h1>Blog</h1>
    <div v-if="getFetchingPostsLoader" class="loader">Loading blog posts...</div>
    <div v-if="getBlogFetchError">
      <p>There was an error while fetching blog posts</p>
    </div>
    <!-- flex container -->
    <div v-else class="blog-container">
      <!-- my posts (left column) -->
      <div class="posts-container my-posts-container">
        <!-- loop through getMyPosts computed getter -->
        <div 
          class="post" 
          v-for="(post, index) in getMyPosts"
          :key="index">
          <!-- display post content -->
          <h3>{{post.title}}</h3>
          <p>{{post.body}}</p>
        </div>
      </div>
      <!-- other posts (right column) -->
      <div class="posts-container other-posts-container">
        <!-- loop through getPostsForOtherUsers computed getter -->
        <div 
          class="post"
          v-for="(post, index) in getPostsForOtherUsers"
          :key="index">
          <!-- display post content -->
          <h3>{{post.title}}</h3>
          <p>{{post.body}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Helper functions from vuex to map store to the component
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Blog',
  // data is an equivalent of state in the React component
  data() {
    return {

    }
  },
  computed: {
    // Map required getters from the store
    ...mapGetters(['getMyPosts', 'getPostsForOtherUsers', 'getFetchingPostsLoader', 'getBlogFetchError'])
  },
  methods: {
    // Map fetchPosts action from the store
    ...mapActions(['fetchPosts'])
  },
  created() {
    console.log('vm', this)
    // Initialise fetching posts
    this.fetchPosts()
  }
}
</script>
<style scoped>
.blog-container {
  display: flex;
}

.posts-container {
  padding: 20px
}
</style>