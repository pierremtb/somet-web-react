import React from 'react';
import TextField from 'material-ui/TextField';

export default class RegexTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorValue: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { regex, errorRegex, errorUnavailable, unavailableValues } = this.props;
    const name = event.target.value;
    let errorValue = '';
    if (!name.match(regex)) {
      errorValue = errorRegex;
    } else if (unavailableValues.indexOf(name) !== -1) {
      errorValue = errorUnavailable;
    }
    this.setState({ errorValue });
    this.props.onChange(event);
  }

  render() {
    const { hintText, disabled, inputStyle, style, hintStyle,
      fullWidth, leftIconName, value } = this.props;
    return (
      <div>
        {leftIconName ?
          <i className="material-icons space_right">{leftIconName}</i>
        : null}
        <TextField
          onChange={this.handleChange}
          hintText={hintText}
          errorText={this.state.errorValue}
          disabled={disabled}
          inputStyle={inputStyle}
          style={style}
          value={value}
          hintStyle={hintStyle}
          fullWidth={fullWidth}
        />
      </div>
    );
  }

}

RegexTextField.propTypes = {
  regex: React.PropTypes.instanceOf(RegExp),
  unavailableValues: React.PropTypes.array,
  errorUnavailable: React.PropTypes.string,
  errorRegex: React.PropTypes.string,
  leftIconName: React.PropTypes.element,

  children: React.PropTypes.node,

  /**
   * The css class name of the root element.
   */
  className: React.PropTypes.string,

  /**
   * The text string to use for the default value.
   */
  defaultValue: React.PropTypes.any,

  /**
   * Disables the text field if set to true.
   */
  disabled: React.PropTypes.bool,

  /**
   * The style object to use to override error styles.
   */
  errorStyle: React.PropTypes.object,

  /**
   * The error content to display.
   */
  errorText: React.PropTypes.node,

  /**
   * If true, the floating label will float even when there is no value.
   */
  floatingLabelFixed: React.PropTypes.bool,

  /**
   * The style object to use to override floating label styles.
   */
  floatingLabelStyle: React.PropTypes.object,

  /**
   * The content to use for the floating label element.
   */
  floatingLabelText: React.PropTypes.node,

  /**
   * If true, the field receives the property width 100%.
   */
  fullWidth: React.PropTypes.bool,

  /**
   * Override the inline-styles of the TextField's hint text element.
   */
  hintStyle: React.PropTypes.object,

  /**
   * The hint content to display.
   */
  hintText: React.PropTypes.node,

  /**
   * The id prop for the text field.
   */
  id: React.PropTypes.string,

  /**
   * Override the inline-styles of the TextField's input element.
   * When multiLine is false: define the style of the input element.
   * When multiLine is true: define the style of the container of the textarea.
   */
  inputStyle: React.PropTypes.object,

  /**
   * If true, a textarea element will be rendered.
   * The textarea also grows and shrinks according to the number of lines.
   */
  multiLine: React.PropTypes.bool,

  /**
   * Name applied to the input.
   */
  name: React.PropTypes.string,

  /**
   * Callback function that is fired when the textfield loses focus.
   */
  onBlur: React.PropTypes.func,

  /**
   * Callback function that is fired when the textfield's value changes.
   */
  onChange: React.PropTypes.func,

  /**
   * Callback function that is fired when the textfield gains focus.
   */
  onFocus: React.PropTypes.func,

  /**
   * Callback function fired when key is pressed down.
   */
  onKeyDown: React.PropTypes.func,

  /**
   * Number of rows to display when multiLine option is set to true.
   */
  rows: React.PropTypes.number,

  /**
   * Maximum number of rows to display when
   * multiLine option is set to true.
   */
  rowsMax: React.PropTypes.number,

  /**
   * Override the inline-styles of the root element.
   */
  style: React.PropTypes.object,

  /**
   * Override the inline-styles of the TextField's textarea element.
   * The TextField use either a textarea or an input,
   * this property has effects only when multiLine is true.
   */
  textareaStyle: React.PropTypes.object,

  /**
   * Specifies the type of input to display
   * such as "password" or "text".
   */
  type: React.PropTypes.string,

  /**
   * Override the inline-styles of the
   * TextField's underline element when disabled.
   */
  underlineDisabledStyle: React.PropTypes.object,

  /**
   * Override the inline-styles of the TextField's
   * underline element when focussed.
   */
  underlineFocusStyle: React.PropTypes.object,

  /**
   * If true, shows the underline for the text field.
   */
  underlineShow: React.PropTypes.bool,

  /**
   * Override the inline-styles of the TextField's underline element.
   */
  underlineStyle: React.PropTypes.object,

  /**
   * The value of the text field.
   */
  value: React.PropTypes.any,
};

