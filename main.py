# AI lab 2

from flask import Flask, request, render_template
from PIL import Image
from io import BytesIO
import base64
import json
import re

app = Flask("Hopfield Network")


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/hook', methods=['POST'])
def save_canvas():
    image_data = re.sub('^data:image/.+;base64,', '', request.form['imageBase64'])
    im = Image.open(BytesIO(base64.b64decode(image_data)))
    im.save('canvas.png')
    return json.dumps({'result': 'success'}), 200, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run()
