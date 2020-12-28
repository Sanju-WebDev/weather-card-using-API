window.addEventListener('load', () => {
    let lat;
    let long;
    const key = '891d86115633619d90074c60672ac0d9';
    //to get the cordinates to our location
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(myposition => {
            console.log(myposition);
            long = myposition.coords.longitude;
            lat = myposition.coords.latitude;
            //weatherstack API 76835d47b02779831f7498df21680084
            //openweathermap API 891d86115633619d90074c60672ac0d9
        //if api not working, get proxy
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            fetch(api)
                .then( respond => {
                    return respond.json();
                })
                .then(data => {
                    console.log(data);
                    const mytemp = data.main.temp;
                    const myplace = data.name;
                    const summary = data.weather[0].description;
                    const iconid = data.weather[0].icon;
                    //save the attributes to local variables
                    document.querySelector(".location").textContent = myplace;
                    document.querySelector(".temp").textContent = mytemp;
                    document.querySelector(".summary").innerText = summary;
                    document.querySelector("#icon").src = "weather-icons/"+iconid+".png";
                    document.querySelector(".temperature").addEventListener('click', () => {
                        if(document.querySelector(".unit").innerText=="F") {
                            document.querySelector(".unit").textContent="C";
                            document.querySelector(".temp").textContent = Math.floor((mytemp-32) * 5 / 9);
                        } else {
                            document.querySelector(".unit").innerText="F";
                            document.querySelector(".temp").textContent = mytemp;
                        }
                    });

                });
        });
    } else {
        alert("something went wrong!!!");
    }
});