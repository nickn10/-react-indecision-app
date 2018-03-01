class Counter extends React.Component {
   constructor(props) {
      super(props);
      this.handleAddOne = this.handleAddOne.bind(this);
      this.handleMinusOne = this.handleMinusOne.bind(this);
      this.handleReset = this.handleReset.bind(this);
      
      this.state =  {
         count: props.count
      }
   }
   handleAddOne() {
      this.setState((currentState) => {
         return {
            count: currentState.count + 1
         }
      });
   }
   handleMinusOne() {
      this.setState((currentState) => {
         return {
            count: currentState.count - 1
         }
      });
   }
   handleReset() {
      this.setState((currentState) => {
         return {
            count: 0
         }
      });
   }

   render() {
      return (
         <div>
            <h1>Count: {this.state.count}</h1>
            <button onClick={this.handleAddOne}>Plus 1</button>
            <button onClick={this.handleMinusOne}>Minus 1</button>
            <button onClick={this.handleReset}>Reset</button>
         </div>
      )
   }
}
Counter.defaultProps = {
   counter: 0
}

ReactDOM.render(<Counter />, document.getElementById('app'));

// let count = 0;
// const addOne = () => {
//    count++;
//    renderCounterApp();
// }
// const minusOne = () => {
//    count--;
//    renderCounterApp();
// }
// const resetCount = () => {
//    count = 0;
//    renderCounterApp();
// }

// // JSX - JavaScript XML
// const renderCounterApp = () => {
//    const templateTwo = (
//       <div>
//          <h1>Count: {count}</h1>
//          <button onClick={addOne}>Plus 1</button>
//          <button onClick={minusOne}>Minus 1</button>
//          <button onClick={resetCount}>Reset</button>
//       </div>
//    );
//    ReactDOM.render(templateTwo, document.getElementById('app'));
// }

// renderCounterApp();