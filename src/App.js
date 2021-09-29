import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Operations from './components/operations'
import Transactions from './components/Transactions'
import Categories from './components/categories'
import './App.css'
const axios = require('axios')

class App extends Component {
    constructor(){
        super()
        this.state = {
            transactions:[]
        }
    }

    Home() {
        return (
            <div id ="home">
            <h1>BankIt bank</h1>
            <h1>The best bank in the world </h1>
         </div>
        )
    }

    calculateBudget =()=>{
        let sum = 0
        for(let v of this.state.transactions){
            sum += v.type === "deposite" ? v.amount : v.amount*(-1)
        }
        return sum
    }

    navBar() {
        return (
            <div id="nav">
                <ul>
                    <li><a className="active" href="/">Home</a></li>
                    <li><a href="/operations">Operations</a></li>
                    <li><a href="/transactions">Transactions</a></li>
                    <li><a href="/categories">Categories</a></li>
                    <li className="right">BankIt</li>
                    <li className="right">Budget : {this.calculateBudget()}$</li>
                </ul>
            </div>
        )
    }

    getTransactionsFromServer = async () => {
        const transaction = await axios.get("http://localhost:8080/transactions")
        this.setState({
            transactions: transaction.data
        })
    }
    
    async componentDidMount() {
       await this.getTransactionsFromServer()
    }

    deleteTransaction = async (id)=> {
        await axios.delete('http://localhost:8080/transaction', { data :{id } })
        await this.getTransactionsFromServer()
    }

    render() {
        return (
            <Router>
                {this.navBar()}
                <div id="Links">
                    <Route exact path='/operations' render={() => <Operations makeTransaction ={this.makeTransaction} getTransactionsFromServer={this.getTransactionsFromServer}/>} />
                    <Route exact path='/transactions'  render ={() => <Transactions transactions ={this.state.transactions} deleteTransaction ={this.deleteTransaction}/>}></Route>
                    <Route exact path='/categories'  render ={() => <Categories transactions ={this.state.transactions}/>}></Route>
                    <Route exact path='/' render={() => this.Home()} ></Route>
                </div>
            </Router>
        );
    }
}

export default App;