import React, { Component } from 'react'
import _ from 'lodash'

import { caesar, clean, format, histogram } from '../utils/caesar'

export default class Caesar extends Component {
  state = {
    message: "",
    raw: "",
    versions: []
  }

  componentDidMount() {
    this.encryptMessage("The quick, brown fox jumps over the lazy dog.");
  }

  encryptMessage(message) {
    const { versions } = this.state;
    const raw = clean(message);

    for (let index = 0; index < 26; index++) {
      versions[index] = format(caesar(raw, index));
    }

    this.setState({ message, raw, versions });
  }

  handleChangeMessage(event) {
    this.encryptMessage(event.target.value)
  }

  renderHistogram(histogram) {
    return (<table>
      <thead>
        <tr>
          { _.times(26, i => <th key={i}>{String.fromCharCode(65 + i)}</th> )}
        </tr>
      </thead>
      <tbody>
        <tr>
          { histogram.map((e, i) => <td key={i}>{e}</td>) }
        </tr>
      </tbody>
    </table>)
  }

  renderVersions() {
    const versionItems = this.state.versions.map((version) =>
      <span key={version}>
        <pre>{version}</pre>
        {this.renderHistogram(histogram(version))}
      </span>
    );

    return (<div>{versionItems}</div>);
  }

  render() {
    const { message } = this.state;

    return (
      <div>
        <h2>Caesar</h2>

        <textarea value={message} cols={80} rows={5} onChange={(e) => this.handleChangeMessage(e)} />

        <h3>Decrypted Messages</h3>

        {this.renderVersions()}
      </div>
    )
  }
}
