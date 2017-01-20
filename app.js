const fs = require('fs');
const _ = require('lodash');
const yargs= require('yargs');

const notes = require('./notes.js');

const titleOptions ={
        describe: 'Title of Note',
        demand: true,
        alias: 't'
    };
const bodyOptions = {
    describe: 'Content of the Note',
    demand: true,
    alias: 'b'
};
const argv = yargs.command('add','Add a new note',{
    title: titleOptions,
    
    body:bodyOptions
})
.command('list','List all Notes')
.command('read','Read a note',{
  title: titleOptions
})
.command('remove','Delete a note',{
    title: titleOptions
})
.help().
argv;
var command = argv._[0];

if(command === 'add')
    {
        var note = notes.addNote(argv.title,argv.body);
        
        if(note)
           { 
       notes.logNote(note);
                }
        else{
            console.log('Note not found');
        }
    }
else if (command === 'list'){
    var allNotes=notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
}
else if(command === 'read'){
       var note= notes.getNote(argv.title);
     if(note)
           { 
       notes.logNote(note);
                }
        else{
            console.log('Note not found');
        }
}
else if(command === 'remove')
    {
        var noteRemoved = notes.removeNote(argv.title);
        var msg = noteRemoved ? 'Note was removed': 'Not not found'
        console.log(msg);
    }
else{
    console.log('Command not recognized');
}