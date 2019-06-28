import React from "react";
import { getCallList } from "../utils/api-utils";
import { Table, Label, Icon, Checkbox, Pagination } from "semantic-ui-react";

class LabelledCallsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSize: 10,
      totalPages: 0,
      currentPage: props.initialPage,
      loading: false,
      error: false,
      calls: [],
      paginatedCalls: [],
      selectedCalls: []
    };

    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    const { pageSize, currentPage } = this.state;
    this.setState({ loading: true });
    getCallList().then(response => {
      const calls = response.data.data.call_data;
      this.setState({
        loading: false,
        calls: calls,
        paginatedCalls: calls.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        ),
        totalPages: Math.ceil(calls.length / pageSize)
      });
    });
  }

  onLabelRemove(callId, labelToRemove) {}

  onLabelAdd(callId, labelToAdd) {}

  renderLabels(callId, labels) {
    return labels.map(label => {
      return (
        <Label key={label}>
          {label}
          {/* <Icon
            name="delete"
            onClick={() => this.onLabelRemove(callId, label)}
          /> */}
        </Label>
      );
    });
  }

  getSelectedCallIds(calls) {
    const selectedCallIds = calls
      .filter(call => call.selected === true)
      .map(call => call.call_id);
    return selectedCallIds;
  }

  onRowToggle(data, selectedCall) {
    console.log("selected row: ", selectedCall, data);
    const { calls } = this.state;
    // set all checked
    const call = calls.filter(call => call.call_id === selectedCall.call_id)[0];
    call.selected = data.checked;
    this.setState({
      calls: [...calls]
    });

    const { onRowsToggle } = this.props;
    onRowsToggle && onRowsToggle(this.getSelectedCallIds(calls));
  }

  onAllRowsToggle(data) {
    console.log("All rows selected:", data);
    const { calls, pageSize, currentPage } = this.state;
    // get this row, and set checked

    const callsNew = calls.map((call, index) => {
      if (
        index >= (currentPage - 1) * pageSize &&
        index < currentPage * pageSize
      ) {
        return {
          ...call,
          selected: data.checked
        };
      } else {
        return {
          ...call
        };
      }
    });

    const paginatedCalls = callsNew.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    this.setState({
      calls: callsNew,
      paginatedCalls
    });

    const { onRowsToggle } = this.props;
    onRowsToggle && onRowsToggle(this.getSelectedCallIds(callsNew));
  }

  renderRow(call) {
    return (
      <Table.Row key={call.call_id}>
        <Table.Cell>
          <Checkbox
            checked={call.selected}
            onChange={(event, data) => this.onRowToggle(data, call)}
          />
        </Table.Cell>
        <Table.Cell>{call.call_id}</Table.Cell>
        <Table.Cell>
          {this.renderLabels(call.call_id, call.label_id)}
        </Table.Cell>
      </Table.Row>
    );
  }

  renderHeader() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Checkbox onChange={(e, data) => this.onAllRowsToggle(data)} />
          </Table.HeaderCell>
          <Table.HeaderCell>Call Id</Table.HeaderCell>
          <Table.HeaderCell>Labels</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
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

  renderFooter() {
    const { totalPages, currentPage } = this.state;
    return (
      <Pagination
        totalPages={totalPages}
        activePage={currentPage}
        onPageChange={this.onPageChange}
      />
    );
  }

  renderCallsList() {
    const { loading, error, paginatedCalls } = this.state;
    if (loading) {
      return "Loading Calls list...";
    } else if (error) {
      return "There was an error loading calls list";
    } else {
      return (
        <Table celled>
          {this.renderHeader()}
          <Table.Body>
            {paginatedCalls.map(call => this.renderRow(call))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                {this.renderFooter()}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      );
    }
  }

  render() {
    return <div className="LabelledCallsList">{this.renderCallsList()}</div>;
  }
}

export default LabelledCallsList;
