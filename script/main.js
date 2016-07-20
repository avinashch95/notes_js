var notes = [],
    $addNote = $('#add-note'),
    addNoteForm = $addNote.find('.header-form'),
    $notes = $('.notes'),
    notesContainer = $notes.find('.container'),
    note_title = addNoteForm.find('input[name="note_title"]'),
    note_content = addNoteForm.find('textarea[name="note_content"]');

var cnt = 0;
function appendSingleNote(data) {
    var content = data.content, title = data.title, count = data.id;
    
    var html = '<div class="note" id="' + count + '">' + '<form class="header-form">' +
        '<button onclick="removeNote(' + count + ')" style = " float: right; border: 0; background: transparent; outline: 0; padding: 5px 10px; font-size: 13px; font-weight: 700;">^</button>'+            
        '<p class="note-title">' +
                     
                    title + 
                    '</p>' +
                    '<p class="note-content">' +
                        content + 
                    '</p>' + '</form>' +
                '</div>';
    
    notesContainer.append(html);
    cnt ++;
}

function storeNote(data) {
    
    notes.push(data);
    window.localStorage.setItem('notes', JSON.stringify(notes));
    
    appendSingleNote(data);
}

function init() {
    if (!!window.localStorage.getItem('notes')) {
        notes = JSON.parse(window.localStorage.getItem('notes'));
    } else {
        notes = [];
    }
    
    var i;
    for (i = 0; i < notes.length; i++) {
        appendSingleNote(notes[i]);
    }
}

addNoteForm.on('submit', function(e) {

    var data = {title: note_title.val(), content: note_content.val(), id: cnt};    
    
    storeNote(data);
})

init();

function removeNote(id) {
    var removeIndex = notes.map(function(item) { return item.id; })
                       .indexOf(id);

~removeIndex && notes.splice(removeIndex, 1);
  
    window.localStorage.setItem('notes', JSON.stringify(notes));
    
    var parent = document.getElementById('notes_all');
    var child = document.getElementById(id);
    parent.removeChild(child);
}