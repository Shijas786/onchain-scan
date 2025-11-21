# Deployment Instructions

## Prerequisites
- [Foundry](https://book.getfoundry.sh/getting-started/installation) or [Hardhat](https://hardhat.org/) installed.
- A wallet with Base Mainnet ETH (or Base Sepolia ETH for testing).
- An RPC URL for Base.

## Deploying with Foundry (Recommended)

1. **Install Foundry** (if not already installed):
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

2. **Navigate to the project root** and create a `foundry.toml` if needed, or just use `forge create`.

3. **Deploy the Contract**:
   Replace `<YOUR_PRIVATE_KEY>` and `<RPC_URL>` with your actual values.

   **Base Mainnet:**
   ```bash
   forge create --rpc-url https://mainnet.base.org --private-key <YOUR_PRIVATE_KEY> src/contracts/OnchainScore.sol:OnchainScore
   ```

   **Base Sepolia:**
   ```bash
   forge create --rpc-url https://sepolia.base.org --private-key <YOUR_PRIVATE_KEY> src/contracts/OnchainScore.sol:OnchainScore
   ```

4. **Verify Contract (Optional but Recommended)**:
   Add `--verify --etherscan-api-key <BASESCAN_API_KEY>` to the command above.

5. **Update the Frontend**:
   - Copy the deployed contract address.
   - Open `src/lib/abi.ts`.
   - Update `CONTRACT_ADDRESS` with the new address.
   - Commit and push the changes.

## Deploying with Remix (Browser)

1. Go to [Remix IDE](https://remix.ethereum.org/).
2. Create a new file `OnchainScore.sol`.
3. Copy the content from `src/contracts/OnchainScore.sol`.
4. Compile the contract (Solidity Compiler tab).
5. Go to "Deploy & Run Transactions".
6. Select "Injected Provider - MetaMask" (ensure you are on Base network).
7. Click "Deploy".
8. Copy the address and update `src/lib/abi.ts`.
