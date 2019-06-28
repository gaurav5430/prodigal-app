import React from "react";
import { Table, Pagination } from "semantic-ui-react";
import _ from "lodash";

class FilteredCallsList extends React.Component {
  constructor(props) {
    super(props);

    const pageSize = 10;
    this.state = {
      pageSize: pageSize,
      totalPages: Math.ceil(props.calls.length / pageSize),
      currentPage: 1,

      loading: false,
      error: false,
      calls: props.calls,
      paginatedCalls: props.calls.slice(0, pageSize),

      column: null,
      direction: null
    };

    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(event, data) {
    const { calls, pageSize } = this.state;
    console.log(data);
    const activePage = data.activePage;
    const paginatedCalls = calls.slice(
      (activePage - 1) * pageSize,
      activePage * pageSize
    );
    this.setState({ currentPage: data.activePage, paginatedCalls });
    const { onPageChange } = this.props;
    onPageChange && onPageChange(data.activePage);
  }

  handleSort = clickedColumn => () => {
    const { column, paginatedCalls, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        paginatedCalls: _.sortBy(paginatedCalls, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      paginatedCalls: paginatedCalls.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  renderHeader() {
    const { direction, column } = this.state;
    return (
      <Table.Row>
        <Table.HeaderCell
          sorted={column === "agent_id" ? direction : null}
          onClick={this.handleSort("agent_id")}
        >
          Agent Id
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={column === "call_id" ? direction : null}
          onClick={this.handleSort("call_id")}
        >
          Call Id
        </Table.HeaderCell>
        <Table.HeaderCell
          sorted={column === "call_time" ? direction : null}
          onClick={this.handleSort("call_time")}
        >
          Call Time
        </Table.HeaderCell>
      </Table.Row>
    );
  }

  renderFooter() {
    const { totalPages, currentPage } = this.state;
    return (
      <Table.Row>
        <Table.HeaderCell colSpan="3">
          <Pagination
            totalPages={totalPages}
            activePage={currentPage}
            onPageChange={this.onPageChange}
          />
        </Table.HeaderCell>
      </Table.Row>
    );
  }

  render() {
    const { paginatedCalls } = this.state;
    return (
      <Table sortable fixed>
        <Table.Header>{this.renderHeader()}</Table.Header>
        <Table.Body>
          {paginatedCalls.map(call => {
            return (
              <Table.Row key={call.call_id}>
                <Table.Cell> {call.agent_id} </Table.Cell>
                <Table.Cell> {call.call_id}</Table.Cell>
                <Table.Cell> {call.call_time} </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Footer>{this.renderFooter()}</Table.Footer>
      </Table>
    );
  }
}

export default FilteredCallsList;
