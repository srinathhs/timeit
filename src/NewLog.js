import React, { Component } from 'react';

export default class NewLog extends Component {
  constructor(props) {
    super(props);
    
    var request = window.indexedDB.open("TimeIt", 1);
    this.myDb ; 
    this.state = {project: ''};
    this.state.date = new Date();
    this.state.logstring = '';
    this.state.from = '';
    this.state.to = '';
    this.state.duration = '';

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
        console.log("DB opened")
    }.bind(this);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeLog = this.handleChangeLog.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

 
 handleChangeProject(event) {
     this.setState({project: event.target.value});
 }

 handleChangeLog(e) {
     this.setState({logstring: e.target.value});
 }

 handleChangeFrom(e) {
     this.setState({from: e.target.value});
 }

 handleChangeTo(e) {
     this.setState({to: e.target.value});
 }

 handleChangeDuration(e) {
     this.setState({duration: e.target.value});
 }

 handleChangeDate(e) {
     this.setState({date: e.target.value});
 }
  handleClick(e) {
    var trans = this.myDb.transaction('log', 'readwrite');
    var store = trans.objectStore('log');

  var data = {
     "project" : this.state.project,
    "date" :this.state.date,
    "logstring" : this.state.logstring,
    "from" : this.state.from,
    "to" : this.state.to,
    "duration": this.state.duration,
    "timeStamp": new Date().getTime()
  };

  var request = store.add(data);

  trans.oncomplete = function(e) {
    console.log("Done Adding: ", e);
  };

  trans.onerror = function(e) {
    console.log("Error Adding: ", e);
  };
  };


    render() {
        return (
            <div className="content box">
                <p className="title">New Log</p>

                <div className="content">
                    <div className="field">
                        <label className="label">Date</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="Date" value={this.state.date}
                             onChange={this.handleChangeDate} />
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Project</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="Project name" value={this.state.project} 
                            onChange={this.handleChangeProject} />
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Log</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="log" value={this.state.logstring} 
                            onChange={this.handleChangeLog} />
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">From</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="From" value={this.state.from} 
                            onChange={this.handleChangeFrom} />
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">To</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="to" value={this.state.to} 
                            onChange={this.handleChangeTo} />
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Duration</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="duration" value={this.state.duration} 
                            onChange={this.handleChangeDuration} />
                        </p>
                    </div>
                    <div className="block">
                        <a className="button is-medium is-primary" onClick={this.handleClick}>
                            <span className="icon is-small">
                                <i className="fa fa-check"></i>
                            </span><span>Save</span></a>
                        <a className="button is-medium ">Clear</a>
                    </div>
                </div>
            </div>
        );
    }
}


