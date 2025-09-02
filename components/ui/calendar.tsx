"use client"
import { IconChevronLgLeft, IconChevronLgRight } from "justd-icons"
import {
  Calendar as CalendarPrimitive,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarHeaderCell,
  type CalendarProps as CalendarPrimitiveProps,
  composeRenderProps,
  type DateValue,
  Heading,
  Text,
  useLocale
} from "react-aria-components"
import { tv } from "tailwind-variants"
import { Button } from "./button"
import { ctr, focusRing } from "./primitive"
import { useState } from "react"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"

const cellStyles = tv({
  extend: focusRing,
  base: "flex size-10 sm:size-9 cursor-default tabular-nums items-center justify-center rounded-full lg:text-sm forced-colors:outline-0",
  variants: {
    isSelected: {
      false:
        "text-fg forced-colors:text-[ButtonText] hover:bg-secondary-fg/15 pressed:bg-secondary-fg/20",
      true: "bg-primary text-primary-fg invalid:bg-danger invalid:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[Highlight] forced-colors:invalid:bg-[Mark]"
    },
    isDisabled: {
      true: "text-muted-fg/70 forced-colors:text-[GrayText]"
    }
  }
})

interface CalendarProps<T extends DateValue>
  extends Omit<CalendarPrimitiveProps<T>, "visibleDuration"> {
  errorMessage?: string
  className?: string
}

const Calendar = <T extends DateValue>({ errorMessage, className, ...props }: CalendarProps<T>) => {
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false)
  const [focusedDate, setFocusedDate] = useState<DateValue>(() => 
    props.focusedValue || props.value || today(getLocalTimeZone())
  )
  
  const handleYearMonthChange = (year: number, month: number) => {
    const newDate = new CalendarDate(year, month, 1)
    setFocusedDate(newDate)
    setShowYearMonthPicker(false)
  }
  
  return (
    <CalendarPrimitive 
      className={ctr(className, "max-w-[17.5rem] sm:max-w-[15.8rem]")} 
      focusedValue={focusedDate}
      onFocusChange={setFocusedDate}
      {...props}
    >
      <CalendarHeader 
        showYearMonthPicker={showYearMonthPicker}
        setShowYearMonthPicker={setShowYearMonthPicker}
      />
      {!showYearMonthPicker ? (
        <CalendarGrid className="[&_td]:border-collapse [&_td]:px-0">
          <CalendarGridHeader />
          <CalendarGridBody>
            {(date) => (
              <CalendarCell
                date={date}
                className={composeRenderProps(className, (className, renderProps) =>
                  cellStyles({
                    ...renderProps,
                    className
                  })
                )}
              />
            )}
          </CalendarGridBody>
        </CalendarGrid>
      ) : (
        <YearMonthPicker 
          currentDate={focusedDate}
          onYearMonthSelect={handleYearMonthChange}
          onClose={() => setShowYearMonthPicker(false)} 
        />
      )}
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {errorMessage}
        </Text>
      )}
    </CalendarPrimitive>
  )
}

const calendarHeaderStyles = tv({
  slots: {
    header: "flex w-full justify-center gap-1 px-1 pb-5 sm:pb-4",
    heading: "mr-2 text-muted-fg tracking-tight flex-1 text-left font-medium cursor-pointer hover:text-fg",
    calendarGridHeaderCell: "text-sm lg:text-xs font-semibold text-muted-fg"
  }
})

const { header, heading, calendarGridHeaderCell } = calendarHeaderStyles()

interface CalendarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  showYearMonthPicker: boolean
  setShowYearMonthPicker: (show: boolean) => void
}

const CalendarHeader = ({ 
  className, 
  showYearMonthPicker, 
  setShowYearMonthPicker,
  ...props 
}: CalendarHeaderProps) => {
  const { direction } = useLocale()
  
  return (
    <header className={header({ className })} {...props}>
      <Heading 
        className={heading()} 
        onClick={() => setShowYearMonthPicker(!showYearMonthPicker)}
      />
      {!showYearMonthPicker && (
        <div className="flex items-center gap-1">
          <Button
            size="square-petite"
            className="[&_[data-slot=icon]]:text-fg size-8 sm:size-7"
            shape="circle"
            appearance="plain"
            slot="previous"
          >
            {direction === "rtl" ? <IconChevronLgRight /> : <IconChevronLgLeft aria-hidden />}
          </Button>
          <Button
            size="square-petite"
            className="[&_[data-slot=icon]]:text-fg size-8 sm:size-7"
            shape="circle"
            appearance="plain"
            slot="next"
          >
            {direction === "rtl" ? <IconChevronLgLeft /> : <IconChevronLgRight />}
          </Button>
        </div>
      )}
    </header>
  )
}

const CalendarGridHeader = () => {
  return (
    <CalendarGridHeaderPrimitive>
      {(day) => <CalendarHeaderCell className={calendarGridHeaderCell()}>{day}</CalendarHeaderCell>}
    </CalendarGridHeaderPrimitive>
  )
}

interface YearMonthPickerProps {
  currentDate: DateValue
  onYearMonthSelect: (year: number, month: number) => void
  onClose: () => void
}

const YearMonthPicker = ({ currentDate, onYearMonthSelect, onClose }: YearMonthPickerProps) => {
  const [selectedYear, setSelectedYear] = useState(currentDate.year)
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month)
  

  const currentYear = currentDate.year
  const years = Array.from({ length: 51 }, (_, i) => currentYear - 50 + i)
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const handleYearMonthSelect = () => {
    onYearMonthSelect(selectedYear, selectedMonth)
  }
  
  return (
    <div className="p-4 space-y-4 min-h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm">Select Year & Month</h3>
        <button
          onClick={onClose}
          className="size-6 flex items-center justify-center hover:bg-secondary-fg/15 rounded"
        >
          ×
        </button>
      </div>
      
      {/* Year  */}
      <div className="flex-shrink-0">
        <label className="text-xs font-medium text-muted-fg block mb-2">Year</label>
        <div className="grid grid-cols-4 gap-1 max-h-28 overflow-y-auto border rounded p-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`text-xs h-8 px-2 rounded ${
                selectedYear === year
                  ? "bg-primary text-primary-fg"
                  : "hover:bg-secondary-fg/15 text-fg"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      
      {/* Month  */}
      <div className="flex-shrink-0">
        <label className="text-xs font-medium text-muted-fg block mb-2">Month</label>
        <div className="grid grid-cols-4 gap-1">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(index + 1)}
              className={`text-xs h-8 px-2 rounded ${
                selectedMonth === index + 1
                  ? "bg-primary text-primary-fg"
                  : "hover:bg-secondary-fg/15 text-fg"
              }`}
            >
              {month.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>
      
     
      <div className="flex gap-2 pt-1 mt-auto">
        <button
          onClick={handleYearMonthSelect}
          className="flex-1 bg-primary text-primary-fg hover:bg-primary/90 text-sm h-8 px-3 rounded"
        >
          Apply
        </button>
        <button
          onClick={onClose}
          className="flex-1 border border-border hover:bg-secondary-fg/15 text-sm h-8 px-3 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

Calendar.Header = CalendarHeader
Calendar.GridHeader = CalendarGridHeader

export { Calendar };

