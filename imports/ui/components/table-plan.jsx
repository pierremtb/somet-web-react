import React from 'react';
import { dispDate, dispDuration } from '../tools/helpers.js';
import { browserHistory } from 'react-router';
import { sometLightTheme } from '../tools/themes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, TableBody,
  TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn } from 'material-ui/Table';

export function PlansTable(props) {
  function openPlan(id) {
    const url = `/group/${props.params.group}/athlete/${props.params.athlete}/plan/view/${id}`;
    browserHistory.push(url);
  }

  return (
    <MuiThemeProvider muiTheme={sometLightTheme}>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Semaine du lundi</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Durée totale</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {props.plans.length > 0 ?
           props.plans.map((doc) => (
             <TableRow
               hoverable
               onTouchTap={() => openPlan(doc._id)}
             >
               <TableRowColumn>{dispDate(doc.mondayDate)}</TableRowColumn>
               <TableRowColumn>{doc.title}</TableRowColumn>
               <TableRowColumn>{dispDuration(doc.totalDuration)}</TableRowColumn>
             </TableRow>
           ))
           : <TableRow>
             <TableRowColumn>Pas encore de plans.</TableRowColumn>
             <TableRowColumn />
             <TableRowColumn />
           </TableRow>}
        </TableBody>
      </Table>
    </MuiThemeProvider>
  );
}

PlansTable.propTypes = {
  plans: React.PropTypes.array,
  params: React.PropTypes.object,
};
