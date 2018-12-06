class App extends React.Component {
  constructor(props) {
    super(props);
    (this.addTask = this.addTask.bind(this)),
      (this.state = {
        activities: [],
        key: 0
      });
  }
  addTask() {
    this.state.activities.push(
      <li id="tasks" key={this.state.key + 1}>
        {this.textInput.value} on{" "}
        <u>
          {this.day.value}/{this.month.value}/{this.year.value}
        </u>
        <ButtonList bgColor="red" img="delete" />
        <ButtonList bgColor="green" img="star" />
        <ButtonList bgColor="blue" img="checked" />
      </li>
    );
    this.setState({
      activities: this.state.activities,
      key: this.state.key + 1
    });
    this.textInput.value = "";
  }

  renderOptions(arr) {
    return arr.map(x => (
      <option key={x} value={x}>
        {x}
      </option>
    ));
  }

  render() {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var days = [];
    var years = [];

    for (var i = 1; i <= 31; i++) {
      days.push(i);
    }
    for (var i = 2018; i <= 2030; i++) {
      years.push(i);
    }

    var dateUtils = {
      days: days,
      months: months,
      years: years
    };

    return (
      <div>
        <Title />
        <input
          id="inputTask"
          type="text"
          placeholder="Write your task here"
          ref={input => {
            this.textInput = input;
          }}
        />
        <div id="selectDate">Select the date :</div>
        <select
          ref={input => {
            this.day = input;
          }}
        >
          {this.renderOptions(dateUtils.days)}
        </select>
        <select
          ref={input => {
            this.month = input;
          }}
        >
          {this.renderOptions(dateUtils.months)}
        </select>
        <select
          ref={input => {
            this.year = input;
          }}
        >
          {this.renderOptions(dateUtils.years)}
        </select>
        <button id="add" onClick={this.addTask}>
          New task
        </button>
        <br />
        <Trash />
        <div id="yourList">Your List</div>
        <TasksList activities={this.state.activities} />
      </div>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <div>
        <Image id="logo" img="logo" />
        <h1>TUDO BOM</h1>
      </div>
    );
  }
}

class Image extends React.Component {
  render() {
    return (
      <div>
        <img
          id={this.props.id}
          src={"./images/" + this.props.img + ".png"}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}

class TasksList extends React.Component {
  render() {
    return (
      <div id="tasksList">
        <ul>{this.props.activities}</ul>
      </div>
    );
  }
}

class ButtonList extends React.Component {
  render() {
    return (
      <div id="buttonsContainer">
        <div id="buttonList" style={{ background: this.props.bgColor }} onClick={this.props.onClick}>
          <Image img={this.props.img} id="buttonImages"/>
        </div>
      </div>
    );
  }
}

class Trash extends React.Component {
  constructor(props) {
    super(props);
    this.openTrash = this.openTrash.bind(this);
    this.state = {
      display: "none"
    };
  }
  openTrash() {
    this.setState({
      display: "block"
    });
  }

  render() {
    return (
      <div>
        <div id="trashModal" style={{ display: this.state.display }} />
        <Image id="trash" img="trash" onClick={this.openTrash} />
      </div>
    );
  }
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}
render();
