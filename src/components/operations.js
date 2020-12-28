import React, { Component } from 'react';
const axios = require('axios')

class Operations extends Component{
    constructor(){
        super()
        this.state={
            amount :null,
            vendor:'',
            category:''
        }
    }

    updateFields = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    makeTransaction = async (e) => {
        if(!this.state.amount || !this.state.vendor || !this.state.category){
            return
        }
        axios.post('http://localhost:8080/transaction', {
            transaction:{
                amount:this.state.amount,
                vendor:this.state.vendor,
                category:this.state.category,
                type:e.target.name
            }
          })
          .then( () =>{
                this.setState({
                    amount :0,
                    vendor:"",
                    category:""
                })
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        return(
            <div id="container">
                   <input type="Number" name ="amount" placeholder ="Amount" value={this.state.amount || 0} onChange ={ this.updateFields }/>
                   <input type="text" placeholder ="Vendor" name ="vendor" value={this.state.vendor || ""} onChange ={this.updateFields}/>
                   <input type="text" placeholder ="Category" name ="category" value={this.state.category|| ""} onChange ={this.updateFields}/>
                    <div id="buttons">
                    <button name = "deposite" onClick ={this.makeTransaction}>Deposite</button>
                   <button  name = "withDorw"  onClick ={this.makeTransaction}>WithDrow</button>
                    </div>
            </div>
        )
    }
}

export default Operations;