// Get the elements

const form = document.querySelector('#form')


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const day = document.querySelector('#day').value;
    const month = document.querySelector('#month').value;
    const year = document.querySelector('#year').value;

    const regexDay = /^(0?[1-9]|1\d|2\d|3[01])$/;
    const regexMonth = /^(0?[1-9]|1[0-2])$/;
    const regexYear = /^[0-9]{4}$/;

    const calculatedYear = document.querySelector('#calculatedYear');
    const calculatedMonth = document.querySelector('#calculatedMonth');
    const calculatedDay = document.querySelector('#calculatedDay');

    const currentDate = new Date();

    const errorForm = document.querySelector('#errorForm');
    const errorDay = document.querySelector('#errorDay');
    const errorMonth = document.querySelector('#errorMonth');
    const errorYear = document.querySelector('#errorYear');


    // Validating the inputs

    if (day === '') {
        errorDay.textContent = 'This field is required';
        errorDay.classList.remove('inactive');
    } else if (!regexDay.test(day)) {
        errorDay.textContent = 'Must be a valid day';
        errorDay.classList.remove('inactive');
    } else {
        errorDay.classList.add('inactive');
    }

    if (month === '') {
        errorMonth.textContent = 'This field is required';
        errorMonth.classList.remove('inactive');
    } else if (!regexMonth.test(month)) {
        errorMonth.textContent = 'Must be a valid month';
        errorMonth.classList.remove('inactive');
    } else {
        errorMonth.classList.add('inactive');
    }

    if (year === '') {
        errorYear.textContent = 'This field is required';
        errorYear.classList.remove('inactive');
    } else if (!regexYear.test(year) || year >= currentDate.getFullYear()) {
        errorYear.textContent = 'Must be a in the past';
        errorYear.classList.remove('inactive');
    } else {
        errorYear.classList.add('inactive')
    }

    // Making the inputs match the regex

    if (regexDay.test(day) && regexMonth.test(month) && (regexYear.test(year) && year < currentDate.getFullYear())) {
        console.log('success');
        // Proceed with further processing or validation

        const maxDay = new Date(year, month - 1, 0).getDate();
        if (day > maxDay) {
            // errorDay.textContent = 'Invalid day for the selected month';
            // errorDay.classList.remove('inactive');
            errorForm.classList.remove('inactive');
        } else {
            errorForm.classList.add('inactive');

            const birthDate = new Date(year, month - 1, day);
            // const currentDate = new Date();


            // ...

            let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
            let ageMonths = currentDate.getMonth() - birthDate.getMonth();
            let ageDays = currentDate.getDate() - birthDate.getDate();

            // Check if current day is smaller than birth day
            if (ageDays < 0) {
                // Calculate the number of days in the previous month
                const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
                const daysInLastMonth = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 0).getDate();
                ageDays += daysInLastMonth;
                ageMonths--;

                // Adjust the birth month
                birthDate.setMonth(birthDate.getMonth() + 1);
            }

            // Check if current month is smaller than birth month
            if (ageMonths < 0) {
                ageMonths += 12;
                ageYears--;
            }

            console.log(`Age: ${ageYears} years, ${ageMonths} months, ${ageDays} days`);
            calculatedYear.textContent = ageYears;
            calculatedMonth.textContent = ageMonths;
            calculatedDay.textContent = ageDays;
        }

    } else {
        console.log('Invalid input. Please enter two digits (e.g., 01, 25).');
        // Display an error message or take appropriate action


        errorForm.classList.remove('inactive');
    }

})