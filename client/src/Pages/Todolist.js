import * as React from "react";
import { ethers } from "ethers";
import Todoliste from "../artifacts/contracts/Todolist.sol/Todolist.json";

const todoListAddress = process.env.REACT_APP_ADDRESS;

function TodolistComponent() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [refresh, setRefresh] = React.useState(0);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  
  async function fetchTodos() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        todoListAddress,
        Todoliste.abi,
        provider
      );
      try {
        const todoListLength = await contract.getTodoListLength();
        const list = [];
        for (var i = 0; i < todoListLength; i++) {
          const text = await contract.getTodoItem(i);
          const closed = await contract.isTodoClosed(i);
          list.push({ text, closed });
        }
        setTodos(list);
      } catch (err) {
        console.log("Oh no Error: ", err);
      }
    }
  }

  async function createTodo() {
    if (!todo) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        todoListAddress,
        Todoliste.abi,
        signer
      );
      const transaction = await contract.createTodo(todo);
      await transaction.wait();
      setRefresh(refresh + 1);
    }
  }

  async function toggleTodo(id) {
    if (!todo) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        todoListAddress,
        Todoliste.abi,
        signer
      );
      const transaction = await contract.toggleTodo(id);
      await transaction.wait();
      setRefresh(refresh + 1);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => fetchTodos(), [refresh]);

  return (
    <div className="App">
      <h1> Decentralized TodoList 💫 </h1>
      <div className="TodolistInput">
        <input
          onChange={(e) => setTodo(e.target.value)}
          placeholder="New Todo Name"
          value={todo}
        />
        <button onClick={createTodo}>Add Todo</button>
        <button onClick={fetchTodos}>Refresh TodoList</button>
      </div>
      <div className="TodolistOutput">
        <label>Your Todos:</label>
        {todos.map((item, _key) => {
          return (
            <div className="todoItem" key={_key}>
              {
                <input type="checkbox" onChange={() => toggleTodo(_key)} checked={item.closed}></input>
                /* the following will remove qoutes from string: (Thank you Stackoverlow :D <3)
                     replace(/^"(.+(?="$))"$/, '$1') */
              }
              {JSON.stringify(item.text).replace(/^"(.+(?="$))"$/, "$1")}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodolistComponent;
