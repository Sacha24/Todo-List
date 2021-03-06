var Sound = {
  done : new Audio('sounds/done.mp3'),
  priority : new Audio('sounds/priority.aac'),
  trash : new Audio('sounds/trash.mp3'),
  input : new Audio('sounds/input.mp3'),
  undone : new Audio('sounds/undone.mp3'),
  error : new Audio('sounds/error.mp3'),
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      activitiesDone: [],
      key: 500,
      key2: 1000,
      placeholder: "Write your task here"
    };
    this.addTask = this.addTask.bind(this)
    this.moveTask = this.moveTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.unDoneTask = this.unDoneTask.bind(this)
    this.addPriority = this.addPriority.bind(this)
  }

  addTask(event) {
    if (this.textInput.value.length === 0){
      var newPlaceholder = "Please enter at least one character"
      this.setState({
        placeholder : newPlaceholder
      })
    } else if (this.textInput.value.length > 40){
      alert("40 characters maximum")
    }
    else if (event.target.tagName === "BUTTON" || event.keyCode === 13){
      Sound.input.play();
      this.state.activities.push(
        <li id="tasks" key={this.state.key + 1}>
         {this.textInput.value} on{" "}
         <u>
           {this.day.value}/{this.month.value}/{this.year.value}
         </u>
         <ButtonList bgColor="red" img="delete" onClick={this.removeTask} />
         <ButtonList bgColor="green" img="star" onClick={this.addPriority}/>
         <ButtonList bgColor="blue" img="checked" onClick={this.moveTask} />
        </li>
      )
      this.setState({
        activities: this.state.activities,
        key: this.state.key + 1,
        placeholder : "Write your task here"
      });
      this.textInput.value = "";
    }
  }

  moveTask(event) {
    Sound.done.play();
    var taskSelected = event.target.parentNode.parentNode.parentNode.parentNode;
    this.state.activitiesDone.push(taskSelected.textContent);
    this.setState({
      activitiesDone: this.state.activitiesDone
    });
    taskSelected.remove();
  }

  addPriority(event){
    var taskSelected = event.target.parentNode.parentNode.parentNode.parentNode;
    var listContainer = taskSelected.parentNode
    if(taskSelected.id === "tasks") {
      Sound.priority.play();
      taskSelected.setAttribute("id","tasksPriority")
      listContainer.prepend(taskSelected)
    } else{
      taskSelected.setAttribute("id","tasks")
      listContainer.append(taskSelected)
    }
  }

  removeTask(event) {
    Sound.trash.play();
    var taskSelected = event.target.parentNode.parentNode.parentNode.parentNode;
    taskSelected.remove();
  }

  unDoneTask(event) {
    Sound.undone.play();
    var taskSelected = event.target.parentNode.parentNode.parentNode.parentNode;
    this.state.activities.push(
      <li id="tasks" key={this.state.key2 + 1}>
        {taskSelected.textContent}{" "}
        <ButtonList bgColor="red" img="delete" onClick={this.removeTask} />
        <ButtonList bgColor="green" img="star" onClick={this.addPriority}/>
        <ButtonList bgColor="blue" img="checked" onClick={this.moveTask} />
      </li>
    );
    this.setState({
      activities: this.state.activities,
      key2 : this.state.key2 + 1
    });
    taskSelected.remove();
  }

  renderOptions(arr) {
    return arr.map(x => (
      <option key={x} value={x}>
        {x}
      </option>
    ));
  }

  render() {
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
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
        <input id="inputTask" type="text" placeholder={this.state.placeholder} onKeyUp={this.addTask}
          ref={input => {this.textInput = input;}}/>

        <div id="selectDate">Date :</div>
        <select ref={input => {this.day = input;}}>
          {this.renderOptions(dateUtils.days)}
        </select>
        <select ref={input => {this.month = input;}}>
          {this.renderOptions(dateUtils.months)}
        </select>
        <select ref={input => {this.year = input;}}>
          {this.renderOptions(dateUtils.years)}
        </select>

        <button id="add" onClick={this.addTask}>New task</button>
        <Trash
          activitiesDone={this.state.activitiesDone}
          onTrashClick={this.removeTask}
          onCancelClick={this.unDoneTask}
        />
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
        <h1>TODO BOM</h1>
      </div>
    );
  }
}

class Image extends React.Component {
  render() {
    return (
      <div>
        <img id={this.props.id} src={"./images/" + this.props.img + ".png"} onClick={this.props.onClick}/>
      </div>
    );
  }
}

class TasksList extends React.Component {
  render() {
    return (
      <div>
        <div id="yourList">My List</div>
        <Image img="finger2" id="finger" />
        <div id="tasksList">
          <ul>{this.props.activities}</ul>
        </div>
      </div>
    );
  }
}

class ButtonList extends React.Component {
  render() {
    return (
      <div id="buttonsContainer">
        <div
          id="buttonList"
          style={{ background: this.props.bgColor }}
          onClick={this.props.onClick}
        >
          <Image img={this.props.img} id="buttonImages" />
        </div>
      </div>
    );
  }
}

class Trash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "none",
      activitiesDone: this.props.activitiesDone
    };
    this.openTrash = this.openTrash.bind(this);
    this.closeTrash = this.closeTrash.bind(this);
  }

  openTrash() {
    this.setState({
      display: "block"
    });
  }

  closeTrash() {
    this.setState({
      display: "none"
    });
  }

  render() {
    return (
      <div>
        <div id="trashModal" style={{ display: this.state.display }}>
          <div id="doneTitle">
            <u>Done</u>
          </div>
          <ul>
            {this.props.activitiesDone.map(i => (
              <li id="activitiesDone" key={i.index}>
                <strike>{i}</strike>
                <ButtonList bgColor="red" img="delete" onClick={this.props.onTrashClick}/>
                <ButtonList img="cancel" onClick={this.props.onCancelClick} />
              </li>
            ))}
          </ul>
          <button id="closeButton" onClick={this.closeTrash}>Close</button>
        </div>
        <Image id="trash" img="done" onClick={this.openTrash} />
      </div>
    );
  }
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}
render();
