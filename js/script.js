function Note (title, content) {
    this.title = title;
    this.content = content
};

readLocalStorage();

function createNoteHTML(note) {
    (!note.title) ? title = "" : title = note.title;
    (note.content == undefined) ? content = "" : content = note.content;

    return '<div class="note">' +
    '<input type="text" value="' + title + '" class="title" placeholder="Title"/><button class="remove">X</button>' +
    '<textarea rows="10" cols="25" class="content" placeholder="Write your note">' + content +'</textarea>' +
    '</div>';
};

function insertNoteToPage(note) {
    if (!note) {
        note = new Note("", "");
    }
        
    var noteHTML = createNoteHTML(note);
    document.getElementById("desktop").innerHTML += noteHTML;
    
    var buttonsDeleteArray = document.querySelectorAll('.remove');
   
    for (var i=0; i < buttonsDeleteArray.length; i++) {

        buttonsDeleteArray[i].addEventListener('click', deleteNote);
    }

    var nodeNoteList = document.querySelectorAll("div.note"); 
    
    for (var i=0; i < nodeNoteList.length; i++) {
    
        var titleNote = nodeNoteList[i].querySelector("input.title");
        var contentNote = nodeNoteList[i].querySelector("textarea.content");
        
        titleNote.addEventListener("change", updateLocalStorage);
        contentNote.addEventListener("change", updateLocalStorage);
    };
};

function deleteNote(event) {
    
    var child = event.target.parentNode;
    var parent = child.parentNode;
    parent.removeChild(child);
    updateLocalStorage();
};

function updateLocalStorage() {
   
    var nodeNoteList = document.querySelectorAll("div.note");  
    var toJson = "";
    var noteArray = [];
   
    for (var i=0; i < nodeNoteList.length; i++) {
    
        var nodeNote = nodeNoteList[i];
        var titleNote = nodeNote.querySelector("input.title").value;
        var contentNote = nodeNote.querySelector("textarea.content").value;

        var note = new Note(titleNote, contentNote);
        noteArray.push(note);
    };
    localStorage.setItem("noteJSON", JSON.stringify(noteArray));
};


function readLocalStorage() {
    var noteArray = [];
    var htmlNotes = "";
    var json = localStorage.getItem("noteJSON");
    
    if (json != null) {
        noteArray = JSON.parse(json);
    };
    
    for (var i=0; i < noteArray.length; i++) {
        insertNoteToPage(noteArray[i]);
    };
};

function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}

var buttonAddNote = document.getElementById("add");
buttonAddNote.addEventListener("click", insertNoteToPage);

var buttonClearNotes = document.getElementById("clear");
buttonClearNotes.addEventListener("click", clearLocalStorage);