// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

import "./ERC721Creator.sol";
import "./ERC721DefaultApproval.sol";
import "./ERC721Metadata.sol";

abstract contract ERC721Base is
    Ownable,
    ERC721DefaultApproval,
    ERC721Enumerable,
    ERC721Burnable,
    ERC721Creator,
    ERC721Metadata
{
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Creator, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function isApprovedForAll(address owner, address operator)
        public
        view
        override(ERC721, ERC721DefaultApproval, IERC721)
        returns (bool)
    {
        return ERC721DefaultApproval.isApprovedForAll(owner, operator);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721Metadata)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        override(ERC721, ERC721DefaultApproval)
        returns (bool)
    {
        return ERC721DefaultApproval._isApprovedOrOwner(spender, tokenId);
    }

    function _baseURI()
        internal
        view
        override(ERC721, ERC721Metadata)
        returns (string memory)
    {
        return super._baseURI();
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721Creator) {
        super._burn(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {}
}
