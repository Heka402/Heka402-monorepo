// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from "forge-std/Script.sol";
import {PrivacyPaymentAccount} from "../contracts/PrivacyPaymentAccount.sol";
import {MerkleCommitmentRegistry} from "../contracts/MerkleCommitmentRegistry.sol";
import {Verifier} from "../contracts/Verifier.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        vm.startBroadcast(deployerPrivateKey);
        
        console.log("Deployer address:", deployer);
        console.log("Deployer balance:", deployer.balance);
        console.log("Chain ID:", block.chainid);
        
        // Deploy Verifier
        Verifier verifier = new Verifier();
        console.log("Verifier deployed at:", address(verifier));
        
        // Deploy MerkleCommitmentRegistry
        MerkleCommitmentRegistry registry = new MerkleCommitmentRegistry(deployer);
        console.log("MerkleCommitmentRegistry deployed at:", address(registry));
        
        // Deploy PrivacyPaymentAccount
        PrivacyPaymentAccount account = new PrivacyPaymentAccount(address(verifier), deployer);
        console.log("PrivacyPaymentAccount deployed at:", address(account));
        
        vm.stopBroadcast();
        
        // Save deployment addresses
        string memory chainId = vm.toString(block.chainid);
        string memory deploymentFile = string.concat("deployments/", chainId, ".json");
        
        string memory json = string.concat(
            '{\n',
            '  "chainId": ', chainId, ',\n',
            '  "verifier": "', vm.toString(address(verifier)), '",\n',
            '  "registry": "', vm.toString(address(registry)), '",\n',
            '  "account": "', vm.toString(address(account)), '"\n',
            '}'
        );
        
        vm.writeFile(deploymentFile, json);
        console.log("Deployment info saved to:", deploymentFile);
    }
}

