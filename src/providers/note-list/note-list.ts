import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Note } from '../../models/note';

@Injectable()
export class NoteListService {

    private noteListRef = this.db.list<Note>('notas');

    constructor(private db: AngularFireDatabase) { }

    getNoteList() {
        return this.noteListRef;
    }

    addNote(note: Note) {
        return this.noteListRef.push(note);
    }

    updateNote(note: Note) {
        return this.noteListRef.update(note.key, note);
    }

    removeNote(note: Note) {
        return this.noteListRef.remove(note.key);
    }
}