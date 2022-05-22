// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

abstract contract ERC1155Creator is ERC2981, ERC1155 {
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

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC2981)
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

    function _burn(
        address from,
        uint256 id,
        uint256 amount
    ) internal virtual override {
        delete _creator[id];

        super._burn(from, id, amount);
        _resetTokenRoyalty(id);
    }

    function _burnBatch(
        address from,
        uint256[] memory ids,
        uint256[] memory amounts
    ) internal virtual override {
        super._burnBatch(from, ids, amounts);

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 tokenId = ids[i];
            _resetTokenRoyalty(tokenId);
        }
    }

    function _setTokenCreator(uint256 tokenId, address payable creator)
        internal
    {
        emit SetTokenCreator(tokenId, _creator[tokenId], creator);
        _creator[tokenId] = creator;
    }
}
