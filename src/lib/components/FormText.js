import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from '../utils/utils';

const propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  inline: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const defaultProps = {
  tag: 'small',
  color: 'muted',
};

const FormText = (props) => {
  const {
    className,
    cssModule,
    inline,
    color,
    tag: Tag,
    ...attributes
  } = props;

  const classes = mapToCssModules(classNames(
    className,
    !inline ? 'form-text' : false,
    color ? `text-${color}` : false
  ), cssModule);

  return (
    <Tag {...attributes} className={classes} />
  );
};

FormText.propTypes = propTypes;
FormText.defaultProps = defaultProps;

export default FormText;
