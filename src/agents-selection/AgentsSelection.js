import React from "react";
import { getListOfAgents } from "../utils/api-utils";
import { Dropdown } from "semantic-ui-react";

class AgentsSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agents: [],
      loading: false,
      error: false
    };

    this.onAgentSelected = this.onAgentSelected.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    getListOfAgents().then(response => {
      this.setState({
        loading: false,
        agents: response.data.data.listofagents
      });
    });
  }

  onAgentSelected(event, data) {
    const { onAgentSelected } = this.props;
    onAgentSelected && onAgentSelected(data.value);
  }

  createOptions() {
    const { agents } = this.state;
    return agents.map(agent => {
      return {
        key: agent,
        text: agent,
        value: agent
      };
    });
  }

  renderAgentsList() {
    const { loading, error } = this.state;
    if (loading) {
      return "Loading agents list...";
    } else if (error) {
      return "There was an error in loading agents list";
    } else {
      return (
        <Dropdown
          placeholder="Select Agents"
          fluid
          multiple
          search
          selection
          options={this.createOptions()}
          onChange={this.onAgentSelected}
        />
      );
    }
  }

  render() {
    return this.renderAgentsList();
  }
}

export default AgentsSelection;
