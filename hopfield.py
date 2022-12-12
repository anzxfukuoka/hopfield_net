import numpy as np
from PIL import Image


def image_to_data(img):
    data = np.array(img.convert("L"))
    sign = np.vectorize(lambda x: 1 if x < 128 else -1)
    data = sign(data)
    return data


class HopNet:
    def __init__(self):
        pass

    def learn(self):
        pass

    def recognise(self):
        pass
