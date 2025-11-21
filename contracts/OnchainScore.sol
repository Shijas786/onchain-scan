// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title OnchainScore
 * @dev Simple contract to store user scores on Base.
 */
contract OnchainScore {
    // Mapping from user address to their score
    mapping(address => uint256) public scores;

    // Event emitted when a score is updated
    event ScoreUpdated(address indexed user, uint256 newScore);

    /**
     * @notice Updates the score for the caller.
     * @param newScore The new score to set.
     */
    function updateScore(uint256 newScore) external {
        scores[msg.sender] = newScore;
        emit ScoreUpdated(msg.sender, newScore);
    }
}
