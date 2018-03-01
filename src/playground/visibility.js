class Visibility extends React.Component {
   constructor(props) {
      super(props);
      this.toggleVisibility = this.toggleVisibility.bind(this);
      this.state = {
         visible: false
      }
   }
   toggleVisibility() {
      this.setState((currentState) => {
        return {
            visible: !currentState.visible
        }
      });
   }
   render() {
      return (
         <div>
            <h1>Visibility</h1>
            <button onClick={this.toggleVisibility}>{this.state.visible ? 'Hide Details' : 'Show Details'}</button>
            {this.state.visible && <p>Hey. These are some details you can see!</p>}
         </div>
      )
   }
}

ReactDOM.render(<Visibility/>, document.getElementById('app'));

// let visible = false;

// const toggleVisibility = () => {
//    visible = !visible
//    renderApp();
// }

// const renderApp = () => {
//    const template = (
//       <div>
//          <h1>Visiblity Toggle</h1>
//          <button onClick={toggleVisibility}>{visible ? 'Hide Details' : 'Show Details'}</button>
//          {visible && <p>Hey. These are some details you can see!</p>}
//       </div>
//    );

//    ReactDOM.render(template, document.getElementById('app'));
// }

// renderApp()