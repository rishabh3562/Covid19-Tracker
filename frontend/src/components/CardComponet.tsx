import React from 'react';
import CountUp from 'react-countup';
import classNames from 'classnames';

interface CardProps {
  className?: string;
  cardTitle: string;
  value: number;
  lastUpdate: Date;
  cardSubtitle?: string;
  customColor?: string; // Add a prop for custom color
}
function formatNumberWithSuffix(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + 'K';
  }
  return num.toString();
}
const CardComponent: React.FC<CardProps> = (
  { className, cardTitle, value, lastUpdate, cardSubtitle, customColor }
  ) => {
 
  return(<>
  
  <div className={classNames('w-full  p-4', className)}>
    <div
      className={classNames(
        'min-h-fit border rounded-lg p-4 shadow-md border-b-violet-700 ',
        customColor ? `bg-${customColor}-300` : 'bg-gray-200',
      )}
    >
      <p className={customColor ? `text-${customColor}-800` : 'text-gray-800'}>
        {cardTitle}
      </p>
      <h2 className={customColor ? `text-${customColor}-600` : 'text-2xl font-bold text-blue-600'}>
        <CountUp start={0} end={(value)} duration={2.75} separator="," /> 
      </h2>
      <p className={customColor ? `text-${customColor}-600` : 'text-gray-600'}>
        {new Date(lastUpdate).toDateString()}
      </p>
   { cardSubtitle?(  
   <p className={customColor ? `text-${customColor}-600` : 'text-sm'}>
        {cardSubtitle}
      </p>):
      null
      }
    </div>
  </div>
  </>)
};

export default CardComponent;
