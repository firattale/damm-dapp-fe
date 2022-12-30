// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTContract is ERC721Enumerable {
    uint tokenId;
    string baseURI;
    mapping(address => uint256[]) public ids;

    constructor(
        string memory _baseURIString
    ) payable ERC721("MyNft", "MY_NFT") {
        baseURI = _baseURIString;
    }

    function mint(address to) public {
        _mint(to, tokenId);
        tokenId++;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function getBaseURI() public view returns (string memory) {
        return _baseURI();
    }
}
