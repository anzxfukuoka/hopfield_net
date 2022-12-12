import os.path

import numpy
import numpy as np
from PIL import Image
import glob



def image_to_data(img: Image):
    """
    Converts PIL Image to np.Array
    :return: converted image array
    """
    data = np.array(img.convert("L"))
    sign = np.vectorize(lambda x: 1 if x < 128 else -1)
    data = sign(data)
    data = data.flatten()
    return data


def load_images_data(folder_path: str):
    f"""
    Loads images data from folder
    :param folder_path: path to data folder
    :return: dict -> filename: data 
    """
    images_data = {}

    for filename in glob.glob(os.path.join(folder_path, "*.png")):
        im = Image.open(filename)
        data = image_to_data(im)
        images_data.update({filename: data})

    return images_data


class HopfieldNetwork:
    """
    Implementation of Hopfield network
    """
    def __init__(self, images_to_learn: dict, image_size: int = 5):
        self.images_to_learn = images_to_learn

        self.images_data = np.array(list(images_to_learn.values()))

        self.image_size = image_size
        self.images_count = len(images_to_learn)

        # weights of learned images
        self.W = np.zeros((self.image_size * self.image_size, self.image_size * self.image_size))

        self.last_result = ""

    def learn(self):

        for i in range(0, self.images_count):
            a = np.array([self.images_data[i]])
            b = np.array([self.images_data[i]])
            mul = np.multiply(b.T, a)
            self.W += mul

        np.fill_diagonal(self.W, 0)
        self.W /= self.image_size

    # todo: fix п recognition
    def recognize(self, image_data):
        recognized = np.matmul(self.W, np.array(image_data))
        #sign = np.vectorize(lambda x: 1 if x < (recognized.max() - recognized.min())/2 else -1)
        sign = np.vectorize(lambda x: 1 if x > 0 else -1)
        recognized = sign(recognized)

        for filename, data in self.images_to_learn.items():
            if numpy.equal(data, recognized).all():
                self.last_result = filename
                return

        self.last_result = ":/"

        recognized = recognized.reshape((5, 5))
