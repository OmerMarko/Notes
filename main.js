let notes = [];

// load the page after refreshing * important *
loadToLocalStorage()


function addNote() {
    event.preventDefault();

    const taskBox = document.getElementById("taskBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    const form = document.getElementById("notesForm");
    const notesContainer = document.getElementById("notesContainer");

    const note = {
        task: taskBox.value,
        date: formatDate(dateBox.value),
        time: timeBox.value,
    }

    function formatDate(date) {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    }


    notes.push(note);

    // save to local storage after the push to the array of notes.
    saveToLocalStorage()
    // display items 
    displayNotes()

    form.reset();
    taskBox.focus();

    const newNote = notesContainer.lastElementChild;
    newNote.classList.add("fade-in");
}

// save to local storage function

function saveToLocalStorage() {
    const str = JSON.stringify(notes);
    localStorage.setItem("myNotes", str);
}

// load to local storage function

function loadToLocalStorage() {
    const str = localStorage.getItem("myNotes");
    if (str !== null && str !== undefined) {
        notes = JSON.parse(str);
        displayNotes()
    }
}

function displayNotes() {
    const notesContainer = document.getElementById("notesContainer");

    let html = "";
    for (let i = 0; i < notes.length; i++) {
        const item = notes[i]
        html += `
         <div class="note">
        <button class="close-button" onclick="deleteItem(${i})" type="button">
          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
        <div class="content">
          <h4>${item.task}</h4>
        </div>
        <p>Date: ${item.date}</p>
        <p>Time: ${item.time}</p>
      </div>
    `;

    }

    notesContainer.innerHTML = html;

}

function deleteItem(index) {
  notes.splice(index, 1);
  saveToLocalStorage();
  displayNotes();
}