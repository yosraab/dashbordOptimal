/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core/';
import Warning from '@material-ui/icons/WarningTwoTone';
import Check from '@material-ui/icons/CheckTwoTone';
import Info from '@material-ui/icons/InfoTwoTone';
import Error from '@material-ui/icons/ErrorTwoTone';

const guessColors = variant => {
  switch (variant) {
    case 'success':
      return ['#4caf50', '#e8f5e9'];
    case 'warning':
      return ['#ff9800', '#ffeec3'];
    case 'info':
      return ['#2196f3', '#bfeeff'];
    case 'danger':
      return ['#b2102f', '#ffc0cb'];
    default:
      return ['#8f8f8f', '#eee'];
  }
};
export default class Alert extends Component {
  render() {
    return (
      <Card>
        <div
          style={{
            backgroundColor: guessColors(this.props.variant || '')[1],
            alignItems: 'center',
            borderLeft: 5,
            borderLeftColor: guessColors(this.props.variant || '')[0],
            borderLeftStyle: 'solid',
            padding: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              placeContent: 'space-between',
              color: guessColors(this.props.variant || '')[0],
              fontSize: 'medium',
              fontWeight: 'bold',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', placeContent: 'flex-end' }}>
              {!this.props.icon && this.props.variant === 'warning' && <Warning style={{ marginRight: 10 }} />}
              {!this.props.icon && this.props.variant === 'danger' && <Error style={{ marginRight: 10 }} />}
              {!this.props.icon && this.props.variant === 'info' && <Info style={{ marginRight: 10 }} />}
              {!this.props.icon && this.props.variant === 'success' && <Check style={{ marginRight: 10 }} />}
              <div style={{ marginRight: 10 }}>{this.props.icon}</div>
              <div>
                <h6
                  style={{
                    margin: 0,
                    fontSize: 18,
                    color: guessColors(this.props.variant || '')[0],
                  }}
                >
                  {this.props.titleCard}
                </h6>
                <Typography variant="caption">{this.props.textCard}</Typography>
              </div>
            </div>
            {this.props.rightElement && <div>{this.props.rightElement}</div>}
          </div>
        </div>
      </Card>
    );
  }
}
