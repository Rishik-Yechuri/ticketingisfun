import React, { useState, useRef } from 'react';

const PanZoom = ({ children }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const dragging = useRef(false);
    const lastPoint = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        lastPoint.current = { x: e.clientX, y: e.clientY };
        dragging.current = true;
    };

    const handleMouseMove = (e) => {
        if (dragging.current) {
            const offsetX = e.clientX - lastPoint.current.x;
            const offsetY = e.clientY - lastPoint.current.y;
            setPosition((prevPosition) => ({
                x: prevPosition.x + offsetX,
                y: prevPosition.y + offsetY,
            }));
            lastPoint.current = { x: e.clientX, y: e.clientY };
        }
    };

    const handleMouseUp = () => {
        dragging.current = false;
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const newScale = scale + (e.deltaY < 0 ? 0.1 : -0.1);
        setScale(Math.max(0.1, Math.min(newScale, 5)));
    };

    const draggableStyle = {
        cursor: 'grab',
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={draggableStyle}
        >
            {children}
        </div>
    );
};

export default PanZoom;