import type {Modifier} from '@dnd-kit/core';
import type {ClientRect} from '@dnd-kit/core';

var gridSize = 40;
var minWidth = 50;

export const snapGridModifier: Modifier = ({
    containerNodeRect,
    draggingNodeRect,
    transform,
  }) => {
    var xval = transform.x;
    var yval = transform.y;
    var xtransform = transform.scaleX;

    //if you don't "collide" with the container then move along grid
    //this never happens anyway.
    if(!draggingNodeRect || !containerNodeRect)
      xval = Math.ceil(transform.x / gridSize) * gridSize
    else 
    {
      var rect = draggingNodeRect;
      var boundingRect = containerNodeRect;

      //snap dragging block within top/bottom bounds
      if (rect.top + transform.y <= boundingRect.top) {
        yval = boundingRect.top - rect.top;
      } else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
        yval = boundingRect.top + boundingRect.height - rect.bottom;
      }

      //snap dragging block within left bound
      if (rect.left + transform.x <= boundingRect.left) {
        xval = boundingRect.left - rect.left
      } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width)  {

        // if the new rect.width doesn't subsceed the minWidth
        // dont snap dragging block within right bound
        // allow transform width + can move right.
        if (rect.width - gridSize <= minWidth) { 
          xtransform = (rect.width - gridSize) / rect.width
          xval = Math.ceil(xval / gridSize) * gridSize
        } else { //else snap dragging block within right bound
          xval = boundingRect.left + boundingRect.width - rect.right              
        }
      }
    }

    return({
      ...transform,
      scaleX: xtransform,
      x: xval,
      y: yval,
    })
};
    