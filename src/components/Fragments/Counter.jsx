import React from "react";

class Counter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            count: 0
        };
        console.log("constructor")
    }

    componentDidMount() {
        console.log("componentDidMount");
        if (this.state.count === 10) {
            this.setState({count: 5})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate")
    }
    render () {
        return (
        <div className="flex items-center">
            <h1 mr-5>{this.state.count}</h1>
            <button 
            className="bg-black text-white p-3"
            onClick={() => this.setState({count: this.state.count + 1})}
            >
            +
            </button>
            {console.log("render")}
        </div>
        )
    };
};

export default Counter