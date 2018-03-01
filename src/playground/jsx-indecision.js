console.log('App is running');
const app = {
   title: 'Indecision App',
   subtitle: 'Why NOT automate desicion making',
   options: [],
   decision: ''
};

const addOption = (e) => {
   e.preventDefault();
   const option = e.target.elements.option.value;
   if (option) {
      app.options.push(option);
      e.target.elements.option.value = '';
   }
   renderApp()
}

const removeAllOptions = () => {
   if (app.options.length > 0) {
      app.options = [];
      renderApp();
   }
}

const makeDecision = () => {
   const randomIndex = Math.floor(Math.random() * app.options.length);
   app.decision = app.options[randomIndex];
   console.log(randomIndex);
   renderApp();
}
const renderApp = () => {
   const template = (
      <div>
         <h1>{app.title}</h1>
         {app.subtitle && <p>{app.subtitle}</p>}
         <p>{app.options.length > 0 ? "These are your options:" : "No available options"}</p>
         <button disabled={app.options.length < 2} onClick={makeDecision}>Choose Option</button>
         <button onClick={removeAllOptions}>Remove All</button>
         <ol>
            {app.options.map((option, index) => <li key={index}>{option}</li>)}
         </ol>
         {app.decision && <p>You should do: {app.decision}</p>}
         <form onSubmit={addOption}>
            <input type="text" name="option" />
            <button>Add Option</button>
         </form>
      </div>
   );

   ReactDOM.render(template, document.getElementById('app'));
}

renderApp();