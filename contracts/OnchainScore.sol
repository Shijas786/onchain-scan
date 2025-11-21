// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OnchainScore {
    mapping(address => uint256) public scores;

    event ScoreUpdated(address indexed user, uint256 newScore);

    function updateScore(uint256 newScore) external {
        scores[msg.sender] = newScore;
        emit ScoreUpdated(msg.sender, newScore);
    }

    function getScore(address user) external view returns (uint256) {
        return scores[user];
    }
}
