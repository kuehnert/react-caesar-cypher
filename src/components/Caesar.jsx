import React, { Component } from 'react';
import { Chart, Slider, Textarea, Dataset } from 'react-rainbow-components';
import { caesar, clean, format, makeHistogram } from '../utils/caesar';
import './Caesar.css'

export default class Caesar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeShift = this.handleChangeShift.bind(this);

    this.state = {
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      message:
        'Es war einmal ein kleines süßes Mädchen, das hatte jedermann lieb, der sie nur ansah, am allerliebsten aber ihre Großmutter, die wusste gar nicht, was sie alles dem Kinde geben sollte. Einmal schenkte sie ihm ein Käppchen von rotem Samt, und weil ihm das so wohl stand, und es nichts anders mehr tragen wollte, hieß es nur das Rotkäppchen.',
      encoded: 'blub',
      histogram: [],
      histogramGerman: [
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
      ],
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
              <td key={i}>{e.toFixed(2)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const { alphabet, message, encoded, histogram, histogramGerman, shift } = this.state;

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

        <h2>Histogram</h2>
        <div className="ui segment">
          <div className="rainbow-align-content_center">
            <Chart
              labels={alphabet}
              type="bar"
              className="rainbow-m-horizontal_xx-large rainbow-m-top_x-large">
              <Dataset
                title="Message"
                values={histogram}
                backgroundColor="#1de9b6"
                borderColor="#1de9b6"
              />
              <Dataset
                title="German"
                values={histogramGerman}
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
