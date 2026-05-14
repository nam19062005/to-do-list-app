import React, { useState, useRef, useEffect } from "react";
import { options } from "@/lib/data";
import { ChevronDown, Clock } from "lucide-react";

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selectedLabel =
    options.find((o) => o.value === dateQuery)?.label ?? "Chọn thời gian";

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-border/50 bg-white/70 hover:bg-white transition-colors duration-200 shadow-sm min-w-[150px] justify-between"
      >
        <span className="flex items-center gap-2 text-foreground">
          <Clock className="size-4 text-muted-foreground" />
          {selectedLabel}
        </span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute left-0 bottom-full mb-2 w-full min-w-[150px] bg-white border border-border/50 rounded-lg shadow-lg z-50 overflow-hidden animate-fade-in">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setDateQuery(option.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors duration-150 ${
                dateQuery === option.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DateTimeFilter;
