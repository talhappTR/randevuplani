"use client";
import { useState, useEffect, useCallback, memo } from "react";
import { gR } from "@/functions";

const Hizmet = ({ hizmetData, setseciliHizmetlerData }) => {
  const [seciliIdler, setseciliIdler] = useState(new Set());

  useEffect(() => {
    if (seciliIdler.size > 0) {
      const seciliIdlerData_TMP = [];
      seciliIdler.forEach((item, index) => {
        seciliIdlerData_TMP.push(hizmetData.find((x) => x.id == item.id));
      });
      setseciliHizmetlerData(seciliIdlerData_TMP);
    }
  }, [seciliIdler]);

  const handleOnPress = (id) => {
    const guncellenenSecili = new Set(seciliIdler);

    if (guncellenenSecili.has(id)) {
      guncellenenSecili.delete(id);
    } else {
      guncellenenSecili.add(id);
    }

    setseciliIdler(guncellenenSecili);
  };

  const renderItem = (item, index) => {
    const seciliMi = seciliIdler.has(item.id);

    return (
      <Item item={item} seciliMi={seciliMi} handleOnPress={handleOnPress} />
    );
  };

  return (
    <>
      Hizmet
      <div className=" grid grid-cols-2 gap-4 ">
        {hizmetData?.map(renderItem)}
      </div>
    </>
  );
};
export default Hizmet;

const Item = ({ item, seciliMi, handleOnPress }) => {
  return (
    <div
      onClick={() => handleOnPress(item.id)}
      className={`p-2 border border-gray-100 select-none cursor-pointer
      ${seciliMi ? "bg-green-400" : "bg-white"}
      `}
    >
      {item.baslik}
    </div>
  );
};
