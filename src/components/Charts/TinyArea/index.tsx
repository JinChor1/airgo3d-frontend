import { Tiny } from '@ant-design/plots';
import React from 'react';

interface TinyAreaProps {
  data: number[];
}

const TinyArea = ({ data }: TinyAreaProps) => {
  const config = {
    data: data.map((value, index) => ({ value, index })),
    width: 480,
    height: 80,
    padding: 8,
    shapeField: 'smooth',
    xField: 'index',
    yField: 'value',
    style: {
      fill: '#d6e3fd',
      fillOpacity: 0.6,
    },
  };
  return <Tiny.Area {...config} />;
};

export default TinyArea;
