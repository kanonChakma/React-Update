//dependencies
const fs=require("fs");
const chalk=require("chalk");

const addNumber=(a,b)=>a+b;

//Add data to the file
const addNotes=(title,body)=>{
    const notes=loadNotes(body);
      
    //const duplicateNotes=notes.filter((note)=>note.title==title)
    const duplicateNote=notes.find((note)=>note.title==title);
    
    debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('Add a new note'));
    }else{
        console.log(chalk.red.inverse("all ready has a note with this title"));
    }
}

//Remove note
const removeNote =(title)=>{
     const notes =loadNotes();
      const newNotes = notes.filter((note)=>{
          return note.title !== title;
        })
        if(notes.length >newNotes.length){
            console.log(chalk.red.inverse('remove a new note'));
            saveNotes(newNotes);
        }else{
           console.log(chalk.red.inverse('No node found'));   
        }
  }

//Show All list
const listNote=()=>{
   const list=loadNotes();

   if(list.length>0){
       list.forEach((list)=>{
          console.log(list);
       })
   }else{
       console.log(chalk.red.inverse('There is no list'));
   }
}

//Read Notes
const readNote=(title)=>{
  const notes =loadNotes();
  const existNotes =notes.find((note)=>note.title==title);
  
  if(existNotes){
     console.log(chalk.green.inverse(existNotes.title))
     console.log(chalk.green.inverse(existNotes.body));
  }else{
    console.log(chalk.red.inverse('notFound'));
  }
}

//Save data in the file
const saveNotes=(note)=>{
  const JSONdata = JSON.stringify(note);
  fs.writeFileSync('notes.json', JSONdata);
}

//Load data from file
const loadNotes=()=>{
 try{
    const dataBuffer=fs.readFileSync('notes.json','utf8');
    const dataJSON=JSON.parse(dataBuffer);
    return dataJSON;
 }catch(e){
     return [];
  }  
}

//
module.exports={
    addNumber:addNumber,
    addNotes:addNotes,
    removeNote:removeNote,
    listNote:listNote,
    readNote:readNote,
}

