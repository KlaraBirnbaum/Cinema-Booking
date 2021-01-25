'use strict'

const seats = document.querySelectorAll('.seat');
const daysElm = document.querySelector('.dates');
const dateInput = document.querySelector('.dateInput'); 
const timeInput = document.querySelector('.timeInput');
const btnReservation = document.querySelector('.btn__reservation');
const seatingElm = document.querySelector('.seating__container');
const btnShow = document.querySelector('.btn__show');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.navbar__links');

const time = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

const dates = [
    {   "day": "Mon",
        "date": "25.1."
    }, 
    {
        "day": "Tue",
        "date": "26.1."
    },
    {
        "day": "Wed",
        "date": "27.1."
    },
    {
        "day": "Thur",
        "date": "28.1."
    },
    {
        "day": "Fri",
        "date": "29.1."
    },
    {
        "day": "Sat",
        "date": "30.1."
    },
    {
        "day": "Sun",
        "date": "31.1."
    },

]

seats.forEach((seat) => {
    seat.addEventListener('click', () => {
        seat.classList.toggle('seat-reserved');
    })
});

for (let i = 0; i < dates.length; i++) {
    const dayElm = document.createElement('div');
    dayElm.innerHTML += `
    <div class="day">${dates[i].day}</div>
    <div class="date">${dates[i].date}</div>
    ` 
    dayElm.addEventListener('click', () => {
        dateInput.value = dates[i].day + " " + dates[i].date;
    })
    daysElm.appendChild(dayElm);
}

const showDropdown = () => {
    time.forEach((time) => {
        const option = document.createElement("option");
        option.text = time;
        option.value = time;
        timeInput.add(option);
    });
}


timeInput.addEventListener('click', showDropdown());

// select occupied seats

const occupiedSeats = [];

for (let i = 0; i < 12; i++) {
    let random = Math.floor(Math.random() * seats.length);
    seats[random].classList.add('occupied');
    occupiedSeats.push(seats[random]);
}


const occupiedSeatsIndex = [...occupiedSeats].map(seat => [...seats].indexOf(seat));
localStorage.setItem("occupiedSeats", JSON.stringify(occupiedSeatsIndex));

// rezervace button

btnReservation.addEventListener('click', (e) => {
    const selectedSeats = document.querySelectorAll('.seat-reserved');
    const selectedSeatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    occupiedSeatsIndex.push(selectedSeatsIndex);
    occupiedSeats.push(selectedSeats);
    localStorage.setItem("occupiedSeats", JSON.stringify(occupiedSeatsIndex));
    
    const update = () => {
        selectedSeats.forEach((seat) => {
            seat.classList.remove('seat-reserved');
            seat.classList.add('occupied');
        });
    };

    update();
});

// zobrazit rezervace / plán sálu

btnShow.addEventListener('click', () => {

    if (dateInput.value === '') {
        alert("Vyberte datum");
    } else if (timeInput.value === '') {
        alert("Vyberte čas promítání");
    } else {
        seatingElm.classList.remove('invisible');
    };
});

// zobrazit menu - mobile version

    menu.addEventListener('click', ()=> {
        nav.classList.toggle('nav-active');
    });

    const linkActive = () => {
        nav.classList.remove('nav-active')
    }
    
    const navLink = document.querySelectorAll('.navbar__link');
    
    navLink.forEach(n => n.addEventListener('click', linkActive));



