// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

abstract contract ERC721DefaultApproval is ERC721 {
    mapping(address => bool) private defaultApprovals;

    event DefaultApproval(address indexed operator, bool isAuthorized);

    function _setDefaultApproval(address operator, bool isAuthorized) internal {
        defaultApprovals[operator] = isAuthorized;

        emit DefaultApproval(operator, isAuthorized);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        virtual
        override
        returns (bool)
    {
        return
            defaultApprovals[spender] ||
            super._isApprovedOrOwner(spender, tokenId);
    }

    function isApprovedForAll(address owner, address operator)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            defaultApprovals[operator] ||
            super.isApprovedForAll(owner, operator);
    }
}
