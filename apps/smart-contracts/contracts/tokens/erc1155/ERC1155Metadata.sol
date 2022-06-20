// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC1155Creator.sol";

abstract contract ERC1155Metadata is ERC1155Creator {
    using Strings for uint256;

    string private _baseURI;

    mapping(uint256 => string) internal _tokenURIs;

    event BaseURIUpdated(string baseURI);

    function baseURI() public view virtual returns (string memory) {
        return _baseURI;
    }

    function uri(uint256 id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return _tokenURIs[id];
    }

    function _tokenURI(uint256 tokenId)
        internal
        view
        virtual
        returns (string memory)
    {
        string memory tokenURI = _tokenURIs[tokenId];

        if (bytes(baseURI()).length == 0) {
            return tokenURI;
        }

        if (bytes(tokenURI).length != 0) {
            return string(abi.encodePacked(baseURI(), tokenURI));
        }

        return string(abi.encodePacked(baseURI(), tokenId.toString()));
    }

    function _setBaseURI(string memory baseURI_) internal virtual {
        _baseURI = baseURI_;
    }

    function _setTokenURI(uint256 tokenId, string memory _uri)
        internal
        virtual
    {
        _tokenURIs[tokenId] = _uri;
        emit URI(_tokenURI(tokenId), tokenId);
    }
}
