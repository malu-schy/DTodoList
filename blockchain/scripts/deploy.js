const hre = require("hardhat");

async function main() {

  const Todolist = await hre.ethers.getContractFactory("Todolist");
  const todo = await Todolist.deploy("Walk the Doggo");

  await todo.deployed();

  console.log("Todolist deployed to:", todo.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
