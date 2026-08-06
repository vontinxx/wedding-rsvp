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

                <div class="divider">🤎</div>

                <h3>Welcome, ${data.name}</h3>

                <p>
                We have reserved
                <strong>${data.seats}</strong>
                seat(s) for you.
                </p>

                <p class="question">
                Kindly confirm your attendance.
                </p>


                <button class="yes-btn" onclick="submitRSVP('Attending')">
                ✓ We'll Be There
                </button>


                <button class="no-btn" onclick="submitRSVP('Declined')">
                Regretfully Decline
                </button>

            </div>
            `;

        }


        else{

            document.getElementById("result").innerHTML =

            `
            <div class="guest-card">

            <p>
            We couldn't find your invitation.
            Please check your name spelling.
            </p>

            </div>
            `;

        }


    })

    .catch(error => {

        console.log(error);

        document.getElementById("result").innerHTML =
        "Something went wrong. Please try again.";

    });


}



function submitRSVP(status){


    fetch(scriptURL, {

        method:"POST",

        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },

        body:
        `row=${guestRow}&status=${status}`

    })


    .then(response => response.text())


    .then(data => {


        document.getElementById("result").innerHTML =

        `
        <div class="thank-you-card">

            <div class="divider">🤎</div>

            <h3>Thank you!</h3>

            <p>
            Your RSVP has been recorded.
            </p>

            <p>
            We can't wait to celebrate with you
            on November 14, 2026.
            </p>

            <div class="divider">🌿</div>

        </div>
        `;


    })


    .catch(error => {

        console.log(error);

        document.getElementById("result").innerHTML =

        `
        <div class="thank-you-card">

        <p>
        Something went wrong.
        Please try again.
        </p>

        </div>
        `;

    });


}
