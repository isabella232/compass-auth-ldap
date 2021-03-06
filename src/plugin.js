import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import { FormInput } from 'hadron-react-components';
import Actions from 'actions';

/**
 * The LDAP auth role component.
 */
class LDAP extends React.Component {
  static displayName = 'LDAP';

  static propTypes = {
    currentConnection: PropTypes.object.isRequired,
    isValid: PropTypes.bool
  };

  static defaultProps = {
    currentConnection: {}
  }

  /**
   * Handle the username change.
   *
   * @param {Event} evt - The event.
   */
  onUsernameChanged(evt) {
    Actions.onLDAPUsernameChanged(evt.target.value.trim());
  }

  /**
   * Handle the password change.
   *
   * @param {Event} evt - The event.
   */
  onPasswordChanged(evt) {
    Actions.onLDAPPasswordChanged(evt.target.value);
  }

  /**
   * Open the help page for LDAP.
   */
  onLDAPHelp() {
    const { shell } = require('electron');
    shell.openExternal('https://docs.mongodb.com/manual/core/security-ldap/');
  }

  /**
   * Get the error for the required username field.
   *
   * @returns {String} The error message.
   */
  getUsernameError() {
    const connection = this.props.currentConnection;
    if (!this.props.isValid && isEmpty(connection.ldapUsername)) {
      return 'Username is required';
    }
  }

  /**
   * Get the error for the required password field.
   *
   * @returns {String} The error message.
   */
  getPasswordError() {
    const connection = this.props.currentConnection;
    if (!this.props.isValid && isEmpty(connection.ldapPassword)) {
      return 'Password is required';
    }
  }

  /**
   * Render the kerberos component.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <div id="ldap-authentication" className="form-group">
        <FormInput
          label="Username"
          name="ldap-username"
          error={this.getUsernameError()}
          changeHandler={this.onUsernameChanged.bind(this)}
          value={this.props.currentConnection.ldapUsername || ''}
          linkHandler={this.onLDAPHelp.bind(this)} />
        <FormInput
          label="Password"
          name="ldap-password"
          type="password"
          error={this.getPasswordError()}
          changeHandler={this.onPasswordChanged.bind(this)}
          value={this.props.currentConnection.ldapPassword || ''} />
      </div>
    );
  }
}

export default LDAP;
