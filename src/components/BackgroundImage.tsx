import React from 'react';

interface BackgroundImageProps {
    fixed?: boolean;
    opacity?: number;
    maxWidth?: number;
    width?: string;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
    fixed = false,
    opacity = 0.8,
    maxWidth = 500,
    width = '40%',
}) => (
    <img
        src="/xbtheme/assets/img/bg.webp"
        alt=""
        style={{
            position: fixed ? 'fixed' : 'absolute',
            left: 0,
            bottom: 0,
            width,
            maxWidth,
            opacity,
            pointerEvents: 'none',
            zIndex: 0,
        }}
    />
);

export default BackgroundImage;
