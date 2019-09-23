import React, { Component } from 'react';
import { Textarea, Card } from 'react-rainbow-components';
import _ from 'lodash';

import { caesar, clean, format, histogram } from '../utils/caesar';

export default class Caesar extends Component {
  state = {
    message: '',
    raw: '',
    shift: 2,
    versions: []
  };

  componentDidMount() {
    this.encryptMessage('The quick, brown fox jumps over the lazy dog.');
  }

  encryptMessage(message) {
    const { versions } = this.state;
    const raw = clean(message);

    for (let index = 0; index < 26; index += 1) {
      versions[index] = format(caesar(raw, index));
    }

    this.setState({ message, raw, versions });
  }

  handleChangeMessage(event) {
    this.encryptMessage(event.target.value);
  }

  renderHistogram(histogram) {
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
              <td key={i}>{e}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  renderVersions() {
    const versionItems = this.state.versions.map(version => (
      <div className="rainbow-p-around_large">
        <Card>
          <div>{version}</div>
          <div>{this.renderHistogram(histogram(version))}</div>
        </Card>
      </div>
    ));

    return <div>{versionItems}</div>;
  }

  render() {
    const { message } = this.state;

    return (
      <div>
        <h1 className="header">Caesar</h1>

        <div className="rainbow-p-vertical_large rainbow-p-horizontal_xx-large rainbow-m-horizontal_xx-large">
          <Textarea
            id="example-textarea-1"
            label="Secret Message"
            rows={5}
            value={message}
            placeholder="Secret message here"
            onChange={e => this.handleChangeMessage(e)}
          />
        </div>

        <h3>Decrypted Messages</h3>

        {this.renderVersions()}
      </div>
    );
  }
}
