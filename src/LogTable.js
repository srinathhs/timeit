import React, { Component } from 'react';

export default class LogTable extends Component {
  constructor(props) {
    super(props);
    
    
    this.myDb ; 
    this.state = {entries: []};

    this.reload = this.reload.bind(this);
  }
componentDidMount() {
var request = window.indexedDB.open("TimeIt", 1);
request.onerror = function(event) {
  // Generic error handler for all errors targeted at this database's
  // requests!
  console.log("Database error: " , event);
};
    request.onupgradeneeded = function(e) {
        var db = e.target.result;
        var store = db.createObjectStore("log", {keyPath: "timeStamp"});  
    };


    request.onsuccess = function(e) {    
        this.myDb = e.target.result;
        this.reload();
    }.bind(this);

  }
  reload(){
    var trans = this.myDb.transaction("log", 'readonly');
    var request = trans.objectStore("log").openCursor();
    var ents = []
    request.onsuccess = function(event) {
      var cursor = event.target.result;
      
      // If cursor is null then we've completed the enumeration - so update the DOM
      if (cursor) {
        ents.push(cursor.value);
        this.setState({entries:ents});
        cursor.continue();
      }
      else {
        console.log('cusor');
      }

      
    }.bind(this);
  }

  render() {
    var rows = this.state.entries.map(function (e) {
      console.log(e);
      
    return (
      <tr key={e.timeStamp}>
      <th>{e.project}</th>
      <td>{e.logstring}</td>
      <td>{e.from}</td>
      <td>{e.to}</td>
      <td>{e.duration}</td>
      <td>false</td>
     </tr>
    );
  });

    return (
      <div className="content">
        <nav className="level is-8">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>123</strong> Logs</p>
            </div>
            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <input className="input" type="text" placeholder="Find a log"/>
                </p>
                  <p className="control">
                    <button className="button">
                      Search
                    </button>
                  </p>
      </div>
              </div>
            </div>

            <div className="level-right">
              <p className="level-item"><strong>All</strong></p>
              <p className="level-item"><a>Paid</a></p>
              <p className="level-item"><a>Unpaid</a></p>
            </div>
      </nav>
        <table className="table">
  <thead>
    <tr>
      <th>Project</th>
      <th>Log</th>
      <th>Start</th>
      <th>End</th>
      <th>Duration</th>
      <th>Paid</th>
    </tr>
  </thead>
  <tbody>
    {rows}
   
  </tbody>
</table>
      </div>
        );
  }
}


