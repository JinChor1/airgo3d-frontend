import { Column } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

interface StackedBarProps {
  data: Data[];
}

interface Data {
    monthYear: string;
    value: number;
    type: 'bookmark' | 'active' | 'inactive';
}

const StackedBar = ({ data }: StackedBarProps) => {
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
    xField: 'monthYear',
    yField: 'value',
    colorField: 'type',
    stack: true,
    style: {
      padding: 10,
      radius: 10,
      fill: ({ type }: { type: 'bookmark' | 'active' | 'inactive' }) => {
        if (type === 'bookmark') {
          return 'linear-gradient(45deg, #24C6DC 0%, #514A9D 100%)';
        } else if (type === 'active') {
            return 'linear-gradient(45deg, #38ef7d 0%, #11998e 100%)';
        } else {
            return 'linear-gradient(45deg, #FF512F 0%, #DD2476 100%)';
        }
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
    interaction: {
      tooltip: {
        render: (e: string, { title, items } : { title: string; items: { name: string; value: number; color: string }[] }) => {
          return (
            <div key={title}>
              <h4>{title}</h4>
              {items.map((item) => {
                const { name, value, color } = item;
                return (
                  <div key={name}>
                    <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <span
                          style={{
                            display: 'inline-block',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: color,
                            marginRight: 6,
                          }}
                        ></span>
                        <span>{name}</span>
                      </div>
                      <b>{value}</b>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        },
      },
    },
  };
  return <Column {...config}/>;
};

export default StackedBar;
