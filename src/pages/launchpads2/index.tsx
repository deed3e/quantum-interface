import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Row, Columns } from 'components/Layouts'
import CountDownOne from "components/CountDown/publicsale";
import Popup from "components/popuplaunch/public";
import Timeline from "components/Timeline";
import Faq from "components/faq";
import LogoAco from 'assets/icons/logoaco.png'
import imgDownArrowDark from 'assets/icons/icondown.png'
import iconToken from 'assets/icons/eth-logo.png'
import iconAcora from 'assets/icons/icon-acora.png'

import { useActiveWeb3React } from 'hooks';
import { ethers } from 'ethers';
import { useETHBalances } from 'hooks/useCurrencyBalance';
// const getUrl = window.location;
// console.log(getUrl);
// let getTeam = getUrl.toString().replace("https://app.ancora.finance/#/public_sale?",'');
export default function Launchpad() {
const [isOpenPopup, setIsOpenPopup] = useState(false);
const { account, chainId, disconnect } = useActiveWeb3React()
// if̣̣(chainId != 1){
//   alert("Hello! I am an alert box!!");
// }
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer =  provider.getSigner();
const publicSale_abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "addAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "accounts",
				"type": "address[]"
			}
		],
		"name": "addAddresses",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "addAddressF",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "investors",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"name": "addInvestors",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AddressAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AddressRemoved",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "cancelPublicSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "CancelPublicSale",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint128",
				"name": "minprice",
				"type": "uint128"
			}
		],
		"name": "changeMin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "ClaimTokens",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "depositETH",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "DepositETH",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokensForClaiming",
				"type": "uint256"
			}
		],
		"name": "depositTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokensForClaiming",
				"type": "uint256"
			}
		],
		"name": "DepositTokens",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getFund",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "removeAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startPublicSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stopPublicSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "WithdrawETH",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "areDepositsActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cancelPublicSaleBool",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "deposits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getInvestorlist",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "investor",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "percent",
						"type": "uint256"
					}
				],
				"internalType": "struct AncoraPublic.ListToVesting[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRateToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "hasDepositsFinished",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "isWhitelisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listInvetorVesting",
		"outputs": [
			{
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "percent",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxDeposit",
		"outputs": [
			{
				"internalType": "uint128",
				"name": "",
				"type": "uint128"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minDeposit",
		"outputs": [
			{
				"internalType": "uint128",
				"name": "",
				"type": "uint128"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PublicSaleActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "softcap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensForClaiming",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalEthDeposited",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userClaim",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "whitelist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "whitelistF",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0xb487193254b498516bdA0cdE6b1B418d7F60F847";//
const [amount, setAmount] = useState("");
const [userClaim, setUserclaim] = useState("");
const [userDep, setUserdep] = useState("");
const [totalraise, setTotalRaise] = useState("");
const [totalraisepercent, setTotalRaisepercent] = useState("");
// const tokenContract = new ethers.Contract(contractAddress, privateSale_abi, signer);
async function callContract() {
    if(chainId != 1){
        console.log(chainId)
        if(chainId != 0){
          alert("Please change and bridge to Ethereum Mainnet");
          return;
        }
        
      }
  if(account){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const publicSaleContract = new ethers.Contract(contractAddress, publicSale_abi, signer);
    try {
      const a = await publicSaleContract.depositETH({ value: ethers.utils.parseEther(amount) })
    }
    catch(e){
        const a = await publicSaleContract.depositETH({ value: ethers.utils.parseEther(amount) })
    }
    
  // console.log("done")
  }

}
async function claim() {
  if(account){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const publicSaleContract = new ethers.Contract(contractAddress, publicSale_abi, signer);
    try {
      const a = await publicSaleContract.claimTokens()
    }
    catch(e){
        const a = await publicSaleContract.claimTokens()
    }
  // console.log(counter.toString())
  }

}
async function getContractBalance() {
  // let value;
//   if(account){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const publicSaleContract = new ethers.Contract(contractAddress, publicSale_abi, signer);
  
        const a = await publicSaleContract.getContractBalance();
        setTotalRaise((Number(ethers.utils.formatEther(a))).toString());
        setTotalRaisepercent(((Number(ethers.utils.formatEther(a)))*100/50).toFixed(2).toString());
        if(account){
          const b =  await publicSaleContract.userClaim();
          setUserclaim((Number(ethers.utils.formatEther(b)).toFixed(2)).toString());
          // console.log(userClaim);

          const c = await publicSaleContract.deposits(account);
          setUserdep((Number(ethers.utils.formatEther(c))).toString());
          // console.log(c);
        }
      }
      catch(e){
        return;
    }
      
//    }
 }
getContractBalance(); 

let ethBalance;
if(account){
    ethBalance = useETHBalances([account]);
}
 else{
    ethBalance = 0;
 }
  return (
      <section className='launchpad'>
        <div className="container">
            <div className="top-content">
                <div className="title">
                    <h3>Launchpad: INITIAL DEX OFFERING</h3>
                    <p>Buy new tokens launching on Linea</p>
                </div>

            </div>
            <div className="main-content">
                
                <div className="box-2 box-wp-content">
                    <div className="box-1">
                        <a href=""><img src={LogoAco} alt="logo" /></a>
                    </div>
                    <h3 className="title_coundown"> </h3>
                    {/* <h3 className="title_coundown">Launchpad Will Start In..</h3>
                    <div className="banner-countdown-wrap text-center">
                        <CountDownOne />
                    </div>
                     */}
                    
                    <div className="item">
                        <div className="item_title">
                            <h2>Ancora Public Sale</h2>
                            <p>(FCFS)</p>
                        </div>
                        <div className="content">
                            <div className="banner-progress-wrap">

                                <div className="progress">
                                    <div
                                    className="progress-bar"
                                    role="progressbar"
                                    // style={{ width: totalraisepercent+"%" }}
                                    style={{ width: 100+"%" }}
                                    aria-valuenow="100"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    />
                                </div>
                                <p>Launchpad Done</p>
                                {/* <p>00 / 20 ETH ({totalraisepercent}%)</p> */}

                            </div>
                            {/* <div className="title">
                                <div className="banner-countdown-wrap text-center">
                                    <h3 className="title_coundown">Launchpad Will Start in..</h3>
                                    <CountDownOne />
                                </div>
                            </div> */}
                            <div className="desponsi">
                                <div className="desponsi-item">
                                    <div className="desponsi-img">
                                        <img width={20} src={iconToken} alt="logo token" />
                                    </div>
                                    <div className="desponsi-text">
                                        <h4>your ETH Committed</h4>
                                        <p className='number'>{userDep}</p>
                                        {/* <p className='total'>0,0032 % off total</p> */}
                                    </div>
                                </div>
                                <div className="desponsi-item">
                                    <div className="desponsi-img">
                                    <img width={20} src={iconAcora} alt="logo token" />
                                    </div>
                                    <div className="desponsi-text">
                                        <h4>ACR To Receive</h4>
                                        <p className='number'>{userClaim}</p>
                                    </div>
                                </div>
            
                                {/* <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={ethBalance[account]} /> */}
                               
                                <button type="submit"onClick={() => claim()}>
                                    Claim Now
                                </button>
                                <ul className='total_raise'>
                                    {/* <li><span>Min token entry</span><span>~0 ETH (0.000000000%)</span></li> */}
                                    <li><span>Input amount</span><span></span></li>
                                    <li><span>Price:</span><span>0.005714$</span></li>
                                </ul>
                            </div>


                        </div>

                        <div className="detail" onClick={setIsOpenPopup.bind(this, true)}>
                            <span>detail <img
                            src={imgDownArrowDark}
                            alt="chevron down"
                        /></span>
                        {isOpenPopup && <Popup setIsOpenPopup={setIsOpenPopup} />}
                        </div>
                    </div>
                </div>

                <div className="section-2">
                    <Timeline/>
                    <Faq/>
                </div>
            </div>
        </div>
      </section>
      
  );
}
