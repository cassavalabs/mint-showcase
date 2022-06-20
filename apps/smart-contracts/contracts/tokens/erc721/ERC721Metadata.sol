// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./ERC721Creator.sol";

abstract contract ERC721Metadata is ERC721Creator {
    using Strings for uint256;

    string private _baseUri;

    mapping(uint256 => string) internal _tokenURIs;

    event BaseURIUpdated(string baseURI);

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory _tokenURI = _tokenURIs[tokenId];

        if (bytes(_baseURI()).length == 0) {
            return _tokenURI;
        }

        if (bytes(_tokenURI).length != 0) {
            return string(abi.encodePacked(_baseURI(), _tokenURI));
        }

        return string(abi.encodePacked(_baseURI(), tokenId.toString()));
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseUri;
    }

    function _setBaseURI(string memory baseURI) internal virtual {
        _baseUri = baseURI;

        emit BaseURIUpdated(baseURI);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );

        require(
            bytes(_tokenURI).length >= 46,
            "NFT721Metadata: Invalid IPFS CID"
        );

        _tokenURIs[tokenId] = _tokenURI;
    }
}
