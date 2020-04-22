const formData = new FormData();
const fileField = document.querySelector("input[type='file']");
const submitBtn = document.querySelector("button");
const upload = file => {
    formData.delete('file');
    formData.append('file', file);

    fetch('/upload', {
        method: 'put',
        body: formData
    })
    .then(response => response.json())
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));
};

submitBtn.addEventListener('click', () => upload(fileField.files[0]));


const preview = file => {
    const img = document.createElement('img');
    const reader = new FileReader;

    reader.addEventListener('load', () => {
        img.src = reader.result;
    });
    reader.readAsDataURL(file);
    document.body.appendChild(img);
};

const target = document.getElementById('textBox');

target.addEventListener('paste', e => {
    const clipboardData = e.clipboardData || window.clipboardData;

    clipboardData.types.forEach(async (type, idx) => {
        if(type === 'Files'){
            const file = await clipboardData.items[idx].getAsFile();

            preview(file);
            upload(file);
        }
    });
});