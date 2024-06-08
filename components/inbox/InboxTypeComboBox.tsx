"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "@/components/ui/Command";

const inboxSettings = [
  {
    value: "all messages",
    label: "All messages",
  },
  {
    value: "orders",
    label: "Orders",
  },
];

const InboxTypeComboBox = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="flex h-[40px] w-[150px] flex-row items-center justify-center rounded-sm hover:bg-neutral-100 hover:bg-opacity-80"
      >
        <button className="font-semibold">
          {value
            ? inboxSettings.find((item) => item.value === value)?.label
            : "All messages"}
          <ChevronDown
            className={cn(
              "h-[20px]transform duration-250 w-[20px] transition ease-in-out ",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="h-[290px] w-[200px] bg-white p-0">
        <Command>
          <CommandGroup className="h-full w-full space-y-2">
            {inboxSettings.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InboxTypeComboBox;
