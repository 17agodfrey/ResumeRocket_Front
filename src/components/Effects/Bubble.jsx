import React, { useState, useRef, useEffect } from 'react';
import "../../styles/Bubble.css";
import { Card, CardContent, Dialog} from '@mui/material/';

const Bubble = ({ index, content, targetRect }) => {
  const bubbleRef = useRef(null);
  const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0 });
  const [curvePath, setCurvePath] = useState('');

  useEffect(() => {
    if (targetRect.current && bubbleRef.current) {
      const sourceRect = targetRect.current.getBoundingClientRect();
      const bubbleRect = bubbleRef.current.getBoundingClientRect();

      // Set a fixed distance from the right of the source div
      const bubbleLeftPosition = sourceRect.right + 20; // 20px to the right from the source div's right edge

      // Calculate top position based on index to prevent overlapping
      const bubbleHeight = bubbleRect.height;
      const verticalGap = 50; // Gap between bubbles
      const bubbleTopPosition = index * (bubbleHeight + verticalGap);

      setBubblePosition({ top: bubbleTopPosition, left: bubbleLeftPosition });

      
      // Calculate the curve path
      const startX = sourceRect.right;
      const startY = bubbleTopPosition + bubbleHeight / 2; // Middle of the bubble vertically
      const controlX = startX + 250; // Bezier control point, 100px to the right of the source div's right side
      const controlY = startY;
      const endX = startX;
      const endY = startY;

      // Cubic bezier curve command: Move to start, curve to (controlX, controlY) and end at (endX, endY)
      setCurvePath(`M ${startX},${startY} C ${controlX},${controlY} ${endX},${endY} ${startX},${startY}`);
    }
  }, [targetRect]);

  return (
    <>
      <svg style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', pointerEvents: 'none' }}>
        <path d={curvePath} stroke="black" strokeWidth="2" fill="none" />
      </svg>
      <div ref={bubbleRef} className="bubble" style={{ position: 'absolute', top: bubblePosition.top, left: bubblePosition.left }}>

        <Card sx={{}}>
                        <CardContent>
                            {content}
                        </CardContent> 
                    </Card> 
      </div>
    </>
  );
};

export default Bubble;