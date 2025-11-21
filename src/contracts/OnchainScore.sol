// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title OnchainScore
 * @dev Contract to store user scores on Base with leaderboard support.
 */
contract OnchainScore {
    mapping(address => uint256) public scores;
    address[] public userList;
    mapping(address => bool) public hasScore;

    event ScoreUpdated(address indexed user, uint256 newScore);

    function updateScore(uint256 newScore) external {
        scores[msg.sender] = newScore;
        
        if (!hasScore[msg.sender]) {
            userList.push(msg.sender);
            hasScore[msg.sender] = true;
        }
        
        emit ScoreUpdated(msg.sender, newScore);
    }

    function getUserCount() external view returns (uint256) {
        return userList.length;
    }

    function getAllScores() external view returns (address[] memory, uint256[] memory) {
        uint256 count = userList.length;
        address[] memory addresses = new address[](count);
        uint256[] memory userScores = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            addresses[i] = userList[i];
            userScores[i] = scores[userList[i]];
        }

        return (addresses, userScores);
    }
}
