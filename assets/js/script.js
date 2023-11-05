const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    let currentTime = `${hours}:${minutes}`;

    document.getElementById('current-time').innerHTML = `${currentDate}  ${currentTime}`;
// Default
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=gaza&appid=ddacb88f9363233a058989363635c91d&lang=fr&units=metric`)
    .then(response => response.json())
    .then(data => {
        let infos = document.getElementById('infos');
        let temperature =  Math.round(data.list[0].main.temp);
        let description = data.list[0].weather[0].description;
        let icon = data.list[0].weather[0].icon;
        // console.log(data.list[0].dt_txt)
        infos.innerHTML = `
                <div class="card">
                    <div class="card-body d-flex align-items-center">
                        <div class="flex-grow-1">
                            <h1 class="card-title">Gaza</h1>
                            <p class="card-text">Temperature: ${temperature}°C</p>
                            <p class="card-text">Description: ${description}</p>
                        </div>
                        <div class="text-center">
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" class="card-img-top">
                        </div>
                    </div>
                </div>
            `;

        for (const index of data.list) {
            let temperature =  Math.round(index.main.temp);
            let description = index.weather[0].description;
            let icon = index.weather[0].icon;
            let weathers = document.getElementById('weathers');
            if (index.dt_txt.includes("6:00:00")) {
                console.log(index.dt_txt);

                let matin = document.createElement('div');
                matin.classList.add('col-lg-3', 'time-section', 'text-center');
                matin.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title text">Matin</h5>
                    <div class="temperature">
                        <p class="card-text">Temperature: ${temperature}</p>
                        <div class="icon"> <!-- Add this div for the icon -->
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" class="card-img-top">
                        </div>
                    </div>
                    <p class="card-text">Description: ${description}</p>
                </div>`;
                weathers.appendChild(matin);

            } if (index.dt_txt.includes("12:00:00")) {
                console.log(index.dt_txt);
                let aprem = document.createElement('div');
                aprem.classList.add('col-lg-3', 'time-section', 'text-center');
                aprem.innerHTML = ` 
                <div class="card-body">
                    <h5 class="card-title">Après-midi</h5>
                    <div class="temperature">
                        <p class="card-text">Temperature: ${temperature}</p>
                        <div class="icon"> <!-- Add this div for the icon -->
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" class="card-img-top">
                        </div>
                    </div>
                    <p class="card-text">Description: ${description}</p>
                </div>`;
                weathers.appendChild(aprem);

            } if (index.dt_txt.includes("18:00:00")) {
                console.log(index);
                let soir = document.createElement('div');
                soir.classList.add('col-lg-3', 'time-section', 'text-center');
                soir.innerHTML = ` 
                <div class="card-body">
                    <h5 class="card-title">Soir</h5>
                    <div class="temperature">
                        <p class="card-text">Temperature: ${temperature}</p>
                        <div class="icon"> <!-- Add this div for the icon -->
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" class="card-img-top">
                        </div>
                    </div>
                    <p class="card-text">Description: ${description}</p>
                </div>`;
                weathers.appendChild(soir);

            } if (index.dt_txt.includes("00:00:00")) {
                console.log(index.dt_txt);
                let nuit = document.createElement('div');
                nuit.classList.add('col-lg-3', 'time-section', 'text-center');
                nuit.innerHTML = ` 
                <div class="card-body">
                    <h5 class="card-title">Nuit</h5>
                    <div class="temperature">
                        <p class="card-text">Temperature: ${temperature}</p>
                        <div class="icon"> <!-- Add this div for the icon -->
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" class="card-img-top">
                        </div>
                    </div>
                    <p class="card-text">Description: ${description}</p>
                </div>`
                weathers.appendChild(nuit);

                break;

            }

        }
    })




















// Search button 
let button = document.getElementById('submit');

button.addEventListener('click', function () {
    let cityInput = document.getElementById('input').value;
    let city = cityInput.charAt(0).toUpperCase() + cityInput.slice(1);

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ddacb88f9363233a058989363635c91d&lang=fr&units=metric`)
        .then(response => response.json())
        .then(data => {
            let infos = document.getElementById('infos');
            let weathers = document.getElementById('weathers');
            weathers.innerHTML = '';
            let temperature = Math.round(data.list[0].main.temp);
            let description = data.list[0].weather[0].description;
            let icon = data.list[0].weather[0].icon;

            // Assuming you want to display the temperature and description from the API response

            infos.innerHTML = `
                <div class="card">
                    <div class="card-body d-flex align-items-center">
                        <div class="flex-grow-1">
                            <h1 class="card-title">${city}</h1>
                            <p class="card-text">Temperature: ${temperature}°C</p>
                            <p class="card-text">Description: ${description}</p>
                        </div>
                        <div class="text-center">
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" class="card-img-top">
                        </div>
                    </div>
                </div>
            `;
            for (const index of data.list) {
                let temperature = Math.round(index.main.temp);
                let description = index.weather[0].description;
                let icon = index.weather[0].icon;
                if (index.dt_txt.includes("6:00:00")) {
                    let matin = document.createElement('div');
                    matin.classList.add('col-lg-3', 'time-section', 'text-center');
                    matin.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title text">Matin</h5>
                        <div class="temperature">
                            <p class="card-text">Temperature: ${temperature}</p>
                            <div class="icon"> <!-- Add this div for the icon -->
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" class="card-img-top">
                            </div>
                        </div>
                        <p class="card-text">Description: ${description}</p>
                    </div>`;
                    weathers.appendChild(matin);

                } if (index.dt_txt.includes("12:00:00")) {
                    let aprem = document.createElement('div');
                    aprem.classList.add('col-lg-3', 'time-section', 'text-center');
                    aprem.innerHTML = ` 
                    <div class="card-body">
                        <h5 class="card-title">Après-midi</h5>
                        <div class="temperature">
                            <p class="card-text">Temperature: ${temperature}</p>
                            <div class="icon"> <!-- Add this div for the icon -->
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" class="card-img-top">
                            </div>
                        </div>
                        <p class="card-text">Description: ${description}</p>
                    </div>`;
                    weathers.appendChild(aprem);

                } if (index.dt_txt.includes("18:00:00")) {
                    let soir = document.createElement('div');
                    soir.classList.add('col-lg-3', 'time-section', 'text-center');
                    soir.innerHTML = ` 
                    <div class="card-body">
                        <h5 class="card-title">Soir</h5>
                        <div class="temperature">
                            <p class="card-text">Temperature: ${temperature}</p>
                            <div class="icon"> <!-- Add this div for the icon -->
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" class="card-img-top">
                            </div>
                        </div>
                        <p class="card-text">Description: ${description}</p>
                    </div>`;
                    weathers.appendChild(soir);

                } if (index.dt_txt.includes("00:00:00")) {
                    let nuit = document.createElement('div');
                    nuit.classList.add('col-lg-3', 'time-section', 'text-center');
                    nuit.innerHTML = ` 
                    <div class="card-body">
                        <h5 class="card-title">Nuit</h5>
                        <div class="temperature">
                            <p class="card-text">Temperature: ${temperature}</p>
                            <div class="icon"> <!-- Add this div for the icon -->
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" class="card-img-top">
                            </div>
                        </div>
                        <p class="card-text">Description: ${description}</p>
                    </div>`
                    weathers.appendChild(nuit);
                    break;

                }

            }
        })

});