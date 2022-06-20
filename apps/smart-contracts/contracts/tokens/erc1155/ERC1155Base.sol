// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

import "./ERC1155Creator.sol";
import "./ERC1155DefaultApproval.sol";
import "./ERC1155Metadata.sol";

abstract contract ERC1155Base is
    Ownable,
    ERC1155Creator,
    ERC1155Metadata,
    ERC1155DefaultApproval,
    ERC1155Supply,
    ERC1155Burnable
{
    string public name;
    string public symbol;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function setBaseURI(string calldata baseURI_) external onlyOwner {
        _setBaseURI(baseURI_);

        emit BaseURIUpdated(baseURI_);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Creator)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function uri(uint256 tokenId)
        public
        view
        virtual
        override(ERC1155, ERC1155Metadata)
        returns (string memory)
    {
        return ERC1155Metadata.uri(tokenId);
    }

    function isApprovedForAll(address account, address operator)
        public
        view
        virtual
        override(ERC1155, ERC1155DefaultApproval)
        returns (bool)
    {
        return ERC1155DefaultApproval.isApprovedForAll(account, operator);
    }

    function _burn(
        address from,
        uint256 id,
        uint256 amount
    ) internal virtual override(ERC1155, ERC1155Creator) {
        ERC1155Creator._burn(from, id, amount);
    }

    function _burnBatch(
        address from,
        uint256[] memory ids,
        uint256[] memory amounts
    ) internal virtual override(ERC1155, ERC1155Creator) {
        ERC1155Creator._burnBatch(from, ids, amounts);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
