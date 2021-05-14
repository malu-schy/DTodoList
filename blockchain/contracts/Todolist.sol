//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;
import "hardhat/console.sol";

contract Todolist {
    TodoItem[] public todos;
    string todo1;

    struct TodoItem {
        uint256 id;
        string text;
        bool closed;
    }

    uint256 public todoCount;

    constructor(string memory _todo) {
        todoCount = 0;
        console.log("Deploying a TodoList with greeting:", _todo);
        todo1 = _todo;
        todos.push(TodoItem(0, "hello Hardhat", true));
        // todos.push(TodoItem(1,"hello Lalalal"));
        // todos.push(TodoItem(2,"hello Solidity"));
        // getTodoListLength();
        // getTodoItem(0);
    }

    function getTodoListLength() public view returns (uint256) {
        console.log("Array hat eine Laenge von: ", todos.length);
        return todos.length;
    }

    function getTodoItem(uint256 _id) public view returns (string memory) {
        return todos[_id].text;
    }

    function isTodoClosed(uint256 _id) public view returns (bool) {
        // if(todos[_id].closed == false){
        //   return 0;
        // } else {
        //   return 1;
        // }
        return todos[_id].closed;
    }

    // function getAllElementsOfArray() public view returns(TodoItem[] memory){
    //   return todos;
    // }

    // function todo(uint _id) public view returns (string memory) {
    //  string memory textItem;
    //   for (uint i = 0; i <= todos.length; i++) {
    //       if(_id == todos[i].id){
    //         textItem = todos[i].text;
    //         // textItem = "Aloha";
    //           console.log(textItem);
    //       }
    //   } return textItem;
    // }

    // function todo() public view returns (string memory) {
    //   for (uint i = 0; i <= todos.length; i++) {
    //       console.log("toodooo1 ", todo1);
    //   }
    //   return todo1;
    // }

    function createTodo(string memory _todo) public {
        console.log("extend todolist with: ", _todo);
        TodoItem memory newTodoItem;
        newTodoItem.id = todos.length - 1;
        newTodoItem.text = _todo;
        newTodoItem.closed = false;
        todos.push(newTodoItem);
    }

    function toggleTodo(uint256 _id) public {
        todos[_id].closed = !todos[_id].closed;
    }

    function deleteTodo(string memory _todo) public {
        console.log("delete TODO");
    }
}
