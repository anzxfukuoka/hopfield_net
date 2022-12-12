const PAINT_WIDTH = 1;
const ERISER_WIDTH = PAINT_WIDTH * 1.62;
const CANV_SIZE = 5;

    var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var resX = 0;
    var resY = 0;

    var brColor = "black",
        brWidth = PAINT_WIDTH;

    function init() {
        canvas = document.getElementById('can');
        ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled= false

        canvas.width = CANV_SIZE;
        canvas.height = CANV_SIZE;

        erase();

        w = parseInt(getComputedStyle(canvas).width);
        h = parseInt(getComputedStyle(canvas).height);

        resX = canvas.width / w;
        resY = canvas.height / h;

        console.log(canvas.style);
        console.log(w);

        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);
    }

    function color(obj) {
        switch (obj.id) {
            case "green":
                brColor = "green";
                break;
            case "blue":
                brColor = "blue";
                break;
            case "red":
                brColor = "red";
                break;
            case "yellow":
                brColor = "yellow";
                break;
            case "orange":
                brColor = "orange";
                break;
            case "black":
                brColor = "black";
                break;
            case "white":
                brColor = "white";
                break;
        }
        if (brColor == "white") brWidth = ERISER_WIDTH;
        else brWidth = PAINT_WIDTH;

    }

    function draw() {
        ctx.beginPath();
        ctx.fillStyle = brColor;
        ctx.fillRect(currX, currY, 1, 1);
        ctx.closePath();
    }

    function erase() {
        var m = true;//confirm("Want to clear");
        if (m) {
            //ctx.clearRect(0, 0, w, h);
             ctx.beginPath();
             ctx.fillStyle = "white";
             ctx.fillRect(0, 0, CANV_SIZE, CANV_SIZE);
             ctx.closePath();
            document.getElementById("canvasimg").style.display = "none";
        }
    }

    function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        document.getElementById("canvasimg").style.display = "inline";
    }

    function findxy(res, e) {
        //console.log(res);

        if (res == 'down') {
            prevX = currX;
            prevY = currY;

            currX = Math.floor((e.clientX - canvas.offsetLeft) * resX);
            currY = Math.floor((e.clientY - canvas.offsetTop) * resY);

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                draw();
                dot_flag = false;
            }
        }
        if (res == 'up') { //|| res == "out"
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = Math.floor((e.clientX - canvas.offsetLeft) * resX);
                currY = Math.floor((e.clientY - canvas.offsetTop) * resY);
                draw();
            }
        }
    }