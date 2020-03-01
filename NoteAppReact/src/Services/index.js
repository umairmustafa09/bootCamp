class NoteService {
    notes = []

    set setNotes(arr) {
        this.notes = arr;
    }

    get getNotes() {
        return this.notes
    }

}

export default new NoteService();