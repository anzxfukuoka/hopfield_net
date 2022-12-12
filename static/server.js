
const server_url = "http://127.0.0.1:5000/hook";

console.log(server_url);

function send()
{
    let canvas = document.getElementById('can');
    let dataURL = canvas.toDataURL();

    $.ajax({
        type: "POST",
        url: server_url,
        data:{
            imageBase64: dataURL
        }
    }).done(function() {
        console.log('sent');
    });
}