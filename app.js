const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//Verzija
yargs.version('1.1.0');

//Dodaj
yargs.command({
    command: 'dodaj',
    describe: 'Dodavanje nove note',
    builder: {
        title: {
            describe: 'Titl note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Telo note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

//Izbrisi
yargs.command({
    command: 'izbrisi',
    describe: 'Brisanje postojece note',
    builder: {
        title: {
            describe: 'Titl note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Prikazi
yargs.command({
    command: 'prikazi',
    describe: 'Prikazujem sve note',
    handler() {
        notes.listNotes()
    }
})

//Procitaj
yargs.command({
    command: 'procitaj',
    describe: 'Citanje odredjene note',
    builder: {
        title: {
            describe: 'Titl note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.findNote(argv.title)
    }
})

yargs.parse()