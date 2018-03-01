import React, {Component} from 'react';

export default class AddOption extends Component {
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
      if (errorMessage) {
         this.setState(() => ({ error: errorMessage }))
      }
      if (!errorMessage && this.state.error) {
         this.setState(() => ({ error: undefined }))
      }
      e.target.elements.option.value = ''
   }
   render() {
      return (
         <div>
            {this.state.error && <p className="widget__message">{this.state.error}</p>}
            <form className="add-option" onSubmit={this.addOption}>
               <input className="add-option__input"type="text" name="option" />
               <button className="button">Add Option</button>
            </form>
         </div>
      )
   }
};
