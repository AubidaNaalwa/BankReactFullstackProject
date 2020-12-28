import React, { Component } from 'react';

class Categories extends Component {

    redusceForCategories = () => {
        const results = this.props.transactions.reduce(function (r, a) {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a);
            return r;
        }, Object.create(null));
        const keys = Object.keys(results)
        const newResults = []
        for (let i of keys) {
            let sum = 0
            for (let v of results[i])
                sum += v.type === "deposite" ? v.amount : v.amount * (-1)
            newResults.push({ category: i, sum, type: (sum > 0 ? "deposite" : "withDorw") })
        }
        return newResults
    }

    renderCategories = (v) => {
        return (
            <div className={v.type + " transaction"}>
                <div className="amount">{v.category}</div>
                <div></div>
                <div></div>
                <div className="category">{v.sum}</div>
            </div>
        )
    }

    render() {
        const categories = this.redusceForCategories()
        return (
            <div id="transactionTable">
                <div className="transaction">
                    <div className="amount">Category</div>
                    <div></div>
                    <div></div>
                    <div className="vendor">Total</div>
                </div>
                {categories.map(v => this.renderCategories(v))}
            </div>
        )
    }
}

export default Categories;