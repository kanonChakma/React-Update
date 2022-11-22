import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const initialState = [
  {id:'1', 
  title:"Learning Redux Toolkit", 
  content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been text ever since the 1500",
  date: sub(new Date(), {minutes: 10}).toISOString()
},  
  {id:'2',
   title:"Train Your Mind Buddy",  
   content:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
   date: sub(new Date(), {minutes: 5}).toISOString() 
  }  
]

const postSlice = createSlice({
  name:"posts",
  initialState,
  reducers:{
     postAdded: {
       reducer(state, action) {
         state.push(action.payload)  
       },
       prepare(title, content, userId) {
         return {
           payload: {
             id: nanoid(),
             title,
             content,
             userId,
             date: new Date().toISOString()
           }
         }
       }
     }
  }
})

export const selectAllPost = (state) => state.posts;
export const {postAdded} = postSlice.actions;
export default postSlice.reducer

