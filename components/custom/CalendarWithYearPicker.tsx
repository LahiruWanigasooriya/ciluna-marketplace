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
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date"

import { Button } from "../ui/button"
import { ctr, focusRing } from "../ui/primitive"
import React from "react"



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

interface CalendarWithYearPickerProps<T extends DateValue>
  extends Omit<CalendarPrimitiveProps<T>, "visibleDuration"> {
  errorMessage?: string
  className?: string
  placeholder?: string
}

const CalendarWithYearPicker = <T extends DateValue>({
  errorMessage,
  className,
  ...props
}: CalendarWithYearPickerProps<T>) => {
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [focusedDate, setFocusedDate] = React.useState<DateValue>(
    today(getLocalTimeZone())
  )

  return (
    <CalendarPrimitive
      {...props}
      focusedValue={focusedDate}
      onFocusChange={setFocusedDate}
      maxValue={today(getLocalTimeZone())}
      className={ctr(className, "max-w-[17.5rem] sm:max-w-[15.8rem]")}
    >
      <CalendarWithYearPicker.Header
        year={focusedDate.year}
        setYear={(newYear) => {
          setFocusedDate(focusedDate.set({ year: newYear }))
        }}
      />
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
    heading: "mr-2 text-muted-fg tracking-tight flex-1 text-left font-medium",
    calendarGridHeaderCell: "text-sm lg:text-xs font-semibold text-muted-fg"
  }
})

const { header, heading, calendarGridHeaderCell } = calendarHeaderStyles()

const CalendarHeader = ({
  className,
  year,
  setYear,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  year: number
  setYear: (year: number) => void
}) => {
  const { direction } = useLocale()
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    const event = new CustomEvent('setYear', { detail: currentYear });
    window.dispatchEvent(event);
  }, [year]);

  
  return (
    <header className={header({ className })} {...props}>
      
      <Heading className={heading()} />

    <div className="flex items-center gap-2">
      <input
          type="number"
          value={year === null ? "" : year}
          onChange={(e) => {
            const val = e.target.value
            if (val === "") {
              
              return
            }
            const newYear = Number(val)
            if (!isNaN(newYear)) {
              if (newYear > currentYear) {
                setYear(currentYear) 
              } else {
                setYear(newYear)
              }
            }
          }}
          className="w-16 border rounded px-1 py-0.5 text-sm text-center focus:outline-none focus:ring-0 focus:border-black"
        />

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
      </div>
    </header>
  )
}

const CalendarGridHeader = () => {
  return (
    <CalendarGridHeaderPrimitive>
      {(day) => (
        <CalendarHeaderCell className={calendarGridHeaderCell()}>{day}</CalendarHeaderCell>
      )}
    </CalendarGridHeaderPrimitive>
  )
}

CalendarWithYearPicker.Header = CalendarHeader
CalendarWithYearPicker.GridHeader = CalendarGridHeader

export { CalendarWithYearPicker }
