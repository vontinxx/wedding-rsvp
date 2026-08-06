const scriptURL = "https://script.google.com/macros/s/AKfycbzXCcovs5ZM9YzqMXgckN_vwzTu_FRc9Nd1Reab__COKVJnJf65vv5NomY_PgZfoFlL/exec";


let guestRow = "";


function findGuest(){

    let name = document
    .getElementById("guestName")
    .value
    .trim();


    if(name === ""){
        document.getElementById("result").innerHTML =
        "Please enter your name.";
        return;
    }


    fetch(scriptURL + "?name=" + encodeURIComponent(name))

    .then(response => response.json())

    .then(data => {


        if(data.found){

            guestRow = data.row;


            document.getElementById("result").innerHTML =

            `
            <div class="guest-card">

            <h3>Welcome, ${data.name}!</h3>

            <p>
            We have reserved
            <strong>${data.seats}</strong>
            seat(s) for you.
            </p>

            <p>
            Will you be joining us?
            </p>


            <button onclick="submitRSVP('Attending')">
            Yes, We'll Be There
            </button>


            <button onclick="submitRSVP('Declined')">
            Sorry, We Can't Make It
            </button>


            </div>
            `;

        }


        else{

            document.getElementById("result").innerHTML =

            `
            <p>
            We couldn't find your invitation.
            Please check your name spelling.
            </p>
            `;

        }


    });

}



function submitRSVP(status){

    fetch(scriptURL, {

        method:"POST",

        body:
        new URLSearchParams({

            row: guestRow,
            status: status

        })

    })


    .then(()=>{

        document.getElementById("result").innerHTML =

        `
        <h3>Thank you! 🤎</h3>

        <p>
        Your RSVP has been recorded.
        We can't wait to celebrate with you!
        </p>
        `;

    });


}
