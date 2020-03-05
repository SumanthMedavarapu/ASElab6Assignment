
const fs =  require('fs');
const yargs = require('yargs');

const notes = require('./notes.js');

// ------------ Begin - command configuration -----------------


const customeridOptions = {
    describe: 'Customerid of note',
    demand : true,
    alias : 'i'
}

const customernameOptions = {
    describe: 'Customername of a note',
    demand : true,
    alias : 'n'
}
const customeremailOptions = {
  describe: 'Customeremail of a note',
  demand : true,
  alias : 'e'
}

const argv =  yargs

    .command('add','Add a new note',{
      customerid: customeridOptions,
      customername: customernameOptions,
      customeremail: customeremailOptions
    })
    .command('list','List all notes')
    .command('read','Read a note',{
      customerid: customeridOptions
    })
    .command('remove','Remove a Note',{
      customerid: customeridOptions
    })
    .command('update','update a Note',{
      customerid: customeridOptions,
      customername: customernameOptions,
      customeremail: customeremailOptions
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = yargs.argv._[0];


if (command === 'add'){
    var note = notes.addNote(argv.customerid,argv.customername,argv.customeremail);
    if (note){
      notes.logNote(note);                                //add a new note
    } else{
      console.log("Note already exists");
    }
}

else if (command === 'list') {
  var AllNotes = notes.getAll();
  console.log(`Printing ${AllNotes.length} note(s).`);
  AllNotes.forEach((note)=>{                                //list all note(s)
    notes.logNote(note);
  });
}

else if (command === 'read') {
   var note = notes.getNote(argv.customerid);
   if(note){
    notes.logNote(note);                                //read a note 
          }
   else{
    console.log("Note not found");
   }
}
else if (command === 'update'){
  var note = notes.updateNote(argv.customerid,argv.customername,argv.customeremail);
  
  if(note){
    notes.logNote(note); 
    console.log("Note is updated");
                                    //add a new note
  } else{
    
    console.log("Note doesn't  exist to update");
  }
}
else if (command === 'remove') {
    var noteRemoved = notes.remove(argv.customerid);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}

else{
  console.log('command note recognized'); 
}

