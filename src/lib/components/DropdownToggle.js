import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Target } from 'react-popper';
import { mapToCssModules } from '../utils/utils';
import Button from './Button';
import { withDropDownContext } from '../contexts/DropDownContext'

const propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  caret: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  'aria_haspopup': PropTypes.bool,
  split: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  nav: PropTypes.bool,
};

const defaultProps = {
  'aria_haspopup': true,
  color: 'secondary',
};

class DropdownToggleBase extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.nav && !this.props.tag) {
      e.preventDefault();
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (this.props.context.toggle) {
      this.props.context.toggle(e);
    }
  }

  render() {
    const { className, color, cssModule, caret, split, nav, tag, ...props } = this.props;
    const ariaLabel = props['aria_label'] || 'Toggle Dropdown';
    const classes = mapToCssModules(classNames(
      className,
      {
        'dropdown-toggle': caret || split,
        'dropdown-toggle-split': split,
        'nav-link': nav
      }
    ), cssModule);
    const children = props.children || <span className="sr-only">{ariaLabel}</span>;

    let Tag;

    if (nav && !tag) {
      Tag = 'a';
      props.href = '#';
    } else if (!tag) {
      Tag = Button;
      props.color = color;
      props.cssModule = cssModule;
    } else {
      Tag = tag;
    }

    if (this.props.context.inNavbar) {
      return (
        <Tag
          {...props}
          className={classes}
          onClick={this.onClick}
          aria-expanded={this.props.context.isOpen}
          children={children}
        />
      );
    }

    return (
      <Target
        {...props}
        className={classes}
        component={Tag}
        onClick={this.onClick}
        aria-expanded={this.props.context.isOpen}
        children={children}
      />
    );
  }
}

DropdownToggleBase.propTypes = propTypes;
DropdownToggleBase.defaultProps = defaultProps;

const DropdownToggle = withDropDownContext(DropdownToggleBase)

export default DropdownToggle;
