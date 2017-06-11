import React, { Component } from 'react';
import NewLog from "./NewLog"
import LogTable from "./LogTable"
export default class MainContainer extends Component {
  render() {
    return (
      <div className="tile is-ancestor">
  <div className="tile is-vertical is-8">
    <div className="tile is-parent ">
      <article className="tile is-child">
        <LogTable> </LogTable>
      </article>
    </div>
  </div>
  <div className="tile is-parent">
    <article className="tile is-child">
      <NewLog> </NewLog>
    </article>
  </div>
</div>
        );
  }
}


