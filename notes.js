const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (duplicateNote) {
        console.log(chalk.inverse.red('Titl je zauzet'))
    } else {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.inverse.green('Nova nota dodata'))
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const findNote = notes.filter(note => note.title !== title)

    if (findNote.length < notes.length) {
        saveNotes(findNote)
        console.log(chalk.inverse.green('Nota ciji je titl ' + title + ' je izbrisana'))
    } else console.log(chalk.inverse.red('Nota nije nadjena'))
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length > 0) {
        notes.forEach(el => console.log(chalk.inverse.blue(el.title)))
    }else console.log(chalk.inverse.red('Nemate unetih nota'))
}

const findNote = title => {
    const notes = loadNotes()
    const findNote = notes.find(note => note.title === title);

    if(findNote){
        console.log(chalk.inverse.blue(findNote.title))
        console.log(chalk.inverse.yellow(findNote.body))
    }else console.log(chalk.inverse.red('Nema pronadjenih nota sa titlom ' + title))
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    findNote: findNote
}