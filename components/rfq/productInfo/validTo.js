import { Seller } from "@/useStore/seller";
import { DatePicker } from "antd";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { useStore } from "@/useStore/details";

const ValidTo = () => {
  const [updateRfqDate, rfqDate] = useStore((store) => [
    store.updateRfqDate,

    store.rfqDate,
  ]);
  const dateFormat = "DD/MM/YYYY";
  const postDate = new Date();
  const presentDate = new Date();
  const [newDate, setNewDate] = useState("");

  const f = new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const [validDays, setValidDays] = useState(7);
  presentDate.setDate(presentDate.getDate() + validDays);
  console.log("prsernt", presentDate);
  const [a, setA] = useState(presentDate.getDate());
  const [b, setB] = useState(presentDate.getMonth() + 1);
  const [c, setC] = useState(presentDate.getFullYear());
  const [day, setDay] = useState(
    `${a < 10 ? "0" : ""}${a}/${b < 10 ? "0" : ""}${b}/${c}`
  );

  const newValiDays = (date) => {
    console.log("date", f.format(date?.$d), "day");

    const bun = new Date();
    setValidDays(Math.floor((date?.$d - bun) / (1000 * 24 * 60 * 60)) + 1);
    console.log("days", Math.floor((date?.$d - bun) / (1000 * 24 * 60 * 60)));
    setDay(f.format(date?.$d));

    setA(date?.$D);
    setB(date?.$M);
    setC(date?.$y);
  };
  console.log("present date", rfqDate);
  useEffect(() => {
    updateRfqDate({
      rfqPostedDate: f.format(postDate),
      rfqExpireDate: day,
    });
  }, []);

  return (
    <div className="flex flex-col space-y-1">
      <label className="leading-7 text-base font-semibold text-gray-800">
        Valid To<span className="text-red-600 text-lg">*</span>
      </label>
      <div className="flex items-center space-x-3">
        <DatePicker
          defaultValue={dayjs(day, dateFormat)}
          format={dateFormat}
          onChange={(date, dateString) => {
            setNewDate(date?.$d);
            newValiDays(date);
            console.log("date", date);
          }}
          onBlur={() => {
            updateRfqDate({
              rfqPostedDate: f.format(postDate),
              rfqExpireDate: day,
            });
          }}
          className="w-40"
        />
        <p className="font-semibold text-gray-600">{validDays} days</p>
      </div>
    </div>
  );
};

export default ValidTo;
