"use client"
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORT
import supplyChain from "../Conetxt/SupplyChain.json";

const ContractAddress = "0xf292D353fAf609B54E608510E598932959212E48";
const ContractABI = supplyChain.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children}) => {
    //STATE VARIABLE
    const DappName = "Supply Chain Tracking";
    const [currentUser, setCurrentUser] = useState("");

 const createShipment = async (items) => {
    console.log(items);

    const { receiver, pickupTime, distance, price } = items;

    try {

        if (!ethers.utils.isAddress(receiver)) {
            return alert("Invalid Ethereum Address");
        }

        const web3Modal = new Web3Modal();

        const connection = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        const contract = fetchContract(signer);

         const priceInWei = ethers.utils.parseUnits(price, 18);
         
        const createItem = await contract.createShipment(
            receiver, Math.floor(new Date(pickupTime).getTime() / 1000), Number(distance), priceInWei,
            {
                value: priceInWei,
            }
        );
        await createItem.wait();
        console.log(createItem);
    } catch (error) {
        console.log(
            "something went wrong while creating the shipment",
            error
        );
    }
 };

    const getAllShipments = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL);
            const contract = fetchContract(provider);

            const shipments = await contract.getAllTransactions();
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }));
            return allShipments;
        } catch (error) {
            console.log("something went wrong while fetching shipments", error);
        }
    };

    const getAllUserShipments = async () => { 
    try {
        if (!window.ethereum) return [];

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = fetchContract(provider);

        // connected wallet shipments only
        const shipments = await contract.getUserShipments(accounts[0]);

        const allShipments = shipments.map((shipment) => ({
            sender: shipment.sender,
            receiver: shipment.receiver,
            price: ethers.utils.formatEther(shipment.price.toString()),
            pickupTime: shipment.pickupTime.toNumber(),
            deliveryTime: shipment.deliveryTime.toNumber(),
            distance: shipment.distance.toNumber(),
            isPaid: shipment.isPaid,
            status: shipment.status,
        }));

        return allShipments;

    } catch (error) {
        console.log(
            "something went wrong while fetching shipments",
            error
        );
    }
};

    const getShipmentCount = async () => {
        try {
            if (!window.ethereum) return "Please install MetaMask";

            const accounts = await window.ethereum.request({ method: "eth_accounts" }); 
            const provider = new ethers.providers.JsonRpcProvider( process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL);
            const contract = fetchContract(provider);
            const shipmentCount = await contract.getShipmentCount(accounts[0]);
            return shipmentCount.toNumber();
        } catch (error) {
            console.log("something went wrong while fetching shipment count", error);
        }
    }

    const completeShipment = async (completeShip) => {
        console.log(completeShip);

        const {receiver, index} = completeShip;
        try {
            if (!window.ethereum) return "Please install MetaMask";
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect(); 
            const  provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(accounts[0], receiver, index, { gasLimit: 300000,});

            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            console.log("something went wrong while completing the shipment", error);
        }
    };

    const getShipment = async (index) => {
        console.log(index * 1);
        try {
            if (!window.ethereum) return "Please install MetaMask";
            
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            const provider = new ethers.providers.JsonRpcProvider( process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL);
            const contract = fetchContract(provider); 
            const shipment = await contract.getShipment(accounts[0], index * 1);

            const SingleShipment = {
                sender: shipment[0], receiver: shipment[1], pickupTime: shipment[2].toNumber(), deliveryTime: shipment[3].toNumber(), distance: shipment[4].toNumber(), price: ethers.utils.formatEther(shipment[5].toString()),  status: shipment[6], isPaid: shipment[7], 
            };
            return SingleShipment;
        } catch (error) {
            console.log("sorry no shipment found", error);
        }
    };

    const startShipment = async (getProduct) => {
        const {receiver, index} = getProduct;

        try{
            if (!window.ethereum) return "Please install MetaMask";

            const accounts = await window.ethereum.request({ method: "eth_accounts" });

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect(); 
            const  provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(accounts[0], receiver, index * 1,);

            await shipment.wait();
            console.log(shipment);
        } catch (error) {
            console.log("something went wrong while starting the shipment", error);
        }
    };
    //---CHECK WALLET CONNECTION
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return "Please install MetaMask";

            const  accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentUser(accounts[0]);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            return "not connected to wallet";
        }
    };
    //---CONNECT WALLET FUNCTION
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return "Please install MetaMask";

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            setCurrentUser(accounts[0]);
        } catch (error) {
            return  "something went wrong while connecting to wallet";
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    },[]);

    return (
        <TrackingContext.Provider value={{ DappName, connectWallet, currentUser, createShipment, getAllShipments, getShipmentCount, getAllUserShipments, completeShipment, getShipment, startShipment}}> 
            {children}
        </TrackingContext.Provider>
    )

}