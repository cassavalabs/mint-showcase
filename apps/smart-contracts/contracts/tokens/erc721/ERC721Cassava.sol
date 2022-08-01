// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./ERC721Base.sol";

contract ERC721Cassava is ERC721Base {
    uint256 private _nextTokenId;

    event Minted(
        address indexed creator,
        uint256 indexed tokenId,
        string indexed tokenURI
    );

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) ERC721(name, symbol) {
        _setBaseURI(baseURI);
        _nextTokenId = 1;
        _setDefaultApproval(_msgSender(), true);
    }

    function mint(string calldata tokenURI_)
        public
        onlyOwner
        returns (uint256 tokenId)
    {
        unchecked {
            tokenId = _nextTokenId++;
        }
        _safeMint(_msgSender(), tokenId);
        _setTokenCreator(tokenId, payable(_msgSender()));
        _setTokenURI(tokenId, tokenURI_);

        emit Minted(_msgSender(), tokenId, tokenURI_);
    }

    function mintWithRoyalty(
        string calldata tokenURI_,
        address receiver,
        uint96 feeNumerator
    ) external returns (uint256 tokenId) {
        unchecked {
            tokenId = _nextTokenId++;
        }
        _safeMint(_msgSender(), tokenId);
        _setTokenCreator(tokenId, payable(_msgSender()));
        _setTokenRoyalty(tokenId, payable(receiver), feeNumerator);
        _setTokenURI(tokenId, tokenURI_);

        emit SetTokenRoyalty(tokenId, receiver, feeNumerator);
    }
}
