import contractABI from "./contract_abi.json"
import { ethers } from "ethers"

const contractAddress = "0x9b1f9915ca049644f21979b6c4382d77b268c8e2"
let provider
let signer
export let contract

if(window.ethereum){
     provider = new ethers.providers.Web3Provider(window.ethereum)
     signer = provider.getSigner()
     contract = new ethers.Contract(contractAddress, contractABI, signer)
}
