// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

abstract contract ERC721Creator is ERC2981, ERC721 {
    /// @notice a mapping of tokenId to creator address
    mapping(uint256 => address payable) private _creator;

    event SetTokenCreator(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to
    );

    event SetTokenRoyalty(
        uint256 indexed tokenId,
        address indexed receiver,
        uint96 feeNumerator
    );

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function getCreator(uint256 tokenId)
        external
        view
        returns (address payable)
    {
        return _creator[tokenId];
    }

    function _burn(uint256 tokenId) internal virtual override {
        delete _creator[tokenId];

        super._burn(tokenId);
        _resetTokenRoyalty(tokenId);
    }

    function _setTokenCreator(uint256 tokenId, address payable creator)
        internal
    {
        emit SetTokenCreator(tokenId, _creator[tokenId], creator);
        _creator[tokenId] = creator;
    }
}
