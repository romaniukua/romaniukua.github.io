'use strict';

const canvas = document.querySelector('#drawingCanvas');
const context = canvas.getContext('2d');
const $form = document.querySelector('#form');

$form.addEventListener('change', ({currentTarget: {elements}, target: {value, type}}) => {

    if(validateFile(value) || type === 'radio'){
        let src = Array.from(elements).filter(e => e.type === 'file').map(e => e.files);
        +elements.rendering_mode.value ? loadImages(src, renderHorizontal) : loadImages(src, renderVertical);
    }else {
        console.log('Wrong file extencion');
    }

});

$form.addEventListener('click', ({target: {classList}}) => {

    if(classList.contains('addInput')){
        const $newInput = document.createElement('input');
        $newInput.classList.add('fileInput');
        $newInput.setAttribute('type', 'file');
        $form.querySelector('.fileInput-control').appendChild($newInput);
    }

    if(classList.contains('removeInput')){
        if($form.querySelectorAll('.fileInput').length > 1){
            document.querySelector('.fileInput-control input:last-child').remove();
        }
    }
    
});



function renderVertical(images){
    canvas.width = 300;

    canvas.height = 0;
    for(let img in images){
        canvas.height += images[img].naturalHeight / images[img].naturalWidth * canvas.width;
    }

    let cY = 0;
    for(let img in images){
        let height = (images[img].naturalHeight / images[img].naturalWidth * canvas.width);
        context.drawImage(images[img], 0, cY, canvas.width, height);
        cY += height;
    }
}

function renderHorizontal(images){
    canvas.height = 200;

    canvas.width = 0;
    for(let img in images){
        canvas.width += images[img].naturalWidth / images[img].naturalHeight * canvas.height;
    }

    let cX = 0;
    for(let img in images){
        let width = (images[img].naturalWidth / images[img].naturalHeight * canvas.height);
        context.drawImage(images[img], cX, 0, width, canvas.height);
        cX += width;
    }
}

function loadImages(sources, callback){
    let images = {};
    let loadedImages = 0;
    let numImages = 0;

    sources.forEach(item => {
        if(item[0]){
            numImages++;
        }
    });

    sources.forEach((item, index) => {
        let reader = new FileReader();
        if(item[0]){
            reader.onload = function(){

                images[`img${index}`] = new Image();
                images[`img${index}`].src = reader.result;
                images[`img${index}`].onload = function(){
                    
                    if(++loadedImages >= numImages){
                        callback(images);
                    }

                }
                
            }

            reader.readAsDataURL(item[0]);
        }
    });
}

function validateFile(value){
    let allowedFileExt = new Array('jpg', 'jpeg', 'png', 'gif');
    let fileExtencion = value.split('.').pop().toLowerCase();
    return allowedFileExt.some(ext => ext === fileExtencion);
}