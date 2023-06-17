const form = document.querySelector('#form');

const inputs = document.querySelectorAll('.date-container__input');
const labels = document.querySelectorAll('.date-container__label');

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
    errorYear.textContent = 'Must be in the past';
    errorYear.classList.remove('inactive');
  } else {
    errorYear.classList.add('inactive');
  }

  // Making the inputs match the regex
  if (
    regexDay.test(day) &&
    regexMonth.test(month) &&
    regexYear.test(year) &&
    year < currentDate.getFullYear()
  ) {
    const maxDay = new Date(year, month, 0).getDate();
    if (day > maxDay) {
      errorForm.classList.remove('inactive');
    } else {
      errorForm.classList.add('inactive');

      const birthDate = new Date(year, month - 1, day);
      const ageDiff = currentDate.getTime() - birthDate.getTime();
      const ageDate = new Date(ageDiff);

      const ageYears = ageDate.getUTCFullYear() - 1970;
      const ageMonths = ageDate.getUTCMonth();
      const ageDays = ageDate.getUTCDate();

      console.log(`Age: ${ageYears} years, ${ageMonths} months, ${ageDays} days`);
      calculatedYear.textContent = ageYears;
      calculatedMonth.textContent = ageMonths;
      calculatedDay.textContent = ageDays;
    }
  } else {
    console.log('Invalid input. Please enter valid values.');
    errorForm.classList.remove('inactive');
    

    labels.forEach((label)=> {
        label.style.color = 'var(--lightRed)';
    })

    inputs.forEach((input)=> {
        input.classList.add('errorOutline');
    })


  }

});