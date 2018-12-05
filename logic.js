class App extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this),
            this.state = {
                activities: [],
                key: 0
            }
    }
    select() {
        this.state.activities.push(<li id="tasks" key={this.state.key + 1}>{this.textInput.value} on {this.day.value}/{this.month.value}/{this.year.value}</li>)
        this.setState({
            activities: this.state.activities,
            key: this.state.key + 1
        })
    }

    renderOptions(arr) {
        return arr.map(x => <option key={x} value={x}>{x}</option>);
        }

    render() {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days = [];
        var years = [];
        
        for (var i = 1; i <= 31; i++) {
            days.push(i)
        }
        for (var i = 2018; i <= 2030; i++) {
            years.push(i)
        }

        var dateUtils = {
            days : days,
            months : months,
            years : years
        }

        return (
            <div>
                <Title/>
                <input id="inputTask" type='text' placeholder="Write your task here" ref={(input) => { this.textInput = input; }} />
                <div id="selectDate">Select the date :</div>
                <select ref={(input) => { this.day = input; }}>
                    {this.renderOptions(dateUtils.days)}
                </select>
                <select ref={(input) => { this.month = input; }}>
                    {this.renderOptions(dateUtils.months)}
                </select>
                <select ref={(input) => { this.year = input; }}>
                    {this.renderOptions(dateUtils.years)}
                </select>
                <button id="add" onClick={this.select}>New task</button><br />
                <ul>
                    {this.state.activities}
                </ul>
            </div>

        )
    }
}

class Title extends React.Component {

    render(){
        return <div>
                 <img id="logo" src="./images/logo.png"/>
                 <h1>TUDO BOM</h1>
               </div>
    }
}

function render() {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}
render();