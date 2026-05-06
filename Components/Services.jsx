import React from "react";
import images from "../Images/index";
import Images from "next/image";

export default ({
    setOpenProfile,
    setCompleteModal,
    setGetModel,
    setStartModal
}) => {
    const team = [
        {
            avatar: images.compShipment,
        },
        {
            avatar: images.getShipment,
        },
        {
            avatar: images.startShipment,
        },
        {
            avatar: images.userProfile,
        },
        {
            avatar: images.shipCount,
        },
        {
            avatar: images.send,
        },
    ];

    const openModelBox = (text) => {
        if (text === 1) {
            setCompleteModal(true);
        } else if (text === 2) {
            setGetModel(true);
        }  else if (text === 3) {
            setStartModal(true);
        } else if (text === 4) {
            setOpenProfile(true);
        }
    };

    return (
        <div className="services">
            <h1>Services</h1>
        </div>
    );
}