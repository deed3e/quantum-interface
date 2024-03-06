import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import LogoAco from 'assets/icons/logoaco.png'

import { useActiveWeb3React } from 'hooks';
import { ethers } from 'ethers';
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
const publicSale_abi =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "baseURI",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "flipSaleState",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintNFTs",
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
				"name": "_user",
				"type": "address"
			}
		],
		"name": "removeWhitelistUser",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseExtension",
				"type": "string"
			}
		],
		"name": "setBaseExtension",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_baseTokenURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newCost",
				"type": "uint256"
			}
		],
		"name": "setCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newmaxPerMint",
				"type": "uint256"
			}
		],
		"name": "setmaxMintAmount",
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
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "whitelistUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"name": "baseExtension",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseTokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cost",
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
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
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
		"name": "isSaleActive",
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
		"name": "maxPerMint",
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
		"name": "maxSupply",
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
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
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
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
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
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
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
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
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
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
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
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "walletOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
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
		"name": "whitelisted",
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
const contractAddress_silver = "0x62D2e50D9c2148E8a82722F0e7F87Bbc9f9660f6";//
const contractAddress_gold = "0x9f33A1a60dc8A95ce70df523aBa74b9b38f4DE68";//
const contractAddress_diamond = "0x472d711dce8E7dA40a5A2Dbc5C6C354969698cAE";//
const [amount, setAmount] = useState("");
const [totalraise, setTotalRaise] = useState("");
const [totalraisepercent, setTotalRaisepercent] = useState("");
async function callContract_silver() {
 
  if(account){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const publicSaleContract = new ethers.Contract(contractAddress_silver, publicSale_abi, signer);
    try {
      const a = await publicSaleContract.mintNFTs({ value: ethers.utils.parseEther("0.0006") });//
    }
    catch(e){
        const a = await publicSaleContract.mintNFTs({ value: ethers.utils.parseEther("0.0006") });//{ value: ethers.utils.parseEther(amount) }
    }

  }

}
async function callContract_gold() {
 
	if(account){
	  const provider = new ethers.providers.Web3Provider(window.ethereum)
	  const signer = provider.getSigner();
	  const publicSaleContract = new ethers.Contract(contractAddress_gold, publicSale_abi, signer);
	  try {
		const a = await publicSaleContract.mintNFTs({ value: ethers.utils.parseEther("0.0006") });//
	  }
	  catch(e){
		  const a = await publicSaleContract.mintNFTs({ value: ethers.utils.parseEther("0.0006") });//{ value: ethers.utils.parseEther(amount) }
	  }
  
	}
  
  }
  async function callContract_diamond() {
 
	if(account){
	  const provider = new ethers.providers.Web3Provider(window.ethereum)
	  const signer = provider.getSigner();
	  const publicSaleContract = new ethers.Contract(contractAddress_diamond, publicSale_abi, signer);
	  try {
		const a = await publicSaleContract.mintNFTs({ value: ethers.utils.parseEther("0.0006") });//
	  }
	  catch(e){
		  const a = await publicSaleContract.mintNFTs({ value: ethers.utils.parseEther("0.0006") });//{ value: ethers.utils.parseEther(amount) }
	  }
  
	}
  
  }


  return (
      <section className='launchpad'>
        <div className="container">
            <div className="top-content">
                <div className="title">
                    <h3>Introducing Mint NFT</h3>
                    <p>Mint NFT, a groundbreaking feature that combines blockchain technology with cognitive science to create unique and collectible digital assets representing individual thoughts and memories.</p>
                </div>

            </div>
            <div className="main-content">
			<div className="box-2 box-wp-content box-nft">
                    <div className="box-1">
                        <a href=""><img src={LogoAco} alt="logo" /></a>
                    </div>
                    <h3>Exploring the World of Digital Collectibles</h3>
                    
                    <section className="cards">
						<div className="item-nnt">
							<div className='card charizard animated'>
							</div>
							<button type="submit" className='button-nfts'onClick={() => callContract_silver()}>
								Mint Now
                                </button>
						</div>
						<div className="item-nnt">
						<div className='card pika animated'>

						</div>
						<button type="submit" className='button-nfts'onClick={() => callContract_gold()}>
								Mint Now
                                </button>
						</div>
						<div className="item-nnt">
						<div className='card eevee animated'>
	
						</div>
						<button type="submit" className='button-nfts'onClick={() => callContract_diamond()}>
								Mint Now
                                </button>
						</div>

					</section>
                </div>
                
				

                <div className="section-2">
					<div className="timeline">
						<div className="row">
							<div className="col-lg-12">
							<h3 className="title_timeline">How It's Mint NFT</h3>
							<div className="timeline-container">
								<div className="timeline-continue">
								<div className="row timeline-right">
									<div className="col-md-6">
									<p className="timeline-date">
										1
									</p>
									</div>
									<div className="col-md-6">
									<div className="timeline-box">
										<div className="timeline-icon">
										<i className="fa fa-gift" />
										</div>
										<div className="timeline-text">
										<h3>Activate your Profile</h3>
										<p>You’ll need connect to AncoraFinance to take part in an IFO!
				</p>
										</div>
									</div>
									</div>
								</div>
								<div className="row timeline-left">
									<div className="col-md-6">
									<div className="timeline-box">
										<div className="timeline-icon d-md-none d-block">
										<i className="fa fa-business-time" />
										</div>
										<div className="timeline-text">
										<h3>The Ethereum</h3>
										<p>You have sufficient ETH token is your wallet</p>
										</div>
										<div className="timeline-icon d-md-block d-none">
										<i className="fa fa-business-time" />
										</div>
									</div>
									</div>
									<div className="col-md-6 d-md-block d-none">
									<p className="timeline-date">
										2
									</p>
									</div>
								</div>
								<div className="row timeline-right">
									<div className="col-md-6">
									<p className="timeline-date">
									3
									</p>
									</div>
									<div className="col-md-6">
									<div className="timeline-box">
										<div className="timeline-icon">
										<i className="fa fa-briefcase" />
										</div>
										<div className="timeline-text">
										<h3>Join and Moon!</h3>
										<p>Before the end of IDO, put in ETH token</p>
										</div>
									</div>
									</div>
								</div>
								<div className="row timeline-left">
									<div className="col-md-6">
									<div className="timeline-box">
										<div className="timeline-icon d-md-none d-block">
										<i className="fa fa-cogs" />
										</div>
										<div className="timeline-text">
										<h3>Moon With AncoraFinance</h3>
										<p>Launchpad will be fully released according to the super
				fundraising model, and the tokens will be returned </p>
										</div>
										<div className="timeline-icon d-md-block d-none">
										<i className="fa fa-cogs" />
										</div>
									</div>
									</div>
									<div className="col-md-6 d-md-block d-none">
									<p className="timeline-date">
										4
									</p>
									</div>
								</div>
								</div>
							</div>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
      </section>
      
  );
}
