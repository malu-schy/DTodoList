const { expect } = require("chai");

describe("Todo", function() {
  it("Should return the new todo once it's changed", async function() {
    const Todolist = await ethers.getContractFactory("Todolist");
    const _todo = await Todolist.deploy("Walk The Doggo!");
    
    await _todo.deployed();
    expect(await _todo.todo()).to.equal("Walk The Doggo!");

    await _todo.setTodo("Drink More Water!");
    expect(await _todo.todo()).to.equal("Drink More Water!");
  });
});
