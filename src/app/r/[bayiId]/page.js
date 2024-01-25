"use client";
import { useState, useEffect, useCallback, memo } from "react";

import Firma from "./_firma";
import Hizmet from "./_hizmet";
import Tarih from "./_tarih";
import Personel from "./_personel";
import Saat from "./_saat";

const Bayi = ({ params }) => {
  const [seciliPersonelId, setseciliPersonelId] = useState();
  const [seciliHizmetlerData, setseciliHizmetlerData] = useState();
  const [seciliTarih, setseciliTarih] = useState();
  const [seciliSaat, setseciliSaat] = useState();

  const [hizmetData, sethizmetData] = useState();
  const [saatData, setsaatData] = useState();

  return (
    <>
      <Firma bayiId={params.bayiId} />
      <Personel
        bayiId={params.bayiId}
        setseciliPersonelId={setseciliPersonelId}
        sethizmetData={sethizmetData}
        setsaatData={setsaatData}
      />
      <Hizmet
        hizmetData={hizmetData}
        setseciliHizmetlerData={setseciliHizmetlerData}
      />

      <Tarih bayiId={params.bayiId} setseciliTarih={setseciliTarih} />

      <Saat
        saatData={saatData}
        setseciliSaat={setseciliSaat}
        seciliTarih={seciliTarih}
        seciliPersonelId={seciliPersonelId}
      />
    </>
  );
};

export default Bayi;
