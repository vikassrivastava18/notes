## Drawback of using NN with flattened image inputs
```
The spatial relationships between the neighboring pixels are no longer explicitly represented.
Also too many parameters to train.
```

## Layers in CNN
```
CNNs learn features hierarchically. Early layers detect simple features such as edges and color gradients. Intermediate layers combine these into more complex structures like corners, textures, and object parts. Deeper layers combine these object parts into complete semantic concepts such as faces, cars, or animals. As we move deeper into the network, the receptive field increases, allowing neurons to capture information from a larger region of the original image.
```

## What exactly is this filter learning?
```
1  0 -1
1  0 -1
1  0 -1

It can identify vertical edges.
Weight sharing - CNN learn one edge dtector and slide it accross the image.If edge appears anywhere, the same filter detects it.
```





