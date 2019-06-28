import React from "react";
import LabelledCallsList from "../labelled-calls-list/LabelledCallsList";
import LabelsList from "../labels-list/LabelsList";
import { Button } from "semantic-ui-react";
import "./LabelCalls.css";
import { applyLabels } from "../utils/api-utils";

class LabelCalls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCalls: [],
      selectedLabels: [],
      reloadSwitch: 0,
      currentPage: 1
    };

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onRowsToggle = this.onRowsToggle.bind(this);
    this.onLabelsSelected = this.onLabelsSelected.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  onRowsToggle(selectedCalls) {
    this.setState({ selectedCalls });
    this.setState({
      isEnabled: this.isEnabled(selectedCalls, this.state.selectedLabels)
    });
  }

  onLabelsSelected(selectedLabels) {
    this.setState({ selectedLabels });
    this.setState({
      isEnabled: this.isEnabled(this.state.selectedCalls, selectedLabels)
    });
  }

  onPageChange(page) {
    this.setState({ currentPage: page });
  }

  onAdd() {
    const { selectedCalls, reloadSwitch } = this.state;
    const labelOps = this.createLabelOps("add");
    applyLabels(selectedCalls, labelOps).then(response => {
      console.log("successfully applied");
      if (reloadSwitch) {
        this.setState({ reloadSwitch: 0 });
      } else {
        this.setState({ reloadSwitch: 1 });
      }
    });
  }

  onRemove() {
    const { selectedCalls, reloadSwitch } = this.state;
    const labelOps = this.createLabelOps("remove");
    applyLabels(selectedCalls, labelOps).then(response => {
      console.log("successfully removed");
      if (reloadSwitch) {
        this.setState({ reloadSwitch: 0 });
      } else {
        this.setState({ reloadSwitch: 1 });
      }
    });
  }

  createLabelOps(action) {
    const { selectedLabels } = this.state;
    const labelOps = [];
    if (action === "add") {
      for (let i = 0; i < selectedLabels.length; i++) {
        const labelOp = {
          name: selectedLabels[i],
          op: "add"
        };

        labelOps.push(labelOp);
      }
    } else if (action === "remove") {
      for (let i = 0; i < selectedLabels.length; i++) {
        const labelOp = {
          name: selectedLabels[i],
          op: "remove"
        };

        labelOps.push(labelOp);
      }
    }

    return labelOps;
  }

  isEnabled(selectedCalls, selectedLabels) {
    return selectedCalls.length > 0 && selectedLabels.length > 0;
  }

  render() {
    const { isEnabled, reloadSwitch, currentPage } = this.state;
    return (
      <div className="LabelCalls">
        <div className="LabelCalls__sidebar">
          <div className="LabelCalls__labels">
            <LabelsList onLabelsSelected={this.onLabelsSelected} />
          </div>
          <div className="LabelCalls__actions Actions">
            <Button
              onClick={this.onAdd}
              disabled={!isEnabled}
              className="Actions__add"
            >
              Add
            </Button>
            <Button
              onClick={this.onRemove}
              disabled={!isEnabled}
              className="Actions__remove"
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="LabelCalls__calls">
          <LabelledCallsList
            onRowsToggle={this.onRowsToggle}
            key={reloadSwitch}
            initialPage={currentPage}
            onPageChange={this.onPageChange}
          />
        </div>
      </div>
    );
  }
}

export default LabelCalls;
