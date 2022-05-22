// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./tokens/erc721/ERC721Cassava.sol";
import "./tokens/erc1155/ERC1155Cassava.sol";

contract CassavaLandNFTFactory {
    using Address for address;

    event ERC721CassavaCreated(
        address indexed collectionAddress,
        address indexed creator,
        string name,
        string symbol
    );

    event ERC1155CassavaCreated(
        address indexed collectionAddress,
        address indexed creator,
        string name,
        string symbol
    );

    function createERC721Collection(
        string calldata name,
        string calldata symbol,
        string calldata baseURI
    ) external returns (address collectionAddress) {
        IERC721 token = new ERC721Cassava(name, symbol, baseURI);

        collectionAddress = address(token);

        emit ERC721CassavaCreated(collectionAddress, msg.sender, name, symbol);
    }

    function createERC1155Collection(
        string calldata name,
        string calldata symbol,
        string calldata baseURI
    ) external returns (address collectionAddress) {
        IERC1155 token = new ERC1155Cassava(name, symbol, baseURI);

        collectionAddress = address(token);

        emit ERC1155CassavaCreated(collectionAddress, msg.sender, name, symbol);
    }
}
