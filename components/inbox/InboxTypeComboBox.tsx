"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "../ui/Command";

const inboxSettings = [
  {
    value: "all messages",
    label: "All messages",
  },
  {
    value: "unread",
    label: "Unread",
  },
  {
    value: "archived",
    label: "Archived",
  },
  {
    value: "spam",
    label: "Spam",
  },
];

const InboxTypeComboBox = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className=" flex flex-row w-[150px] h-[40px] hover:bg-opacity-80 hover:bg-neutral-100 rounded-sm items-center justify-center"
      >
        <button className="font-semibold font-sans">
          {value
            ? inboxSettings.find((item) => item.value === value)?.label
            : "All messages"}
          <ChevronDown
            className={cn(
              "w-[20px] h-[20px]transform transition ease-in-out duration-250 ",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="h-[290px] w-[200px] p-0">
        <Command>
          <CommandGroup className=" w-full h-full space-y-2">
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
