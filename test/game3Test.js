const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signer };
  }
  // this test is a bit different than the others
  // it requires you to update the `balances` mapping in the Contract
  // to win this stage
  // you can do this by calling the `buy` function with a value of 1
  // and then calling the `win` function with the correct arguments
  // the `win` function expects three arguments:
  // 1. the address of the signer
  // 2. the value of the `balances` mapping for that signer
  // 3. the signature of the signer
  // you can get the signature by calling `signer.signMessage` with the address and value




  // the `balances` mapping is a mapping of addresses to uint256 values
  // you can update the `balances` mapping by calling the `buy` function
  // with a value of 1
  // this will update the `balances` mapping for the signer to 1
  // then you can call the `win` function with the correct arguments
  // the `win` function expects three arguments:

  it('should be a winner', async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(signer).buy({ value: '1' });
    const address = await signer.getAddress();
    const balance = await game.balances(address); 
    const signature = await signer.signMessage(ethers.utils.arrayify(balance));
    await game.connect(signer).win(address, balance, signature);
    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
