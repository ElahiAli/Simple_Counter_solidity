const { ethers, constants } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
// const mockV3Aggregator = require("@chainlink/contracts/src/v0.8/tests/MockV3Aggregator.sol");

async function main() {
  // let sendValue = ethers.utils.parseEther("1");

  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = fs.readFileSync("./Counter_sol_Counter.abi", "utf8");
  const binary = fs.readFileSync("./Counter_sol_Counter.bin", "utf8");

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying...");

  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  await contract.deployed();

  // const mockV3Aggregator = ethers.getCon
  console.log(`Contract Address: ${contract.address}`);

  //intracting
  const count = await contract.count();
  console.log(`count: ${count}`);

  const increaseOne = await contract.increaseByOne();
  await increaseOne.wait(1);

  const count_updated = await contract.count();
  console.log(`count updated: ${count_updated}`);

  // const fund = await contract.fundMe({
  //   value: sendValue,
  //   gasLimit: 1000000,
  //   gasPrice: 20000000000,
  // });
  // await fund.wait(1);

  const increase = await contract.increase("10");
  await increase.wait(1);
  const count_sc_updated = await contract.count();
  console.log(`count second time updated: ${count_sc_updated}`);

  // const decrease = await contract.decrease("5", {
  //   gasLimit: 1000000,
  //   gasPrice: 20000000000,
  // });
  // await decrease.wait(1);
  // const count_th_updated = await contract.count();
  // console.log(`count thired time updated: ${count_th_updated}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
