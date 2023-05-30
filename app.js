// Get the elements

const form = document.querySelector('#form')


form.addEventListener('submit', (e) => {
    e.preventDefault();


    const day = document.querySelector('#day').value;
    const month = document.querySelector('#month').value;
    const year = document.querySelector('#year').value;

    const regex = /^[0-9]{2}$/;
    const regexYear = /^[0-9]{4}$/;

    if (regex.test(day)) {
        console.log('success')
        // Proceed with further processing or validation
      } else {
        console.log('Invalid input. Please enter two digits (e.g., 01, 25).');
        // Display an error message or take appropriate action
    }


})