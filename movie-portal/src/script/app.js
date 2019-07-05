'use strict';

let movies = [];

if(localStorage.getItem('movies')){
    movies = JSON.parse(localStorage.getItem('movies'));
}

class Movie{
    constructor(id, filmName, originalName, year, country, slogan, director, cast, imdbRating, summary, imgSrc){
        this.id = id;
        this.filmName = filmName;
        this.originalName = originalName;
        this.year = year;
        this.country = country;
        this.slogan = slogan;
        this.director = director;
        this.cast = cast;
        this.imdbRating = imdbRating;
        this.summary = summary;
        this.staff = [];
        this.imgSrc = imgSrc;
        this.like = 0;
        this.dislike = 0;
    }
}

class MovieShortInfo{
    constructor(id, filmName, summary, imdbRating, imgSrc){
        this.id = id;
        this.filmName = filmName;
        this.imdbRating = imdbRating;
        this.summary = summary;
        this.imgSrc = imgSrc;
    }
}


const $newFilmBtn = document.querySelector('#add-new');

$newFilmBtn.addEventListener('click', () => {

    let promise = createModal();
    promise.then(res => {
        document.body.appendChild(res);
        $('#addNewFilm').modal().on('hidden.bs.modal', ({target: {parentElement}}) =>{
            parentElement.remove();
        });
    });
    
});

document.querySelector('#search').addEventListener('submit', e => {
    e.preventDefault();
    location.hash = '';
    location.hash = '#search';
});


document.querySelector('#content').addEventListener('click', ({target: {classList}, target}) =>{
    if(classList.contains('edit') || target.closest('.edit')){
        handleEditEvent(target);
    }

    if(classList.contains('remove') || target.closest('.remove')){
        handleRemoveEvent(target);
    }

    if(classList.contains('like') || target.closest('.like')){
        likesCounter('like');
    }

    if(classList.contains('dislike') || target.closest('.dislike')){
        likesCounter('dislike');
    }
});



async function createModal(id){
    const $wrapper = document.createElement('div');
    $wrapper.className = 'wrapper';


    await fetch('src/html/add-new.html')
        .then(res =>  res.text())
        .then(text => {
            $wrapper.innerHTML += `<div class="modal fade" id="addNewFilm" tabindex="-1" role="dialog" aria-hidden="true">${text}</div>`;
        });
    
    const $modal = $wrapper.firstChild;

    handleModal($modal, id);
    
    return $wrapper;
}


function handleModal($modal, id){
    let imgSrc = '';
    let count = 2;


    $modal.addEventListener('click', ({target: {classList}, target}) => {
        const $infoFields = document.querySelectorAll('.additionalInfo');

        if(classList.contains('add') || target.closest('.add')){
            const $newInfoField = $infoFields[0].cloneNode(true);
            $infoFields[0].parentElement.appendChild($newInfoField);
            const $staff = $newInfoField.querySelector('.staff');
            const $staffName = $newInfoField.querySelector('.staff_name');
            $staff.setAttribute('name', `staff${count}`);
            $staffName.setAttribute('name', `staffName${count}`);
            count++;
            $staff.value = '';
            $staffName.value = '';
        }

        if((classList.contains('remove') || target.closest('.remove')) && $infoFields.length > 1){
            target.closest('.additionalInfo').remove();
        }
    });

    $modal.querySelector('#upload-poster').addEventListener('change', ({target : {files}}) => {
        let reader = new FileReader();
        reader.onload = function(){
            imgSrc = reader.result;
        };
        reader.readAsDataURL(files[0]);
    });


    $modal.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        
        let elements = e.target.elements;
        let castValue = elements.cast.value;
        let regex = /^([a-я- ]+,)+[а-я- ]+$/i;
        
        if(regex.test(castValue)){
            saveMovie(elements, imgSrc, id);
            $('#addNewFilm').modal('hide');
            location.hash = '';
            location.hash = '#list';
        } else{
            alert('Invalid value entry! Please specify more than one value and use a comma to separate the values!');
        }
        
    });
}

function saveMovie(elements, imgSrc, id){
    let {
        filmName : {value: filmName}, 
        originalName : {value: originalName},
        year : {value: year}, 
        country : {value: country}, 
        slogan : {value: slogan}, 
        director : {value: director}, 
        cast : {value: cast}, 
        imdbRating : {value: imdbRating}, 
        summary : {value: summary},
    } = elements;

    let actorsArr = cast.replace(/,\s+/, ',').trim().split(',');

    let movie = new Movie(id || Date.now() ,filmName, originalName, year, country, slogan, director, actorsArr, imdbRating, summary, imgSrc);
    let movieShortInfo = new MovieShortInfo(movie.id, filmName, summary, imdbRating, imgSrc);
    let addInfo = document.querySelectorAll('.additionalInfo');
    Array.prototype.forEach.call(addInfo, item => {
        const $staff = item.querySelector('.staff');
        const $staff_name = item.querySelector('.staff_name');
        movie.staff.push ({
            staff: $staff.value,
            staffName: $staff_name.value
        }); 
    });

    localStorage.setItem(movie.id, JSON.stringify(movie));
    
    if(id){
        let index = movies.findIndex(item => item.id === id);
        movies.splice(index, 1, movieShortInfo);
        localStorage.setItem('movies', JSON.stringify(movies));
    }
    else{
        movies.push(movieShortInfo);
        localStorage.setItem('movies', JSON.stringify(movies));
    }

}




function likesCounter(className){
    const id = +location.hash.slice(6);
    const movie = JSON.parse(localStorage.getItem(id));
    document.querySelector(`button.${className}`).setAttribute('data-count', ++movie[className]);
    localStorage.setItem(id, JSON.stringify(movie));
}

function handleRemoveEvent(target){
    let isRemove = confirm('Would you like to remove this movie?');
    if(isRemove){
        const $cardNode = target.closest('.card');
        const id = +$cardNode.querySelector('.details > a').getAttribute('href').slice(6);
        localStorage.removeItem(id);
        let index = movies.findIndex(item => item.id === id);
        movies.splice(index, 1);
        localStorage.setItem('movies', JSON.stringify(movies));
        location.hash = '';
        location.hash = '#list';
    }
}

function handleEditEvent(target){
    const id = +target.closest('.card').querySelector('.details > a').getAttribute('href').slice(6);
    window.location.hash = `${id}-edit`;
    let promise = createModal(id);
    promise.then(res => {
        
        const $modal = document.body.appendChild(res);
        const $form = $modal.querySelector('form');
        const movie = JSON.parse(localStorage.getItem(id));
        for(let prop in movie){
            if(prop === 'id' || prop === 'imgSrc' || prop === 'like' || prop === 'dislike'){
                continue;
            }

            else if(prop === 'staff'){
                let addInfo = $form.querySelectorAll('.additionalInfo');
                let container = $form.querySelector('.addSet');
                movie[prop].forEach( (item, index) =>{
                    if(index >= addInfo.length){
                        let $newItem = addInfo[0].cloneNode(true);
                        container.appendChild($newItem);
                        $newItem.querySelector('.staff').value = item['staff'];
                        $newItem.querySelector('.staff_name').value = item['staffName'];
                    }else {
                        $form.querySelector('.additionalInfo .staff').value = item['staff'];
                        $form.querySelector('.additionalInfo .staff_name').value = item['staffName'];
                    }
                });
            }
            else{
                $form.querySelector(`#${prop}`).value = movie[prop];
            }
        }
        
        $('#addNewFilm').modal().on('hidden.bs.modal', ({target: {parentElement}}) =>{
            parentElement.remove();
            window.location.hash = '#list';
        });
    });
}









