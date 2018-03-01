// HEADER
const Header = (props) => {
   return (
      <div>
         <h1>{props.title}</h1>
         <h2>{props.subtitle}</h2>
      </div>
   )
}

Header.defaultProps = {
   title: 'Indecision'
}

// ACTION
const Action = (props) => {
   return (
      <div>
         <button 
            onClick={props.handleDecision}
            disabled={props.hasOptions}
         >
            What should I do?
         </button>
         {props.decision && <p>You should do: {props.decision}</p>}
      </div>
   )
}

// OPTIONS
const Options = (props) => {
   const options = props.options.map((option, index) => (
      <Option 
         key={index}
         option={option}
         removeOption={props.removeOption}
      />
   ))
   return (
      <div>
         <button onClick={props.removeAllOptions}>Remove All</button>
         <p>Your options:</p>
         {options}
      </div>
   )
}

// OPTION
const Option = (props) => {
   return (
      <div>
         <p key={props.key}>
            {props.option}
            <button onClick={(e) => props.removeOption(props.option)}>Remove</button>
         </p>
      </div>
   )
}

// ADDOPTION
class AddOption extends React.Component {
   constructor(props) {
      super(props);
      this.addOption = this.addOption.bind(this)
      this.state = {
         error: undefined
      }
   }
   addOption(e) {
      e.preventDefault();
      const errorMessage = this.props.addOption(e.target.elements.option.value.trim());
      if(errorMessage) {
         this.setState(() => ({error: errorMessage}))
      }
      if(!errorMessage && this.state.error) {
         this.setState(() => ({error: undefined}))
      }
      e.target.elements.option.value = ''
   }
   render() {
      return (
         <div>
            <form onSubmit={this.addOption}>
               <input type="text" name="option" />
               <button>Add Option</button>
            </form>
            {this.state.error && <p>{this.state.error}</p>}
         </div>
      )
   }
};

// APP
class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         subtitle: 'Put your life decisions in the hands of your computer.',
         options: props.options,
         decision: ''
      }
      this.removeOption = this.removeOption.bind(this);
      this.removeAllOptions = this.removeAllOptions.bind(this);
      this.addOption = this.addOption.bind(this);
      this.handleDecision = this.handleDecision.bind(this);
   }
   componentDidMount() {
      try {
         const options = localStorage.getItem('options');
         if(options) {
            this.setState(() => ({options: JSON.parse(options)}));
         }
      } catch (e) {
         //sample text
      }
   }
   componentDidUpdate(prevProps, prevState) {
      if(prevState.options.length !== this.state.options.length) {
         localStorage.setItem('options', JSON.stringify(this.state.options) )
      }
   }
   removeAllOptions() {
      this.setState(()=> ({options: []}));
   }
   removeOption(optionToRemove) {
      this.setState((state) => ({
         options: state.options.filter(option => option !== optionToRemove)
      }));
   }
   addOption(newOption) {
      if(!newOption) {
         return 'Please enter a valid input'
      } else if(this.state.options.indexOf(newOption) !== -1) {
         return 'This option already exists.'
      }
      this.setState((currentState) => ({
         options: currentState.options.concat([newOption])
      }))
   }
   handleDecision() {
      const randomIndex = Math.floor(Math.random() * this.state.options.length);
      this.setState((currentState) => ({decision: currentState.options[randomIndex]}));
   }
   render() {
      return (
         <div>
            <Header subtitle={this.state.subtitle} />
            <Action 
               hasOptions={this.state.options.length < 2}
               handleDecision={this.handleDecision}
               decision={this.state.decision}
            />
            <Options 
               options={this.state.options}
               removeAllOptions={this.removeAllOptions}
               removeOption={this.removeOption}
            />
            <AddOption addOption={this.addOption} />
         </div>
      )
   }
}

App.defaultProps = {
   options: []
}

ReactDOM.render(<App />, document.getElementById('app'));