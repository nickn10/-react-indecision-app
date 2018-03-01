import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         subtitle: 'Put your life decisions in the hands of your computer.',
         options: props.options,
         selectedOption: undefined
      }
      this.removeAllOptions = () => {
         this.setState(() => ({options: []}));
      }
      this.addOption = (newOption) => {
         if (!newOption) {
            return 'Please enter a valid input'
         } else if (this.state.options.indexOf(newOption) !== -1) {
            return 'This option already exists.'
         }
         this.setState((currentState) => ({
            options: currentState.options.concat([newOption])
         }))
      }
      this.handleDecision = () => {
         const randomIndex = Math.floor(Math.random() * this.state.options.length);
         this.setState((currentState) => ({ selectedOption: currentState.options[randomIndex] }));
      }
      this.removeOption = (optionToRemove) => {
         this.setState((state) => ({
            options: state.options.filter(option => option !== optionToRemove)
         }));
      }
      this.closeModal = () => {
         this.setState(() => ({selectedOption: undefined}));
      }
      // this.addOption = this.addOption.bind(this);
      // this.handleDecision = this.handleDecision.bind(this);
      // this.removeOption = this.removeOption.bind(this);
   }
   componentDidMount() {
      try {
         const options = localStorage.getItem('options');
         if (options) {
            this.setState(() => ({ options: JSON.parse(options) }));
         }
      } catch (e) {
         //sample text
      }
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
         localStorage.setItem('options', JSON.stringify(this.state.options))
      }
   }
   // removeAllOptions() {
   //    this.setState(() => ({ options: [] }));
   // }
   // removeOption(optionToRemove) {
   //    this.setState((state) => ({
   //       options: state.options.filter(option => option !== optionToRemove)
   //    }));
   // }
   // addOption(newOption) {
   //    if (!newOption) {
   //       return 'Please enter a valid input'
   //    } else if (this.state.options.indexOf(newOption) !== -1) {
   //       return 'This option already exists.'
   //    }
   //    this.setState((currentState) => ({
   //       options: currentState.options.concat([newOption])
   //    }))
   // }
   // handleDecision() {
   //    const randomIndex = Math.floor(Math.random() * this.state.options.length);
   //    this.setState((currentState) => ({ decision: currentState.options[randomIndex] }));
   // }
   render() {
      return (
         <div>
            <Header subtitle={this.state.subtitle} />
            <div className="container">
               <Action
                  hasOptions={this.state.options.length < 2}
                  handleDecision={this.handleDecision}
                  decision={this.state.decision}
               />
               <div className="widget">
                  <Options
                     options={this.state.options}
                     removeAllOptions={this.removeAllOptions}
                     removeOption={this.removeOption}
                  />
                  <AddOption addOption={this.addOption} />
               </div>
            </div>
            <OptionModal 
               selectedOption={this.state.selectedOption}
               closeModal={this.closeModal}
            />
         </div>
      )
   }
}

App.defaultProps = {
   options: []
}