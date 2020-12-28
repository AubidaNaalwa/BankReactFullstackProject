import React, { Component } from 'react';



class Transactions extends Component {

    deleteTransaction = (id) => {
        this.props.deleteTransaction(id)
    }

    crreateTransaction = (v) => {
        return (
            <div key={v._id} className={v.type + " transaction"}>
                <div className={" amount"}>{v.type === "deposite" ? v.amount : v.amount*(-1)}</div>
                <div className="vendor">{v.vendor}</div>
                <div className="category">{v.category}</div>
                <div className="btn" onClick={() => this.deleteTransaction(v._id)}>delete</div>
            </div>
        )
    }


    createTable = () => {
        return (
            <div className="transaction">
                <div className="amount">Amount</div>
                <div className="vendor">Vendor</div>
                <div className="category">Category</div>
                 
            </div>
        )
    }

    render() {
        return (
            <div id="transactionTable">
                {this.props.transactions.length > 0 && this.createTable()}
                {this.props.transactions.map(v => this.crreateTransaction(v))}
            </div>
        )
    }
}

export default Transactions;