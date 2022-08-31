let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let arrayOfTasks = [];

async function get() {

    const response = await fetch("https://localhost:7217/api/lists")
    const data = await response.json()
    console.log(data)
  //  arrayOfTasks = [];
    for (let i = 0; i < data.length; i++) {


        const o = {
           
            Title: data[i].title,
            Status: data[i].status
        };



        arrayOfTasks.push(o);
    }

    addElementsToPageFrom(arrayOfTasks);

}
get();

// Add Task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add Task To Array Of Tasks
        input.value = ""; // Empty Input Field
    }
};

function addTaskToArray(taskText) {
    // Task Data
    const task = {
        
        Title: taskText,
        Status: 0
    };


    //-----------------------POST----------------------------//
    fetch('https://localhost:7217/api/lists', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(res => res.json())
        .then(res => console.log(res));

    console.log(task);
    arrayOfTasks.push(task);
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks To Page
    //addElementsToPageFrom(arrayOfTasks);
    //// Add Tasks To Local Storage
    //addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {

    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        if (task.Status === 1) {
            div.className = "task done";
        }
      //  div.setAttribute("data-id", task.Id);
        div.appendChild(document.createTextNode(task.Title));
        console.log(div)

        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);

        // Add Task Div To Tasks Container
        tasksDiv.appendChild(div);
    });
}

//-------------------------------------------------------------------------------------------------------//
//tasksDiv.addEventListener("click", (e) => {
//    // Delete Button
//    if (e.target.classList.contains("del")) {
//        // Remove Task From Local Storage
//        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
//        // Remove Element From Page
//        e.target.parentElement.remove();
//    }
    
//});

//function deleteTaskWith(id) {
//    fetch('https://localhost:7217/api/lists/' + id, {
//        method: 'DELETE',
//    })
//        .then(res => res.text()) // or res.json()
//        .then(res => console.log(res))
//  //  arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
//   // get();
//    //window.location.reload();
   
//}
