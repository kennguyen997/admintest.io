import { Progress } from 'antd';
import * as React from 'react';

export default function LinearWithValueLabel({ number, color }: { number: number; color: string }) {
  const [progress, setProgress] = React.useState(1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= number ? number : prevProgress + 1));
    }, 1);
    return () => {
      clearInterval(timer);
    };
  }, [number]);

  return <Progress percent={progress} strokeColor={color} trailColor="#888F95" showInfo={false} />;
}
