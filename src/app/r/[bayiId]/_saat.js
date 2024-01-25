"use client";
import { useState, useEffect, useCallback, memo } from "react";
import { format, sub, add, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";
import { gR } from "@/functions";

const Saat = ({ saatData, setseciliSaat, seciliTarih, seciliPersonelId }) => {
  const [secili, setsecili] = useState(new Set());
  const [data, setData] = useState();

  useEffect(() => {
    setseciliSaat(secili);
  }, [secili]);

  useEffect(() => {
    if (seciliTarih && saatData) {
      const seciliGunSaatler =
        saatData[format(seciliTarih, "EEEE", { locale: tr })];

      const suankiSaat = format(new Date(), "HH:mm");

      const filteredSaatler = isSameDay(seciliTarih, new Date())
        ? seciliGunSaatler?.filter((item) => item.saat > suankiSaat)
        : seciliGunSaatler;

      setData(filteredSaatler);
    }
  }, [seciliTarih, saatData]);

  const getDoluSaatler = async (seciliPersonelId, seciliTarih) => {
    const randevuDoluluguReq = await gR(
      `PersonelDoluSaatler?personelId=${seciliPersonelId}&tarih=${format(
        seciliTarih,
        "dd.MM.yyyy"
      )}`
    );

    return randevuDoluluguReq?.data;
  };

  useEffect(() => {
    if (seciliPersonelId && seciliTarih) {
      getDoluSaatler(seciliPersonelId, seciliTarih).map((item, index) => {
        //buraya datayı döndür eşleşenlere dolu true ekle
      });
    }
  }, [data]);

  const handleOnPress = (saat) => {
    setsecili((_saat) => (_saat == saat ? undefined : saat));
  };

  const renderItem = (item, index) => {
    return (
      <Item
        item={item}
        seciliMi={secili == item.saat}
        handleOnPress={handleOnPress}
      />
    );
  };

  return (
    <>
      Saat
      <div className=" grid grid-cols-6 gap-4 ">{data?.map(renderItem)}</div>
    </>
  );
};
export default Saat;

const Item = ({ item, seciliMi, handleOnPress }) => {
  return (
    <div
      onClick={() => handleOnPress(item.saat)}
      className={`p-2 border border-gray-100 select-none cursor-pointer text-center
      ${seciliMi ? "bg-green-400" : "bg-white"}
      `}
    >
      {item.saat}
    </div>
  );
};
