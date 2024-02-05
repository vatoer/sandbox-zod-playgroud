"use client";

import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, getYear } from "date-fns";
import { enGB, id } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";

//export type CalendarProps = React.ComponentProps<typeof DayPicker>;

interface IDatePickerProps {
  date?: Date;
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  error: FieldError | undefined;
  className?: string;
}

export type InputDatePickerProps = IDatePickerProps & CalendarProps;

export const InputDatePicker = ({
  date: Initdate,
  label,
  register,
  setValue,
  name,
  error,
  type = "text",
  className,
  ...props
}: InputDatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(Initdate);
  const [month, setMonth] = useState<Date | undefined>(date);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSelect: SelectSingleEventHandler = (newDate) => {
    setDate(newDate ?? date);
    setIsPopoverOpen(false);
    if (newDate) {
      const newDateStr = format(newDate, "PPP", {
        locale: props.locale ?? id,
      });
      setValue(name, newDateStr);
    }
  };

  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  defaultEndDate.setMonth(defaultEndDate.getMonth() + 1);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex flex-col w-full mt-1 md:mt-0",
            className && className
          )}
        >
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <div className="relative group">
            <CalendarIcon className="absolute top-2 ml-2 text-gray-700" />
            <input
              placeholder="dd-mm-yyyy"
              readOnly
              // value={
              //   date
              //     ? format(date, "yyyy-MM-dd", { locale: props.locale ?? id })
              //     : ""
              // }
              type={"text"}
              id={name}
              {...register(name)}
              className={cn(
                "form-control block w-full px-1 pl-10 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none peer"
              )}
            />
          </div>
          {error && <span className="text-red-500">{error.message}</span>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={props.locale ?? id}
          selected={date}
          onSelect={handleSelect}
          fromDate={props.fromDate ?? defaultStartDate}
          toDate={props.toDate ?? defaultEndDate}
          month={month ?? date}
          onMonthChange={setMonth}
        />
      </PopoverContent>
    </Popover>
  );
};

export default InputDatePicker;
