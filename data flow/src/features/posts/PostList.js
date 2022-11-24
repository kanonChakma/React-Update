import React from 'react'
import { useSelector } from 'react-redux'
import AddPostForm from './AddPostForm'
import PostAuthor from './PostAuthor'
import { selectAllPost } from './postsSlice'
import ReactionButtons from './ReactionButton'
import TimeAgo from './TimeAgo'

const PostList = () => {
    const posts = useSelector(selectAllPost)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const rederedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
       <h3>{post.title}</h3>
       <p>{post.content.substring(0,100)}</p>
       <p className="postCredit">
             <PostAuthor userId={post.userId} />
             <TimeAgo timestamp={post.date}/>
             <ReactionButtons post={post}/>
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