//文件上传

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

const img2Base64 = file => {
    const fileReader = new FileReader;
    fileReader.readAsDataURL(file);
    return new Promise(resolve => {
        reader.addEventListener('load', () => {
            resolve(reader.result);
        });
    });
};

submitBtn.addEventListener('click', () => upload(fileField.files[0]));


const preview = async file => {
    const img = document.createElement('img');

    img.src = await img2Base64(file);
    document.body.appendChild(img);
};

const target = document.getElementById('textBox');

target.addEventListener('paste', e => {
    const clipboardData = e.clipboardData || window.clipboardData;

    clipboardData.types.forEach(async (type, idx) => {
        if (type === 'Files') {
            const file = await clipboardData.items[idx].getAsFile();

            preview(file);
            upload(file);
        }
    });
});