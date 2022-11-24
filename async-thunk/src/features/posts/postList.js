import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddPostForm from './AddPostForm'
import { featchPosts, getPostsError, getPostStatus, selectAllPost } from './postSlice'
import ShowPost from './ShowPost'


 const PostList = () => {
 const dispatch = useDispatch()
 
 const posts = useSelector(selectAllPost)  
 const postStatus = useSelector(getPostStatus)
 const postsError = useSelector(getPostsError)

  useEffect(()=> {
    if(postStatus === 'idle') {
      dispatch(featchPosts())
    }
  },[postStatus, dispatch])

  let content;
  if(postStatus === 'loading') {
    content = <p>"Loading...."</p>
  }
 else if(postStatus === 'succeeded') {
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  content = orderedPosts.map(post => <ShowPost key={post.id} post={post} />)
 } else if(postStatus === 'failed'){
   content = <p>{postsError}</p>
 }
   
  return (
    <section>
       <AddPostForm/>
       <h2>Posts</h2>
         {content}
    </section>
  )
}

export default PostList