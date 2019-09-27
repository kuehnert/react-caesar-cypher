import _ from 'lodash';
import React, { Component } from 'react';
import { Slider, Textarea } from 'react-rainbow-components';
import { caesar, clean, format, makeHistogram } from '../utils/caesar';

export default class Caesar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeShift = this.handleChangeShift.bind(this);

    this.state = {
      message: 'The quick, brown fox jumps over the lazy dog.',
      encoded: 'blub',
      histogram: [],
      shift: 10,
    };
  }

  componentDidMount() {
    this.encryptMessage();
  }

  encryptMessage() {
    const { message, shift } = this.state;
    const raw = clean(message);
    const encoded = caesar(raw, shift);
    const histogram = makeHistogram(encoded);

    this.setState({ encoded, histogram });
  }

  handleChangeMessage(event) {
    this.setState({ message: event.target.value }, this.encryptMessage);
  }

  handleChangeShift(event) {
    this.setState({ shift: parseInt(event.target.value, 10) }, this.encryptMessage);
  }

  renderHistogram() {
    const { histogram } = this.state;

    return (
      <table>
        <thead>
          <tr>
            {_.times(26, i => (
              <th key={i}>{String.fromCharCode(65 + i)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {histogram.map((e, i) => (
              <td key={`letter${i}`}>{e}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const { message, encoded, histogram, shift } = this.state;

    return (
      <div>
        <h1 className="ui header">Caesar</h1>

        <div className="ui segment">
          <h2>Message</h2>
          <Textarea
            id="example-textarea-1"
            label="Secret Message"
            rows={5}
            value={message}
            placeholder="Secret message here"
            onChange={this.handleChangeMessage}
          />
        </div>

        <div className="ui segment">
          <h2>Shift</h2>
          <Slider
            label="Letter Shift"
            value={shift}
            min={0}
            max={25}
            step={1}
            onChange={this.handleChangeShift}
          />
        </div>

        <div className="ui segment">
          <h2>Decrypted Message</h2>
          <div>{format(encoded)}</div>
        </div>

        <div className="ui segment">
          <h2>Histogram</h2>
          <div>{this.renderHistogram(histogram)}</div>
        </div>
      </div>
    );
  }
}
