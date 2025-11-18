import { Tiny } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

interface TinyAreaProps {
  data: number[];
  color: 'purple' | 'green' | 'blue' | 'red';
}

const TinyArea = ({ data, color }: TinyAreaProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Ensure the component only renders after mounted
  // Fix incorrect chart width
  useEffect(() => {
    setIsMounted(true);
  }, []);
 
  if (!isMounted) {
    return null;
  }

  const fillGradient =
    color === 'purple'
      ? 'linear-gradient(-90deg,rgba(128, 0, 128, 0) 10%, purple 100%)'
      : color === 'green'
      ? 'linear-gradient(-90deg,rgba(0, 128, 0, 0) 10%, green 100%)'
      : color === 'blue'
      ? 'linear-gradient(-90deg,rgba(0, 0, 255, 0) 10%, blue 100%)'
      : 'linear-gradient(-90deg,rgba(255, 0, 0, 0) 10%, red 100%)';

  const config = {
    data: data.map((value, index) => ({ value, index })),
    height: 100,
    autoFit: 'center',
    autoResize: true,
    padding: 5,
    shapeField: 'smooth',
    xField: 'index',
    yField: 'value',
    colorField: color,
    style: {
      fill: fillGradient,
      fillOpacity: 0.6,
    },
    line: {
      style: {
        lineWidth: 2,
      },
    },
  };
  return <Tiny.Line {...config}/>;
};

export default TinyArea;
