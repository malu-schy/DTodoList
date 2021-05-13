import React from "react";
import Todoliste from '../artifacts/contracts/Todolist.sol/Todolist.json'
import { useState } from 'react';
import { ethers } from 'ethers';

const todoListAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

 function TodolistComponent () {
    const todoListe =  []; 
    const [outputText, setOutputText] = useState([]);
    const [todo, setNewTodo] = useState('');

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
  
    async function fetchTodos() {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const contract = new ethers.Contract(todoListAddress, Todoliste.abi, provider)
          try {
            const todoListLength = await contract.getTodoListLength();
            for(var i = 0; i < todoListLength; i++){
              const data = await contract.getTodoItem(i)
              // const data = await contract.getTodoItem(i)
              todoListe.push(data);
              console.log(data);
            }
            // const data = await contract.getTodoItem(3)
            // console.log("TodoListe hat: " + todoListLength + " Einträge");
            console.log(todoListe);
            setOutputText(todoListe);
          } catch (err) {
            console.log("Oh no Error: ", err)
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

      function deleteTodo(){
        console.log("Ich bin gelöscht");
      }

    return (
        <div className="App">
        <h1> Decentralized TodoList 💫 </h1> 
            <div className="TodolistInput">
                <input onChange={e => setNewTodo(e.target.value)} placeholder="Hello" />
                <button onClick={setTodo}>Add Todo</button>
                <button onClick={fetchTodos}>Refresh TodoList</button>
            </div>   
            <div className="TodolistOutput">
              <label>Your Todos:</label>
              {outputText.map((item, _key) => {
              return <div className="todoItem" key={_key}>
                    {
                     <input type="checkbox" onChange={deleteTodo}></input>
                     /* the following will remove qoutes from string: (Thank you Stackoverlow :D <3)
                     replace(/^"(.+(?="$))"$/, '$1') */ }
                      {JSON.stringify(item).replace(/^"(.+(?="$))"$/, '$1')}
                     </div>
                    })
                 }
              </div>
       </div>
    );
}

export default TodolistComponent;