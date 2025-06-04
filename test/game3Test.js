const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    const signer0 = ethers.provider.getSigner(0); // low
    const signer1 = ethers.provider.getSigner(1); // mid
    const signer2 = ethers.provider.getSigner(2); // high

    const addr0 = await signer0.getAddress();
    const addr1 = await signer1.getAddress();
    const addr2 = await signer2.getAddress();

    return { game, signer0, signer1, signer2, addr0, addr1, addr2 };
  }

  it('should be a winner', async function () {
    const { game, signer0, signer1, signer2, addr0, addr1, addr2 } = await loadFixture(deployContractAndSetVariables);

    // LOW balance
    await game.connect(signer0).buy({ value: ethers.utils.parseEther("1") });

    // MID balance
    await game.connect(signer1).buy({ value: ethers.utils.parseEther("2") });

    // HIGH balance
    await game.connect(signer2).buy({ value: ethers.utils.parseEther("3") });

    // Must be: win(mid, high, low)
    await game.win(addr1, addr2, addr0);

    assert(await game.isWon(), 'You did not win the game');
  });
});
