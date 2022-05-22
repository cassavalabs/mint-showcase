// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

abstract contract ERC1155DefaultApproval is ERC1155 {
    mapping(address => bool) private defaultApprovals;

    event DefaultApproval(address indexed operator, bool isAuthorized);

    function _setDefaultApproval(address operator, bool isAuthorized) internal {
        defaultApprovals[operator] = isAuthorized;

        emit DefaultApproval(operator, isAuthorized);
    }

    function isApprovedForAll(address _owner, address _operator)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            defaultApprovals[_operator] ||
            super.isApprovedForAll(_owner, _operator);
    }
}
