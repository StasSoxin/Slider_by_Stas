let sliderMain = document.getElementById("slider-main");
let item = sliderMain.getElementsByClassName("item");
let bar = document.getElementsByClassName("bar");
let i = 0;
let init = 0;


function next() {
    console.log('i = ',i);
    if (i + 1 === bar.length) {
        bar[i].className = 'bar';
        i = 0;
        bar[i].className = 'bar active';
        init = 0;
    } 
    else {

        bar[i].className = 'bar';
        bar[i + 1].className = 'bar active';
        console.log(bar[i].className);
        console.log(bar[i + 1].className);
        i = i + 1;
        init = 1;

    }
    sliderMain.append(item[0]);
}

function back() {
    console.log('i = ',i);
    
    if (i === 0 && init === 0) {
        bar[i].className = 'bar';
        bar[bar.length - 1 + i].className = 'bar active';
        i = bar.length - 1; 
        init = 1;
    }
    else{

        if (i + 1 === bar.length && init === 0) {
            bar[bar.length - 1].className = 'bar';
            bar[0].className = 'bar active';
            init = 0;
            i = i - 1;
        } 
        else {

            bar[i].className = 'bar';
            bar[i - 1].className = 'bar active';
            i = i - 1;
            init = 0;
        }
    }
    sliderMain.prepend(item[item.length - 1]);
}

setInterval( next, 4000 );

let slider = document.querySelector('.slider-wrap');
let innerSlider = document.querySelector('.slider-main');

let pressed = false;
let start_x;
let x;

slider.addEventListener('mousedown', (e) => {
    pressed = true;
    start_x = e.offsetX - innerSlider.offsetLeft;
    slider.style.cursor = 'grabbing';
});

slider.addEventListener('mouseenter', () => {
    slider.style.cursor = 'grab';
});

slider.addEventListener('mouseup', () => {
    slider.style.cursor = 'pointer';
});

window.addEventListener('mouseup', () => {
    pressed = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!pressed) return;
    e.preventDefault();

    x = e.offsetX;

    innerSlider.style.left = `${x - start_x}px`;

    check_boundary();
});

function check_boundary() {
    let outer = slider.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    if (parseInt(innerSlider.style.left) > 0) {
        innerSlider.style.left = '0px';
    } else if (inner.right < outer.right) {
        innerSlider.style.left = `-${inner.width - outer.width}px`
    }
}

slider.addEventListener('touchstart', (e) => {
    pressed = true;
    start_x = e.targetTouches[0].clientX - innerSlider.offsetLeft;
}, {passive: true});


slider.addEventListener('touchmove', (e) => {
    if (!pressed) return;
    x = e.targetTouches[0].clientX;

    innerSlider.style.left = `${x - start_x}px`;

    check_boundary();
}, {passive: true});
