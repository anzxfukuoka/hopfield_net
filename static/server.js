
const send_url = "/hook";
const result_url = "/get_result";

function getResult()
{
    $.getJSON({
    url: result_url,
    success: function(data){
        alert(data.result);
        console.log(data)
    }
    });
}

function send()
{
    let canvas = document.getElementById('can');
    let dataURL = canvas.toDataURL();

    $.ajax({
        type: "POST",
        url: send_url,
        data:{
            imageBase64: dataURL
        }
    }).done(function() {
        console.log('sent');
    });

    getResult();
}