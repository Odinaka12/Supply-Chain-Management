"use client";
import React from "react"; 
import {useState} from "react";
import {Str1} from "../Components/index";

export default ({ getModel, setGetModel, getShipment }) => {
    const [index, setIdex] = useState(0);
    const [singleShipmentData, setSingleShipmentData] = useState();

    const getShipmentData = async () => {
        const getData = await getShipment(index);
        setSingleShipmentData(getData);
        console.log(getData);
    };
    console.log(singleShipmentData);

    const converTime = (time) => {
        if (time == 0){
            return 0;
        }
        const newTime = new Date(time * 1000);
        const dataTime = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(newTime);
        return dataTime; 
    };

    return getModel ? (
        <div  className="fixed insert-0 z-10 overflow-y-auto w-full">
            <div className="fixed insert-0 w-full h-full bg-black opacity-40" onClick={() => setGetModel(false)}>
            </div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg h-fit">
                    <div className="flex justify-end">
                        <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100" onClick={() =>setGetModel(false)} >
                            <Str1 />
                        </button> 
                    </div>
                    <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                        <h4 className="text-lg font-medium text-gray-800">Shipment Details</h4>

                         <form onSubmit={(e) => e.preventDefault()}>
                            <div className="relative mt-3">
                                <input type="number" placeholder="Id" className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" onChange={(e) => setIdex( e.target.value)}/>
                            </div>
                            <button onClick={() => getShipmentData()} className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150 ring-offset-2 ring-indigo-600 focus:ring-2">Get Shipment Details</button>
                        </form>

                        {singleShipmentData == undefined ? (
                            " "  
                        ) : (
                            <div className="text-left">
                                <p>Sender: {singleShipmentData.sender.slice(0, 25)}...</p>
                                <p>Receiver: {singleShipmentData.receiver.slice(0, 25)}...</p>
                                <p>Pickup Time: {converTime(singleShipmentData.pickupTime)}</p>
                                <p>Delivery Time: {converTime(singleShipmentData.deliveryTime)}</p>
                                <p>Distance: {singleShipmentData.distance} km</p>
                                <p>Price: {singleShipmentData.price} ETH</p>
                                <p>Status: {singleShipmentData.status}</p>
                                <p>Paid: {" "} {singleShipmentData.isPaid ? "Completed" : "Not Completed"}</p>
                            </div>
                        )}
                    </div>
                </div>        
            </div>
        </div>
    ) : (
        ""
    );
}
