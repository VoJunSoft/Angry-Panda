//function setup(){
//    noCanvas();
//    const video = createCapture(VIDEO);
//    video.size(300, 250);
//}

async function displayData(){
    const response = await fetch('/route');
    const data = await response.json(); 
    var rightPost = document.getElementById('rightPost');
    var recSpan;
    data.forEach(obj => {
        recSpan = document.createElement('nav');
        recSpan.setAttribute('id', `${obj._id}`);
        recSpan.innerHTML=`${obj.name} - ${obj.taskDate}`;
        rightPost.appendChild(recSpan);
    }); 
    
    rightPost.addEventListener('click', e => {
        var clickedID = e.target.id;
        displayDesc(clickedID);
        //animate();
    });
}

async function displayDesc(id){
    const response = await fetch('/route');
    const data = await response.json();
    data.forEach(obj => {
        if(obj._id == id)
            document.getElementById('bottom').innerHTML = `${obj.description}`;
    });
}

function verificationForm(){

    var name = document.getElementById('name').value;
    var description = document.getElementById('desc').value;
    var d = new Date();
    if(!name || !description){
        alert('Fill form properly');
        return;
    } else {
    insertData(name, description, d)
        .catch(err => alert("Error..."));
    }
}

async function insertData(name, description, d){
    var taskDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
    const dataRec = {name , description, taskDate};
    const options = {
                 method: 'POST',
                 body: JSON.stringify(dataRec),
                 headers: {'Content-Type': 'application/json'}
    };
    const response = await fetch('/route', options);
    const resData = await response.json();
    
    displayData();
}
