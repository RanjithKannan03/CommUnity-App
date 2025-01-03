"use client";

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker(props) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !props.date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {props.date ? format(props.date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={props.date}
                    onSelect={props.setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
