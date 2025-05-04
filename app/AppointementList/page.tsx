import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

type Props = {
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  description: string;
  username:String
};

function ListOfAppointement({ description, status, date, time }: Props) {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const [timeValue, setTimeValue] = useState<DateObject | null>(null);

  // Convert string time to DateObject once on load
  useEffect(() => {
    if (time) {
      const today = new Date();
      const [hourStr, minuteStr] = time.split(":");
      const hour = parseInt(hourStr);
      const minute = parseInt(minuteStr);
      const dateObj = new DateObject({
        hour,
        minute,
      });
      setTimeValue(dateObj);
    }
  }, [time]);

  const handleDateChange = (newDateTime: DateObject | null) => {
    setTimeValue(newDateTime);
    console.log(newDateTime?.format("hh:mm A"));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">
            {new Date(date).toDateString()} • {time}
          </p>
          <h2 className="text-lg font-semibold text-gray-800 mt-1">
            {description}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${statusStyles[status]}`}
          >
            {status}
          </span>
          <Select>
            <SelectTrigger className="w-[140px] border-gray-300">
              <SelectValue placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Date Picker */}
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">
            Appointment Date
          </label>
          <Calendar
            mode="single"
            selected={new Date(date)}
            className="rounded-md border w-full"
          />
        </div>

        {/* Time Picker */}
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">
            Appointment Time
          </label>
          <DatePicker
            disableDayPicker
            value={timeValue}
            onChange={handleDateChange}
            format="hh:mm A"
            plugins={[<TimePicker position="bottom" />]}
            className="w-full"
            inputClass="w-full border rounded-md px-3 py-2"
          />
        </div>
      </div>
      <Button className="my-3" type="submit">Change</Button>
    </div>
  );
}

export default ListOfAppointement;
