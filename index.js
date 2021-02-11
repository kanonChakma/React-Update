/*

*/

//All dependencies
 const yargs =require('yargs');
const notes = require('./notes');

//customize yargs version
yargs.version('1.1.0'); //Not Working 

//Create  add command
yargs.command({
    command:'add',
    describe:'Add a new node',
    builder:{
        title:{
           describe:'Note title',
           demandOption:true,
           type:'string'
        },
        body:{
           describe:'Note body',
           demandOption:true,
           type:'string' 
        }
    },
    handler(argv){
       notes.addNotes(argv.title, argv.body);
    }
})

//Create remove command
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
         title:{
             describe:'Remove a note',
             demandOption:true,
         }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
})

//Create List command
yargs.command({
    command:'list',
    ddescribe:'List Your notes',
    handler(){
        notes.listNote();
    }
})

//Create read command
yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title:{
            describe:'read note',
            demandOption:true,
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})
yargs.parse();
//console.log(yargs.argv);




