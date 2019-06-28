import React from "react";
import { getFilteredCalls } from "../utils/api-utils";
import { Button } from "semantic-ui-react";
import "./FilteredCalls.css";
import AgentsSelection from "../agents-selection/AgentsSelection";
import DurationRange from "../duration-range/DurationRange";
import FilteredCallsList from "../filtered-calls-list/FilteredCallsList";

class FilteredCalls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      calls: [],

      selectedAgents: [],
      selectedDuration: [],
      enabled: false
    };

    this.onDurationSelected = this.onDurationSelected.bind(this);
    this.onAgentSelected = this.onAgentSelected.bind(this);
    this.getFilteredCalls = this.getFilteredCalls.bind(this);
  }

  onAgentSelected(data) {
    this.setState({ selectedAgents: data });
    this.setState({
      enabled: this.isEnabled(data, this.state.selectedDuration)
    });
  }

  onDurationSelected(data) {
    this.setState({ selectedDuration: data });
    this.setState({ enabled: this.isEnabled(this.state.selectedAgents, data) });
  }

  getFilteredCalls() {
    const { reloadSwitch } = this.state;
    this.setState({ loading: true });
    const { selectedAgents, selectedDuration } = this.state;

    getFilteredCalls(selectedAgents, selectedDuration).then(response => {
      this.setState({ loading: false, calls: response.data.data });
      if (reloadSwitch) {
        this.setState({ reloadSwitch: 0 });
      } else {
        this.setState({ reloadSwitch: 1 });
      }
    });
  }

  renderCallsList() {
    const { calls, reloadSwitch, loading, error } = this.state;
    if (loading) {
      return "Loading calls list...";
    } else if (error) {
      return "There was an error loading calls list";
    } else if (calls.length) {
      return <FilteredCallsList calls={calls} key={reloadSwitch} />;
    }

    return null;
  }

  isEnabled(selectedAgents, selectedDuration) {
    return selectedAgents.length > 0 && selectedDuration.length > 0;
  }

  render() {
    const { loading, error, calls, enabled } = this.state;
    let className = "FilteredCalls";
    if (loading || error || calls.length) {
      className = "FilteredCalls FilteredCalls--sidebar";
    }
    return (
      <div className={className}>
        <div className="FilteredCalls__criteria">
          <div className="FilteredCalls__criteria-list">
            <div className="FilteredCalls__agentsList">
              <div className="FilteredCalls__criteria-title">Select agents</div>
              <AgentsSelection onAgentSelected={this.onAgentSelected} />
            </div>
            <div className="FilteredCalls__duration">
              <div className="FilteredCalls__criteria-title">
                Select duration
              </div>
              <DurationRange onDurationSelected={this.onDurationSelected} />
            </div>
          </div>
          <div className="FilteredCalls__actions">
            <Button onClick={this.getFilteredCalls} disabled={!enabled}>
              Get Filtered Calls
            </Button>
          </div>
        </div>
        <div className="FilteredCalls__calls">{this.renderCallsList()}</div>
      </div>
    );
  }
}

export default FilteredCalls;
