// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./PriceConverter.sol";

contract Counter {
    using PriceConverter for uint256;
    int256 public count;
    uint256 public constant MINIMUMUSD = 1 * 1e18;
    address[] public funders;
    address public immutable owner;

    modifier firstNeed() {
        require(securityCheck(msg.sender), "Please charge the contract.");
        require(count != 0, "Please increase or decrease the count first.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function fundMe() public payable {
        require(
            msg.value.getConversionRate() >= MINIMUMUSD,
            "Didn't send enouph ETH!"
        );
        funders.push(msg.sender);
    }

    // function to increament count by 1
    function increaseByOne() public {
        count += 1;
    }

    // function to decreament count by 1
    function decreaseByOne() public {
        count -= 1;
    }

    // function to increament count by given number
    function increase(int256 _elevator) public {
        count += _elevator;
    }

    // function to decreament count by given number
    function decrease(int256 _reducer) public firstNeed {
        count -= _reducer;
    }

    // function to multiply count by given number
    function multiply(int256 _modulus) public firstNeed {
        count *= _modulus;
    }

    // function to divide count by given number
    function divide(int256 _div) public firstNeed {
        count /= _div;
    }

    function securityCheck(address name) internal view returns (bool) {
        for (uint256 data = 0; data < funders.length; data++) {
            if (funders[data] == name) {
                return true;
            }
        }
        return false;
    }
}
