import { ethers } from "ethers";
// const fs = require("fs-extra")
import { events_abi , events_bytecode , attendanceNFT_address } from "./constants.js";
import dotenv from "dotenv";
dotenv.config();
//require("dotenv").config()

async function main(year ,month, day , price , capacity){

    
    let provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);


    
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)


    const contractFactory = new ethers.ContractFactory(events_abi, events_bytecode, wallet)
    console.log("Deploying, please wait...")
    // const contract = await contractFactory.deploy(attendanceNFT_address , "10000000000000000" , 100, 12, 12, 2024);

    let wei = rupeesToWei(price);
    console.log(`${wei} is the single ticklet price...`);
    const contract = await contractFactory.deploy(attendanceNFT_address , capacity , wei.toString(), day, month, year);


    const deploymentReceipt = await contract.deploymentTransaction().wait(1)
    const address = await contract.getAddress();
    console.log(`Contract address: ${ address}`);
    
    console.log(`Here is the receipt: ${deploymentReceipt}`);
    
    return address;
}

const rupeesToWei = (rupees) => {
    const ethPerRupee = 0.00000450; // The exchange rate in number format
    const weiValuePerRupee = BigInt(ethPerRupee * 1e18); 
    
    
    const weiValue = weiValuePerRupee * BigInt(rupees);
    
    return weiValue;
};



export default main;