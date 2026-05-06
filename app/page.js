"use client";
import { useContext, useEffect, useState } from "react";
import React from 'react'

// INTERNAL IMPORT
import {
  Table,
  Form,
  Services,
  Profile,
  StartShipment,
  GetShipment,
  CompleteShipment,
} from "../Components/index";
import { TrackingContext } from "../Conetxt/SupplyChain";

const page = () => {
  const {
    createShipment,
    getAllShipments,
    currentUser,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  //STATE VARIABLE
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);

  //DATA STATE VARIABLE
  const [allShipmentsdata, setallShipmentsdata] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipments(); 

    return async () => {
      const allData = await getCampaignsData;
      setallShipmentsdata(allData);
    }
  }, []);

  return (
    <> 
      <Services 
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
      />
      <Table setCreateShipmentModel={setCreateShipmentModel} allShipmentsdata={allShipmentsdata} />
      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />
    </>
  );
}

export default page;