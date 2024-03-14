import type {Modifier} from '@dnd-kit/core';
import type {ClientRect} from '@dnd-kit/core';

var gridSize = 40;

export const snapGridModifier: Modifier = ({
    containerNodeRect,
    draggingNodeRect,
    transform,
  }) => {
    var xval = transform.x;
    var yval = transform.y;
    var xtransform = transform.scaleX;
    if(!draggingNodeRect || !containerNodeRect)
      xval = Math.ceil(transform.x / gridSize) * gridSize
    else 
    {
      var rect = draggingNodeRect;
      var boundingRect = containerNodeRect;


      if (rect.top + transform.y <= boundingRect.top) {
        yval = boundingRect.top - rect.top;
      } else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
        yval = boundingRect.top + boundingRect.height - rect.bottom;
      }


      if (rect.left + transform.x <= boundingRect.left) {
        xval = boundingRect.left - rect.left
      } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width)  {
        xval = boundingRect.left + boundingRect.width - rect.right              
        xtransform = (rect.width - gridSize) / rect.width
        xval = Math.ceil(xval / gridSize) * gridSize
      }
    }

    return({
      ...transform,
      scaleX: xtransform,
      x: xval,
      y: yval,
    })
};
    