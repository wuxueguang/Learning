const formData = new FormData();

formData.append('username', 'abc123');
formData.append('username', 'abc1234');

function handler(e) {
    const fileField = document.querySelector("input[type='file']");

    formData.append('avatar', fileField.files[0]);

    fetch('https://example.com/profile/avatar', {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response))
        .finally(() => btn.addEventListener('click', handler));
    btn.removeEventListener('click', handler);
}

const btn = document.getElementById('submit');

btn.addEventListener('click', handler);