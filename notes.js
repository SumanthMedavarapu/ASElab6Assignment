const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchNotes = () => {
  try {                          //if file won't exist
    var notesString = fs.readFileSync('notes-data.json')
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};


// ------------------End of Reusable functions ---------------------


//  to add a new note

var addNote = (customerid,customername,customeremail) => {   
    var notes = fetchNotes();
    var note = {customerid,customername,customeremail}

    var duplicateNotes =  notes.filter((note) => { // to check if note already exists
      return note.customerid === customerid;
    });

    if (duplicateNotes.length === 0){
      notes.push(note);
      saveNotes(notes);
      return note
    }

  };


  var updateNote = (customerid,customername,customeremail) => {   
    var notes = fetchNotes();
    var note = {customerid,customername,customeremail}
    
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].customerid === customerid) {
          notes[i].customername = customername;
          notes[i].customeremail=customeremail;
          saveNotes(notes)
          return note;
        }
      }
    
  };



//to list all the notes

var getAll = () => {
    return fetchNotes();
};


// to read a note

var getNote = (customerid) => {
    
    var notes = fetchNotes();

    var getNotes =  notes.filter((note) => {  // to check if note exists and return note
      return note.customerid === customerid;
    });

    return getNotes[0]

};


// to delete a note

var remove = (customerid) => {

    var notes = fetchNotes(); // reusable func

    var filteredNotes =  notes.filter((note) => { // will return all other notes other than "note to be removed"
      return note.customerid !== customerid;
    });

    saveNotes(filteredNotes); //save new notes array

    return notes.length !== filteredNotes.length
    
};

// function just to print out note to screen

var logNote = (note) => { 
  console.log('--');
  console.log(`Customerid: ${note.customerid}`);
  console.log(`Customername: ${note.customername}`);
  console.log(`Customeremail: ${note.customeremail}`);
};


// add new function names here to be accessible from other modules

module.exports = {
  addNote, getAll, remove, getNote,logNote,updateNote
};
