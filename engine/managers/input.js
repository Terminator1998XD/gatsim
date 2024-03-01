var isKeyDown = true;

document.addEventListener('keydown', function (e) {
    //isKeyDown[event.code] = true;
    isKeyDown = true;
});

document.addEventListener('keyup', function (e) {
    //isKeyDown[event.code] = false;
    isKeyDown = false;
});

window.addEventListener('blur', function () {
    //isKeyDown = {};
    isKeyDown = false;
});
