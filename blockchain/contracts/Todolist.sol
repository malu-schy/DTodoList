//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;
import "hardhat/console.sol";

contract Todolist{
  string[] todos; 
  string todo1;

  constructor(string memory _todo) {
    console.log("Deploying a TodoList with greeting:", _todo);
    todo1 = _todo;
  }


  function todo() public view returns (string[] memory) {
    return todos;
  }

  function setTodo(string memory _todo) public {
    console.log("extend todolist with: ", _todo);
    todos.push(_todo);
  }
    // function testfunction() public view returns (uint){
    //   return 1; 
    // }

}