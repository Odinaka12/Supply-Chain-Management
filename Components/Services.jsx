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
        <section>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {team.map((item, i) => (
                            <li key={i} >
                                <div onClick={ () => openModelBox(i + 1)} className="w-full h-60 sm:h-52 md:h-56">
                                    <Images
                                        src={item.avatar}
                                        alt={`Team member ${i + 1}`}
                                        className="w-full h-full object-cover rounded-xl object-center shadow-md"/>
                                </div>
                            </li>))}
                    </ul>
                </div>
            </div>
        </section>
    );
}