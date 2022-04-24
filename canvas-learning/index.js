
let cWid = 0;

window.addEventListener('DOMContentLoaded', () => {
  let cHei = 0;
  let imgs = [];
  let canvas = document.getElementById('canvas');

  const et = new EventTarget;
  const canvasBox = document.getElementById('canvas_box');

  const imgSelector = document.getElementById('img_selector');

  const saver = document.getElementById('save');

  et.addEventListener('imgsChange', () => {
    const _canvas = document.createElement('canvas');
    _canvas.setAttribute('width', cWid);
    _canvas.setAttribute('height', cHei);
    canvas.replaceWith(_canvas);
    canvas = _canvas;

    const ctx = _canvas.getContext('2d');
    let startY = 0;
    imgs.forEach(_img => {
      ctx.drawImage(_img, 0, startY);
      startY += _img.naturalHeight;
    });
    imgSelector.value = null;
    console.log(saver)
    canvas.toBlob(blob => {
      saver.href = URL.createObjectURL(blob);
    });
  });

  imgSelector.addEventListener('change', e => {
    const img = new Image;

    img.addEventListener('load', () => {
      cWid = img.naturalWidth > cWid ? img.naturalWidth : cWid;
      cHei += img.naturalHeight;
      imgs.push(img);
      et.dispatchEvent(new CustomEvent('imgsChange'));
    });

    img.src = URL.createObjectURL(e.target.files[0]);
  });
});