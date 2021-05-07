import React from "react";
import Todoliste from '../artifacts/contracts/Todolist.sol/Todolist.json'
import { useState } from 'react';
import { ethers } from 'ethers';

const todoListAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

 function TodolistComponent () {

    const [outputText, setOutputText] = useState('');
    const [todo, setNewTodo] = useState('');

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }

    async function fetchTodos() {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const contract = new ethers.Contract(todoListAddress, Todoliste.abi, provider)
          try {
            const data = await contract.todo()
            setOutputText(data);
          } catch (err) {
            console.log("Error: ", err)
          }
        }    
      }
    

      async function setTodo() {
        if (!todo) return
        if (typeof window.ethereum !== 'undefined') {
          await requestAccount()
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner()
          const contract = new ethers.Contract(todoListAddress, Todoliste.abi, signer)
          const transaction = await contract.setTodo(todo)
          await transaction.wait()
          fetchTodos()
        }
      }

    return (
        <div className="App">
        <h1> Decentralized TodoList 💫 </h1> 
            <div className="TodolistInput">
                <input onChange={e => setNewTodo(e.target.value)} placeholder="Hello" />
                <button onClick={setTodo}>Add Todo</button>
                <button onClick={fetchTodos}>Refresh TodoList</button>
                <div className="TodolistOutput">
                <label>Your Todos:</label>
                <pre>{JSON.stringify(outputText, null, 2)}</pre>
                </div>             
            </div>
       </div>
    );
}

export default TodolistComponent;