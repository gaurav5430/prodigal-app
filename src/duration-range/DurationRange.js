import React from "react";
import { Checkbox } from "semantic-ui-react";
import { getDurationRange } from "../utils/api-utils";

class DurationRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      duration: {},
      radioValue: "long"
    };

    this.onDurationSelected = this.onDurationSelected.bind(this);
  }

  onDurationSelected(event, data) {
    const { onDurationSelected } = this.props;
    this.setState({ radioValue: data.value });

    onDurationSelected && onDurationSelected(this.getSelectedDuration());
  }

  getSelectedDuration() {
    const { radioValue } = this.state;
    const ranges = this.getDurationArray();
    let selectedDuration = [];
    if (radioValue === "short") {
      selectedDuration = [ranges[0], ranges[1]];
    } else if (radioValue === "medium") {
      selectedDuration = [ranges[0], ranges[2]];
    } else {
      selectedDuration = [ranges[0], ranges[3]];
    }

    return selectedDuration;
  }

  componentDidMount() {
    const { onDurationSelected } = this.props;
    this.setState({ loading: true });
    getDurationRange().then(response => {
      this.setState({ loading: false, duration: response.data.data });
      onDurationSelected && onDurationSelected(this.getSelectedDuration());
    });
  }

  getDurationArray() {
    const { duration } = this.state;
    const minimum = Math.round(duration.minimum);
    const maximum = Math.round(duration.maximum);
    const mid1 = (maximum - minimum) / 4;
    const mid2 = (3 * (maximum - minimum)) / 4;
    return [minimum, mid1, mid2, maximum];
  }

  renderDurationRange() {
    const { loading, error } = this.state;
    if (loading) {
      return "Loading duration list...";
    } else if (error) {
      return "There was an error in loading duration";
    } else {
      const ranges = this.getDurationArray();
      return (
        <>
          <Checkbox
            radio
            radioGroup="duration"
            checked={this.state.radioValue === "short"}
            label={`Short (${ranges[0]} - ${ranges[1]})`}
            value="short"
            onChange={this.onDurationSelected}
          />
          <Checkbox
            radio
            radioGroup="duration"
            checked={this.state.radioValue === "medium"}
            label={`Medium (${ranges[0]} - ${ranges[2]})`}
            value="medium"
            onChange={this.onDurationSelected}
          />
          <Checkbox
            radio
            radioGroup="duration"
            checked={this.state.radioValue === "long"}
            label={`Long (${ranges[0]} - ${ranges[3]})`}
            value={"long"}
            onChange={this.onDurationSelected}
          />
        </>
      );
    }
  }

  render() {
    return this.renderDurationRange();
  }
}

export default DurationRange;
