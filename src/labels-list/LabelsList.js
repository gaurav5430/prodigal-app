import React from "react";
import { getListOfLabels, applyLabels } from "../utils/api-utils";
import { Dropdown } from "semantic-ui-react";

class LabelsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      labels: []
    };

    this.onLabelsSelected = this.onLabelsSelected.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    getListOfLabels().then(response => {
      this.setState({
        loading: false,
        labels: response.data.data.unique_label_list
      });
    });
  }

  createOptions() {
    const { labels } = this.state;
    return labels.map(label => {
      return {
        key: label,
        text: label,
        value: label
      };
    });
  }

  onLabelsSelected(event, data) {
    const { onLabelsSelected } = this.props;
    onLabelsSelected && onLabelsSelected(data.value);
  }

  renderLabels() {
    const { loading, error } = this.state;
    if (loading) {
      return "Loading Labels list...";
    } else if (error) {
      return "There was an error fetching labels list";
    } else {
      return (
        <Dropdown
          placeholder="Select Labels"
          fluid
          multiple
          search
          selection
          options={this.createOptions()}
          onChange={this.onLabelsSelected}
        />
      );
    }
  }

  render() {
    return this.renderLabels();
  }
}

export default LabelsList;
