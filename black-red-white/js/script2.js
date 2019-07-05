document.querySelector('.burger-nav').addEventListener('click', function(e){
    var target = document.querySelector('.nav');

    target.classList.toggle('active');
});

document.querySelector('.info__container').addEventListener('click', function(e){
    var target = document.querySelector('.info__tooltip');

    target.classList.toggle('d-block');
});


var link = document.querySelector('.logo').addEventListener('click', function(e){
    e.preventDefault();
    console.log(e.target);
    var el = document.createElement('div');
    el.classList.add('overlay-final', 'overlay-final_red', 'overlay-final_sweep-to-top');
    var target = document.body.appendChild(el);
    target.addEventListener('animationend', function(e){
        window.location.href = 'index.html';
    });
});