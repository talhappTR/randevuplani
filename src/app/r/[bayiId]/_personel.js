"use client";
import { useState, useEffect, useCallback, memo } from "react";
import { gR } from "@/functions";

const Personel = ({
  bayiId,
  setseciliPersonelId,
  sethizmetData,
  setsaatData,
}) => {
  const [data, setdata] = useState();
  const [seciliId, setseciliId] = useState();

  const getData = async (bayiId) => {
    const req = await gR(`Bayi/PersonelListe?bayiId=${bayiId}`);
    console.log("req", req);
    setdata(req?.data);
    if (req?.data?.length > 0) {
      setseciliId(req?.data?.[0]?.id);
    }
  };

  useEffect(() => {
    getData(bayiId);
  }, [bayiId]);

  useEffect(() => {
    if (seciliId > 0) {
      setseciliPersonelId(seciliId);
      const idBul = data.find((x) => x.id == seciliId);
      sethizmetData(idBul.hizmetler);
      setsaatData(idBul.gunVeSaatler);
    }
  }, [seciliId]);

  const handleOnPress = (id) => {
    setseciliId((_id) => (_id == id ? id : id));
  };

  const renderItem = (item, index) => {
    return (
      <Item
        item={item}
        seciliMi={seciliId == item.id}
        handleOnPress={handleOnPress}
      />
    );
  };

  return (
    <div className="bg-yellow-800 p-4">Personel {data?.map(renderItem)}</div>
  );
};

export default Personel;

const Item = ({ item, seciliMi, handleOnPress }) => {
  return (
    <div
      onClick={() => handleOnPress(item.id)}
      className={`p-2 border border-gray-100 select-none cursor-pointer
      ${seciliMi ? "bg-green-400" : "bg-white"}
      `}
    >
      {item.ad}
    </div>
  );
};
