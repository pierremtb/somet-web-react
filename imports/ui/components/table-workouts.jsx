import React from 'react';
import { dispDate, dispDuration, dispSupport } from '../tools/helpers.js';
import { browserHistory } from 'react-router';
import { sometLightTheme } from '../tools/themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, TableBody,
  TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn } from 'material-ui/Table';

export function WorkoutsTable(props) {
  function openWorkout(id) {
    const url = `/group/${props.params.group}/athlete/` +
      `${props.params.athlete}/workout/view/${id}`;
    browserHistory.push(url);
  }
  return (
    <MuiThemeProvider muiTheme={sometLightTheme}>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Titre</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Durée</TableHeaderColumn>
            <TableHeaderColumn>Support</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>

          {props.workouts.length > 0 ?
           props.workouts.map((doc) => (
             <TableRow
               hoverable
               onTouchTap={() => openWorkout(doc._id)}
             >
               <TableRowColumn>{doc.title}</TableRowColumn>
               <TableRowColumn>{dispDate(doc.startDate)}</TableRowColumn>
               <TableRowColumn>{dispDuration(doc.duration)}</TableRowColumn>
               <TableRowColumn>{dispSupport(doc.support)}</TableRowColumn>
             </TableRow>
             ))
             : <TableRow>
               <TableRowColumn>Pas encore d'entrainements.</TableRowColumn>
               <TableRowColumn />
               <TableRowColumn />
             </TableRow>
          }

        </TableBody>
      </Table>
    </MuiThemeProvider>
  );
}

WorkoutsTable.propTypes = {
  workouts: React.PropTypes.array,
  params: React.PropTypes.object,
};
