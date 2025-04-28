import React from 'react';

type Props = {
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};

function ListOfAppointement({ service, date, time, status }: Props) {
  const statusStyles = {
    pending: 'bg-yellow-50 text-yellow-700',
    confirmed: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
  };
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">{service}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {date} • {time}
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
export default ListOfAppointement;