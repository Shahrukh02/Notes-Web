const onlineStatus = () => {
  let checkOnline = localStorage.getItem("onlineStatus");
  console.log(checkOnline);
  if (checkOnline == "false") {
    location = "../login.html";
  }
};

let greetingName = document.getElementById("greetig_name");
let logoutBtn = document.getElementById("logoutBtn");
let noteCreateBtn = document.getElementById("noteCreateBtn");
let allNotes = document.getElementById("allNotes");

logoutBtn.addEventListener("click", () => {
  localStorage.setItem("onlineStatus", false);
  localStorage.removeItem("userOnline");
  onlineStatus();
});

onlineStatus();

let getdata = localStorage.getItem("userdata");
let dataIntoJson = JSON.parse(getdata);
let onlineUserId = localStorage.getItem("userOnline");
let result = dataIntoJson.find((item) => item.id == onlineUserId);
greetingName.innerHTML = result.Name;

noteCreateBtn.addEventListener("click", async () => {
  const { value: noteValue } = await Swal.fire({
    title: "Enter Note Titile",
    input: "text",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });

  if (noteValue) {
    noteCreate(noteValue);
  }
});
let getNotesData = localStorage.getItem("notesData");
let getNotesDataIntoJson = JSON.parse(getNotesData);

const pushNotes = () => {
  let noteIndexFind = getNotesDataIntoJson.findIndex(
    (item) => item.noteId == localStorage.getItem("workingIdNote")
  );
  emptyArr = [];
  getNotesDataIntoJson.forEach((e) => {
    emptyArr.push(e.noteId);
  });

  if (emptyArr.indexOf(localStorage.getItem("workingIdNote")) == -1) {
    getNotesDataIntoJson.push({
      noteId: localStorage.getItem("workingIdNote"),
      textValue: editor.value,
    });
    localStorage.setItem("notesData", JSON.stringify(getNotesDataIntoJson));
  } else {
    getNotesDataIntoJson[noteIndexFind] = {
      noteId: localStorage.getItem("workingIdNote"),
      textValue: editor.value,
    };
    localStorage.setItem("notesData", JSON.stringify(getNotesDataIntoJson));
  }
  editor.value = "";
};

const noteUpdate = () => {
  modal.style.display = "none";
  if (getNotesData) {
    pushNotes();
  } else {
    let noteText = [
      {
        noteId: localStorage.getItem("workingIdNote"),
        textValue: editor.value,
      },
    ];
    localStorage.setItem("notesData", JSON.stringify(noteText));
    location.reload();
    editor.value = "";
  }
};

let findIndexArr = dataIntoJson.findIndex((item) => item.id == result.id);
let getUserNotes = localStorage.getItem("userNotes");
let getUserNotesJson = JSON.parse(getUserNotes);

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
const editor = Jodit.make("#editor");

function getTextarea(e) {
  modal.style.display = "block";
  localStorage.setItem("workingIdNote", e);
  let filterNotes = getNotesDataIntoJson.find((item) => item.noteId == e);
  if (filterNotes) {
    editor.value = filterNotes.textValue;
  } else {
    editor.value = "";
  }
}

let noNotes = document.getElementById("noNotes");
const noteCreate = (e) => {
  noNotes.style.display = "none";
  let noteId = Date.now();
  allNotes.innerHTML += ` <div class="notes"  onclick="getTextarea(${noteId})" >
    <div class="icon">
      <img class="note_icon" src="../note_icon/note-icon.png" alt="">
    </div>
    <div class="note_title">
      <h3><span class="title_gray">Note Title:</span> ${e} </h3>
    </div>
    </div>
    `;
  if (getUserNotes) {
    getUserNotesJson.push({
      id: result.id,
      noteId: Date.now(),
      noteTitile: e,
    });
    localStorage.setItem("userNotes", JSON.stringify(getUserNotesJson));
    console.log("nechy");
  } else {
    let userNotes = [
      {
        id: result.id,
        noteId,
        noteTitile: e,
      },
    ];
    localStorage.setItem("userNotes", JSON.stringify(userNotes));
    console.log("uper");
    location.reload();
  }
};

let allMatchNotes = getUserNotesJson.filter((item) => item.id == result.id);

span.onclick = function () {
  modal.style.display = "none";
};

let removeLink = document.querySelector(".jodit-status-bar-link");
removeLink.innerText = "";

if (allMatchNotes) {
  console.log(allMatchNotes[0].noteTitile)
    ? (noNotes.style.display = "block")
    : (noNotes.style.display = "none");
  for (let i = 0; i < allMatchNotes.length; i++) {
    allNotes.innerHTML += ` <div class="notes"  onclick="getTextarea(${allMatchNotes[i].noteId})" >
    <div class="icon">
      <img class="note_icon" src="../note_icon/note-icon.png" alt="">
    </div>
    <div class="note_title">
      <h3><span class="title_gray">Note Title:</span> ${allMatchNotes[i].noteTitile} </h3>
    </div>
    </div>
    `;
  }
} else {
  noNotes.style.display = "block";
}
