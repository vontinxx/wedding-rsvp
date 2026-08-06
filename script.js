const scriptURL = "https://script.google.com/macros/s/AKfycbzXCcovs5ZM9YzqMXgckN_vwzTu_FRc9Nd1Reab__COKVJnJf65vv5NomY_PgZfoFlL/exec";


function findGuest(){

let name = document
.getElementById("guestName")
.value
.trim();


if(name==""){
document.getElementById("result").innerHTML =
"Please enter your name.";
return;
}


fetch(scriptURL + "?name=" + encodeURIComponent(name))

.then(response => response.json())

.then(data => {


if(data.found){

document.getElementById("result").innerHTML =

`
<h3>Welcome, ${data.name}!</h3>

<p>
We have reserved <strong>${data.seats}</strong>
seat(s) for you.
</p>

<button>
Confirm Attendance
</button>
`;

}

else{

document.getElementById("result").innerHTML =

`
<p>
We couldn't find your invitation.
Please check your spelling or contact Christine & Von.
</p>
`;

}


});

}
