const botton1 = document.getElementById("bottone");
const botton2 = document.querySelector(".add");
const cancelbotton = document.getElementById("cancelBotton");
const todo = document.getElementById("todo");
const inProgress = document.getElementById("Inprogress");
const done = document.getElementById("done");

let idCount = 4;

const todoTasks = [
  {
    titre: "test 1",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis placeat explicabo voluptas veniam ducimus. Reprehenderit!",
    deathline: "4/12/2024",
    catalog: "tres important",
    places: "todo",
    id: 1,
  },
  {
    titre: "test 2",
    description: "Lorem itae nam atque officiis odit quos nesciunt repellat iure dolor perspiciatis error eius vel!",
    deathline: "23/4/2025",
    catalog: "important moyenne",
    places: "in progress",
    id: 2,
  },
  {
    titre: "test 3",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint.",
    deathline: "20/10/2024",
    catalog: "ne important pas",
    places: "done",
    id: 3,
  },
];

botton1.addEventListener("click", () => {
  botton2.classList.remove("hidden");
});

cancelbotton.addEventListener("click", () => {
  botton2.classList.add("hidden");
});

function affichage(taches) {
  todo.innerHTML = "";
  inProgress.innerHTML = "";
  done.innerHTML = "";

  let contTODO = 0;
  let contDOING = 0;
  let contDONE = 0;

  taches.forEach((tach) => {
    let colorP;
    if (tach.catalog === "tres important") {
      colorP = "bg-red-500";
    } else if (tach.catalog === "important moyenne") {
      colorP = "bg-orange-500";
    } else {
      colorP = "bg-green-500";
    }

    const tachtext = 
    `<div id="div" class="bg-gray-100 rounded-lg text-center m-3 mb-5 w-auto break-words" data-id="${tach.id}">
        <select class="modifiertach font-serif bg-gray-100">
          <option value="todo" ${tach.places === "todo" ? "selected" : ""}>à faire</option>
          <option value="in progress" ${tach.places === "in progress" ? "selected" : ""}>en cours</option>
          <option value="done" ${tach.places === "done" ? "selected" : ""}>terminé</option>
        </select>
        <h3 class="h-2 block ${colorP} rounded-r-lg rounded-l-lg"></h3>
        <p class="font-extrabold font-mono pb-4 pt-2">${tach.titre}</p>
        <button id='${tach.id}' onclick="handle(${tach.id})" type="button" class="break-word sw-auto max-w-full ml-3">
          <p id="descrip-${tach.id}" class="font-normal font-mono text-left line-clamp-2">${tach.description}</p>
        </button>
        <p class="text-gray-600 block font-mono">${tach.deathline}</p>
        <button class="delettach"><img class="block h-4 w-4" src="assets/images/sup.png" alt="image de supprimer"></button>
      </div>`;

    if (tach.places === "todo") {
      todo.innerHTML += tachtext;
      contTODO++;
    } else if (tach.places === "in progress") {
      inProgress.innerHTML += tachtext;
      contDOING++;
    } else if (tach.places === "done") {
      done.innerHTML += tachtext;
      contDONE++;
    }
  });

  document.getElementById('todocont').innerText = `${contTODO}`;
  document.getElementById('doingcont').innerText = `${contDOING}`;
  document.getElementById('donecont').innerText = `${contDONE}`;
  document.getElementById('total').innerText = `${contDONE + contDOING + contTODO}`;

  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll(".delettach").forEach((button) => {
    button.addEventListener("click", (event) => {
      const tachElem = event.target.closest("div");
      const idtach = parseInt(tachElem.getAttribute("data-id"));
      deletTask(idtach);
      affichage(todoTasks);
    });
  });

  document.querySelectorAll(".modifiertach").forEach((select) => {
    select.addEventListener("change", (event) => {
      const tachElem = event.target.closest("div");
      const idtach = parseInt(tachElem.getAttribute("data-id"));
      const newValue = event.target.value;
      changestatus(idtach, newValue);
      affichage(todoTasks);
    });
  });
}

function handle(id) {
  const descripElement = document.getElementById(`descrip-${id}`);
  const isClamped = descripElement.classList.contains('line-clamp-2');
  if (isClamped) {
    descripElement.classList.remove('line-clamp-2');
    descripElement.classList.add('line-clamp-none');
  } else {
    descripElement.classList.add('line-clamp-2');
    descripElement.classList.remove('line-clamp-none');
  }
}

function deletTask(id) {
  const index = todoTasks.findIndex((tach) => tach.id === id);
  if (index !== -1) {
    todoTasks.splice(index, 1);
  }
}

function changestatus(id, new_value) {
  const index = todoTasks.findIndex((tach) => tach.id === id);
  if (index !== -1) {
    todoTasks[index].places = new_value;
  }
}

function checkDate(deathline) {
  const date = new Date(deathline);
  const new_year = date.getFullYear();
  const new_month = date.getMonth() + 1;
  const new_day = date.getUTCDate();

  const date_now = new Date();
  const year = date_now.getFullYear();
  const month = date_now.getMonth() + 1;
  const day = date_now.getUTCDate();

  let test = true;

  if (year == new_year) {
    if (month == new_month) {
      if (day > new_day) {
        test = false;
      }
    } else if (month > new_month) {
      test = false;
    }
  } else if (year > new_year) {
    test = false;
  }
  return test;
}

function clearform() {
  document.getElementById("titre").value = "";
  document.getElementById("description").value = "";
  document.getElementById("death-line").value = "";
  document.getElementById("important").value = "";
  document.getElementById("places").value = "todo";
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const titre = document.getElementById("titre").value;
  const description = document.getElementById("description").value;
  const deathline = document.getElementById("death-line").value;
  const catalog = document.getElementById("important").value;
  const places = document.getElementById("places").value;

  const check = checkDate(deathline);
  if (check) {
    alert('succes');
  } else {
    alert('date non valide! ajouter date valide');
    return;
  }

  const formValues = {
    titre: titre,
    description: description,
    deathline: deathline,
    catalog: catalog,
    places: places,
    id: idCount++,
  };

  todoTasks.unshift(formValues);
  affichage(todoTasks);
  botton2.classList.add("hidden");
  clearform();
});

affichage(todoTasks);
