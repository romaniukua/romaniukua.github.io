document.querySelector('.burger-nav').addEventListener('click', function(e){
    var target = document.querySelector('.nav');

    target.classList.toggle('active');
});


var link = document.querySelector('.footer-nav__link').addEventListener('click', function(e){
    e.preventDefault();
    console.log(e.target);
    var el = document.createElement('div');
    el.classList.add('overlay-final', 'overlay-final_red', 'overlay-final_sweep-to-top');
    var target = document.body.appendChild(el);
    target.addEventListener('animationend', function(e){
        window.location.href = 'index2.html';
    });
});
