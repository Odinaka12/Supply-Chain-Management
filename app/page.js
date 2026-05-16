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
    getAllUserShipments
  } = useContext(TrackingContext);

  //STATE VARIABLE
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);

  //DATA STATE VARIABLE
  const [allShipmentsdata, setallShipmentsdata] = useState([]);

 const fetchData = async () => {
    try {
        const allData = await getAllUserShipments();

        console.log(allData);

        if (allData) {
            setallShipmentsdata(allData);
        }
    } catch (error) {
        console.log(error);
    }
};

  useEffect(() => {
    if(currentUser){
        fetchData();
    }
}, [currentUser]);

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
        fetchData={fetchData}
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
        fetchData={fetchData}
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
        fetchData={fetchData}
      />
    </>
  );
}

export default page;