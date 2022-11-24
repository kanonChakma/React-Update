import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

const initialState = {
    posts:[],
    status:'idle',
    error: null
 }
 
 const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

 export const featchPosts = createAsyncThunk('posts/fetchPosts', async () => {
   try {
     const response = await axios.get(POSTS_URL)
     return [...response.data]; 
   } catch (error) {
   return error.message
  }
 })

 export const addNewPost = createAsyncThunk('posts/addNewPost', async (postData) => {
   const response = await axios.post(POSTS_URL, postData)
   return response.data;
 })

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
      postAdded: {
         reducer(state, action) {
            state.posts.push(action.payload)
          },
         prepare(title, content, userId) {
            return {
                payload: {
                    id: nanoid(),
                    title,
                    body:content,
                    userId,
                    date: new Date().toISOString(),
                    reactions: {
                      thumbsUp: 0,
                      wow: 0,
                      heart: 0,
                      rocket: 0,
                      coffee: 0
                    }
                 }
              }
            }
       },
       reactionAdded(state, action) {
         const {postId, reaction} = action.payload
         const existingPost = state.posts.find(((post) => post.id === postId))
         if(existingPost) {
             existingPost.reactions[reaction]++
         }
       }

    },
    extraReducers(builder) {
        builder
        .addCase(featchPosts.pending, (state, action) => {
            state.status = 'loading'
        })

        .addCase(featchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            let min = 1;

            const loadPosts = action.payload.map((post) => {
               post.date = sub(new Date(), {minutes: min++}).toISOString();
               post.reactions = {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
               }
               return post;   
             })
             state.posts = [...loadPosts]        
         })

       .addCase(featchPosts.rejected, (state, action) => {
           state.status = 'failed'
           state.error = action.error.message
       })
       
       .addCase(addNewPost.fulfilled ,(state, action) => {
         action.payload.userId = Number(action.payload.userId)
         action.payload.date = new Date().toISOString();
         action.payload.reactions = {
           thumbsUp: 0,
           wow: 0,
           heart: 0,
           rocket: 0,
           coffee: 0
         }
         state.posts.push(action.payload)
       })   
    }
})

export const selectAllPost = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions
export default postsSlice.reducer


