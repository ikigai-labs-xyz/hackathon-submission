# Subgraph

## Commands

```shell
graph init \
  --product subgraph-studio \
  --from-contract 0xa3b1ed01730fbefb4ae0b33456ae59c8192ac5cb \
  --network sepolia \
  --abi ../smart-contracts/artifacts/contracts/core/SmartContractNFT.sol/SmartContractNFT.json \
  turtleshell
```

```shell
graph auth --studio

cd subgraph

yarn deploy
```
