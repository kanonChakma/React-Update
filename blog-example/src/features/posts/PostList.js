import React from 'react'
import { useSelector } from 'react-redux'
import AddPostForm from './AddPostForm'
import PostAuthor from './PostAuthor'
import { selectAllPost } from './postsSlice'
import TimeAgo from './TimeAgo'

const PostList = () => {
    const posts = useSelector(selectAllPost)
   
const rederedPosts = posts.map((post) => (
    <article key={post.id}>
       <h1>{post.userId}</h1>
       <h3>{post.title}</h3>
       <p>{post.content.substring(0,100)}</p>
       <p className="postCredit">
             <PostAuthor userId={post.userId} />
             <TimeAgo timestamp={post.date}/>
       </p>
    </article>
))

  return (
    <section>
       <AddPostForm/>
       <h2>Posts</h2>
         {rederedPosts}
    </section>
  )
}

export default PostList