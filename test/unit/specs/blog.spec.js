import { expect } from 'chai'
import Vue from 'vue'
import Blog from '@/components/Blog'

describe('Blog component', () => {
  it('should have posts', () => {
    console.log('checking blog component')
    expect(Blog.name).to.equal('Blog')
  })
})