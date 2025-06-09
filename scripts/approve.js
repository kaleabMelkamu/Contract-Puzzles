function approve(contract, arbiterSigner) {
    return contract.connect(arbiterSigner).approve();
}

module.exports = approve;