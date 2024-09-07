import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
}

function DateRangePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: DateRangePickerProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDivClick = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? undefined);
    setEndDate(end ?? undefined);

    if (start && end) {
      setIsDatePickerOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="cursor-pointer rounded-lg border-1 border-primary-50 px-3 py-2 text-primary-50"
        onClick={handleDivClick}
      >
        {startDate && endDate
          ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
          : "YYYY.MM.DD ~ YYYY.MM.DD"}
      </button>
      {isDatePickerOpen && (
        <div className="absolute top-10 mt-2">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
