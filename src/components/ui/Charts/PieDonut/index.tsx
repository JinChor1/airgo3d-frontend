import { Pie } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

interface PieDonutProps {
  data: Data[];
}

interface Data {
    value: number;
    type: 'bookmark' | 'active' | 'inactive';
}

const PieDonut = ({ data }: PieDonutProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Ensure the component only renders after mounted
  // Fix incorrect chart width
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const config = {
    data,
    height: 300,
    autoFit: 'center',
    autoResize: true,
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.7,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'bottom',
        rowPadding: 5,
        layout:{
            justifyContent: 'center',
        }
      },
    },
    style: {
      padding: 10,
      fill: ({ type }: { type: 'bookmark' | 'active' | 'inactive' }) => {
        if (type === 'bookmark') {
          return 'linear-gradient(0deg, #24C6DC 0%, #514A9D 100%)';
        } else if (type === 'active') {
            return 'linear-gradient(0deg, #11998e 0%, #38ef7d 100%)';
        } else {
            return 'linear-gradient(0deg, #FF512F 0%, #DD2476 100%)';
        }
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: 'Panoramas',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 18,
          fontStyle: 'bold',
        },
      },
    ],
  };
  return <Pie {...config}/>;
};

export default PieDonut;
