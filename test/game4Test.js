const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signer0 = ethers.provider.getSigner(0); // this will win
    const signer1 = ethers.provider.getSigner(1); // this will write

    const addr0 = await signer0.getAddress(); // winner
    const addr1 = await signer1.getAddress(); // helper

    return { game, signer0, signer1, addr0, addr1 };
  }

  it('should be a winner', async function () {
    const { game, signer0, signer1, addr0 } = await loadFixture(deployContractAndSetVariables);

    // signer1 writes to addr0 (winner)
    await game.connect(signer1).write(addr0); // sets nested[addr0][signer1] = true

    // signer0 (winner) now calls win(signer1)
    await game.connect(signer0).win(await signer1.getAddress()); // checks nested[signer0][signer1]

    // Success condition
    assert(await game.isWon(), 'You did not win the game');
  });
});
