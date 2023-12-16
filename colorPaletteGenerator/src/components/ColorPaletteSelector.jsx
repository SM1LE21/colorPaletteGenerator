import React, { useState } from 'react';

const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

const getContrastingTextColor = (h, s, l) => {
    // Calculate brightness based on HSL values
    s /= 100;
    l /= 100;
    const lightness = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const brightnessThreshold = 0.5;

    return lightness > brightnessThreshold ? '#000000' : '#FFFFFF';
};

    
const ColorPaletteSelector = () => {
    const [colors, setColors] = useState(Array(5).fill({ hsl: 'hsl(0, 0%, 100%)', hex: '#ffffff', textColor: '#000000' }));

    const generateColors = () => {
    const newColors = colors.map(() => {
        let hue = Math.floor(Math.random() * 360);
        let saturation = Math.floor(Math.random() * 100);
        let lightness = Math.floor(Math.random() * 100);
        let hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        let hexColor = hslToHex(hue, saturation, lightness);
        let textColor = getContrastingTextColor(hue, saturation, lightness);
        return { hsl: hslColor, hex: hexColor, textColor: textColor };
    });
    setColors(newColors);
    };

    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <div className="flex gap-2 p-10 bg-white rounded shadow-lg">
        {colors.map((color, index) => (
            <div key={index} className="w-20 h-20 rounded border border-gray-300 flex items-center justify-center" style={{ backgroundColor: color.hsl }}>
            <span className="text-sm font-bold" style={{ color: color.textColor }}>{color.hex}</span>
            </div>
        ))}
        </div>
        <button 
        className="mt-5 px-4 py-2 bg-white rounded shadow hover:bg-blue-100 text-gray-800 font-semibold"
        onClick={generateColors}
        >
        Generate Palette
        </button>
    </div>
    );
};
  
export default ColorPaletteSelector;