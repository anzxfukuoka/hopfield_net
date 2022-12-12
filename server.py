# AI lab 2

from flask import Flask, request, render_template
from PIL import Image
from io import BytesIO
import base64
import json
import re

from hopfield import HopfieldNetwork, image_to_data, load_images_data

# creation of hopfield net
images_data_folder = "images_data/"
images_data = load_images_data(images_data_folder)
hopNet = HopfieldNetwork(images_data)
hopNet.learn()

# flask server for web interface
app = Flask("Hopfield Network")

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/hook', methods=['POST'])
def save_canvas():
    image_data = re.sub('^data:image/.+;base64,', '', request.form['imageBase64'])
    im = Image.open(BytesIO(base64.b64decode(image_data)))
    #im.save('canvas.png')
    data = image_to_data(im)
    hopNet.recognize(data)
    return json.dumps({'result': 'success'}), 200, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run()
