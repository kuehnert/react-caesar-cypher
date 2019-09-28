import React, { Component } from 'react';
import { Chart, Slider, Textarea, Dataset } from 'react-rainbow-components';
import { caesar, clean, format, makeHistogram, standardDeviation, random } from '../utils/caesar';
import puzzles from '../utils/puzzles';
import './Caesar.css';

export default class Caesar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeShift = this.handleChangeShift.bind(this);

    this.histogramGerman = [
      0.0651,
      0.0189,
      0.0306,
      0.0508,
      0.174,
      0.0166,
      0.0301,
      0.0476,
      0.0755,
      0.0027,
      0.0121,
      0.0344,
      0.0253,
      0.0978,
      0.0251,
      0.0079,
      0.0002,
      0.07,
      0.0758,
      0.0615,
      0.0435,
      0.0067,
      0.0189,
      0.0003,
      0.0004,
      0.0113,
    ];

    this.state = {
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      message: puzzles[random(puzzles.length)],
      encoded: 'blub',
      histogram: [],
      shift: random(26),
      stdv: 0,
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
    const stdv = standardDeviation(histogram, this.histogramGerman);

    this.setState({ encoded, histogram, stdv });
  }

  handleChangeMessage(event) {
    this.setState({ message: event.target.value }, this.encryptMessage);
  }

  handleChangeShift(event) {
    this.setState({ shift: parseInt(event.target.value, 10) }, this.encryptMessage);
  }

  renderHistogram() {
    const { alphabet, histogram } = this.state;

    return (
      <table>
        <thead>
          <tr>
            {alphabet.map(e => (
              <th key={e}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {histogram.map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <td key={i}>{e.toFixed(2)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const { alphabet, message, encoded, histogram, shift, stdv } = this.state;

    return (
      <div>
        <h1 className="ui header">Caesar</h1>

        <h2>Message</h2>
        <div className="ui segment">
          <Textarea
            id="example-textarea-1"
            label="Secret Message"
            rows={5}
            value={message}
            placeholder="Secret message here"
            onChange={this.handleChangeMessage}
          />

          <Slider
            label="Letter Shift"
            value={shift}
            min={0}
            max={25}
            step={1}
            onChange={this.handleChangeShift}
          />
        </div>

        <h2>Decrypted Message</h2>
        <div className="ui segment">
          <div className="code">{format(encoded)}</div>
        </div>

        <h2>Standard Deviation</h2>
        <div className="ui segment">
          <div className="code center">{stdv.toFixed(3)}</div>
        </div>

        <h2>Histogram</h2>
        <div className="ui segment">
          <div className="">
            <Chart
              labels={alphabet}
              type="bar"
              disableAnimations
              className="">
              <Dataset
                title="Message"
                values={histogram}
                backgroundColor="#1de9b6"
                borderColor="#1de9b6"
              />
              <Dataset
                title="German"
                values={this.histogramGerman}
                backgroundColor="#01b6f5"
                borderColor="#01b6f5"
              />
            </Chart>
          </div>
        </div>
      </div>
    );
  }
}
