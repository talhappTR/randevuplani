"use client";
import { useState, useEffect, useCallback, memo } from "react";
import { gR } from "@/functions";
import { format, sub, add, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Tarih = ({ bayiId, setseciliTarih }) => {
  const [tarih, settarih] = useState(new Date());

  useEffect(() => {
    setseciliTarih(tarih);
  }, [tarih]);

  const handleOnPress = (islem) => {
    if (islem == 0) {
      !isSameDay(tarih, new Date()) && settarih(sub(tarih, { days: 1 }));
      return;
    }
    settarih(add(tarih, { days: 1 }));
  };

  return (
    <div className="grid grid-cols-4 justify-between    ">
      <div
        onClick={() => handleOnPress(0)}
        className="bg-white border mr-2 border-gray-400   flex items-center justify-center rounded active:bg-gray-100"
      >
        <a>
          <FaAngleLeft />
        </a>
      </div>
      <div className="bg-white border border-gray-400 rounded text-center col-span-2  grid p-1 active:bg-gray-100">
        <a>{format(tarih, "dd MM yyyy", { locale: tr })}</a>
        <a className="text-center">{format(tarih, "EEEE", { locale: tr })}</a>
      </div>
      <div
        onClick={() => handleOnPress(1)}
        className="bg-white border ml-2 border-gray-400    flex items-center justify-center rounded active:bg-gray-100"
      >
        <FaAngleRight />
      </div>
    </div>
  );
};

export default Tarih;
