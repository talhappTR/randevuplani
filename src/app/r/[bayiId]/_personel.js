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
    setseciliId((_id) => (_id == id ? 0 : id));
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
    <div className="">
      <div className="font-bold pb-2">Personeller</div>
      {data?.map(renderItem)}
    </div>
  );
};

export default Personel;

const Item = ({ item, seciliMi, handleOnPress }) => {
  return (
    <div
      onClick={() => handleOnPress(item.id)}
      className={`p-2 border-[3px] relative  place-items-center overflow-hidden  bg-white border-gray-400  select-none cursor-pointer h-64 w-48 rounded-2xl
      ${seciliMi ? "border-blue-400 " : "border-white-400 "}
      `}
    >
      <img src="/pfoto.png" alt="React Image" className="w-36  self-center" />

      <div className="p-2 absolute -ml-2 bottom-0   bg-[#3434348c] w-full h-16">
        <div className="text-white">{item.ad}</div>
      </div>
    </div>
  );
};
