import 'date-fns';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {
    CheckCircleOutline as CheckCircleOutlineIcon,
    Error as ErrorIcon
} from '@material-ui/icons';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import {
    Button,
    Checkbox,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@material-ui/core';

import flatten from "core-js/fn/array/flatten";

class CustomFormBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: { ...props.defaultValues },
            inputs: { ...props.inputs },
            canRender: [],
            validationErrors: {},
            randomisedFields: {},
            longUrl: null
        };

        this.filterRules = {
            numeric: value => (
                /^$|^[0-9]+$/.test(value)
            ),
            decimal: value => (
                /^$|^[\d.]+$/.test(value)
            ),
        };

        this.transformerRules = {
            uppercase: value => (
                value.toUpperCase()
            ),
            lowercase: value => (
                value.toLowerCase()
            ),
            replacedashes: value => (
                value.replace(/-/g, '_')
            )
        };

        this.validationRules = {
            required: value => {
                if (typeof value === 'object') {
                    value = Object.keys(value);
                }

                if (typeof value === 'string' || Array.isArray(value)) {
                    return !!value.length;
                }

                return value !== null && value !== undefined;
            },
            email: value => (
                !value || /^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
            ),
            decimal: value => (
                !value || /^$|^\d+$|^\.\d+|^\d+\.\d+$/.test(value)
            ),
            url: value => (
                !value || /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value)
            )
        };

        this.validateForm = this.validateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.propagateChange = this.propagateChange.bind(this);
    }

    static flatInputs(entity) {
        return flatten(entity);
    }

    static getDerivedStateFromProps({ form }, state) {
        const { form: values, validationErrors: errors, randomisedFields } = state;
        const inputs = CustomFormBuilder.flatInputs(form);

        const newRandomisedFields = { ...randomisedFields };
        const newValues = { ...values };
        const newErrors = { ...errors };
        const canRender = [];

        inputs.forEach(({ name, renderIf, autocomplete }) => {
            if (typeof renderIf === 'function' && !renderIf(state)) {
                delete newValues[name];
                delete newErrors[name];
            } else {
                canRender.push(name);
            }

            if (autocomplete === false) {
                if(!newRandomisedFields[name]) {
                    newRandomisedFields[name] = (
                        Math.random().toString(36).substring(7)
                    );
                }

                return;
            }

            delete newRandomisedFields[name];
        });

        return {
            ...state,
            inputs: form,
            canRender: canRender,
            form: newValues,
            validationErrors: newErrors,
            randomisedFields: newRandomisedFields
        };
    }

    componentDidUpdate(prevProps) {
        console.log(this.state);
        const { values: ppValues } = prevProps
        const { values: pValues } = this.props

        if (pValues) {
            if (JSON.stringify(pValues) !== JSON.stringify(ppValues)) {
                const form = {
                    ...ppValues, ...pValues
                };

                this.propagateChange(form);
            }
        }

        return null
    }

    applyFilter(event, filter) {
        switch (filter.constructor) {
            case(RegExp):
                return filter.test(event.target.value);
            case(Function):
                return filter(event);
            case(String):

                //Might be regex if it has been stored as JSON
                if (filter[0] === '/' && filter[filter.length - 1] === '/') {
                    const regex = new RegExp(filter.substring(1, filter.length - 1));

                    return regex.test(event.target.value);
                }

                try {
                    return this.filterRules[filter](event.target.value);
                } catch (e) {
                    console.error(`Invalid filter rule ${filter} used on input ${event.target.name}`);

                    return true;
                }
            default:
                console.error(`Invalid filter type of ${filter.constructor} on input ${event.target.name}`);

                return true;
        }
    }

    applyTransformer(event, transformer) {
        switch (transformer.constructor) {
            case(Function):
                return transformer(event);
            case(String):
                return this.transformerRules[transformer](event.target.value);
            default:
                console.error(`Invalid transformer type of ${transformer.constructor} on input ${event.target.name}`);

                return event.target.value;
        }
    }

    validateInput(name, value, rules) {
        let valid = true;
        let errorMessage = null;

        if (!Array.isArray(rules)) {
            rules = [rules];
        }

        rules.forEach((rule) => {
            let ruleMessage = null;

            if (rule.constructor === Object) {
                ruleMessage = rule.message;
                rule = rule.rule;
            }

            switch (rule.constructor) {
                case(Function):
                    if (!rule(name, value)) {
                        errorMessage = ruleMessage;
                        valid = false;
                    }

                    break;
                case(RegExp):
                    if (!rule.test(value)) {
                        errorMessage = ruleMessage;
                        valid = false;
                    }

                    break;
                case(String):

                    //Might be regex if it has been stored as JSON
                    if (rule[0] === '/' && rule[rule.length - 1] === '/') {
                        const regex = new RegExp(rule.substring(1, rule.length - 1));

                        if (!regex.test(value)) {
                            errorMessage = ruleMessage;
                            valid = false;

                            break;
                        }
                    }

                    try {
                        if (!this.validationRules[rule](value)) {
                            errorMessage = ruleMessage;
                            valid = false;
                        }
                    } catch (e) {
                        console.error(`Invalid filter rule ${rule} used on input ${name}`);
                    }

                    break;
                default:
                    console.error(`Invalid validation type of ${rule.constructor} on input ${name}`);
            }
        });

        const validationError = {
            [name]: valid ? false : errorMessage || true,
        };

        return [ valid, validationError ];
    }

    applyValidation(event, validation, onlyValid = false) {
        let { validationErrors } = this.state;
        let [ valid, validationError ] =
            this.validateInput(event.target.name, event.target.value, validation);

        validationErrors = {
            ...validationErrors,
            ...validationError,
        };

        if ((onlyValid && valid) || !onlyValid) {
            this.setState({
                validationErrors,
            });
        }

        return validationErrors;
    }

    propagateChange(form, validationErrors) {
        const { onChange } = this.props;

        const callback = () => {
            const [ valid, errors ] = this.validateForm(false);

            validationErrors = errors || validationErrors;

            onChange({
                valid,
                data: {
                    form,
                    validationErrors,
                },
            })
        };

        this.setState(
            { form: { ...form } },
            callback
        );
    }

    handleInput(input, event) {
        event.persist();
        clearTimeout(this.timer);

        let validationErrors = {};

        if (input.filter && !this.applyFilter(event, input.filter)) {
            return;
        }

        let value = event.target.value;

        if (input.type === 'checkbox') {
            value = event.target.checked;
        }

        if (input.transformer && input.transformer.onChange) {
            value = this.applyTransformer(event, input.transformer.onChange);
        }

        if (input.validationRules) {
            const { validationTimeout } = this.props;

            // The third parameter, true, means that the input will not show as invalid
            // while the user is typing
            validationErrors = this.applyValidation(event, input.validationRules, true);

            this.timer = setTimeout(() => (
                this.applyValidation(event, input.validationRules)
            ), validationTimeout);
        }

        let { form } = this.state;

        form[input.name] = (
            value && typeof value === 'object' && !Array.isArray(value)
                ? value.value
                : value
        );

        this.propagateChange(form, validationErrors);
    }

    handleBlur(input, event) {
        clearTimeout(this.timer);

        let { form } = this.state;

        let value = event.target.value;
        let validationErrors = {};

        if (input.transformer && input.transformer.onBlur) {
            value = this.applyTransformer(event, input.transformer.onBlur);
        }

        if (input.validationRules) {
            validationErrors = this.applyValidation(event, input.validationRules);
        }

        if (form[input.name] !== value) {
            form[input.name] = value;

            this.propagateChange(form, validationErrors);
        }
    }

    validateForm(display = true) {
        const { form } = this.props;

        let invalid = false;
        let { validationErrors, form: stateForm } = this.state;

        flatten(form).forEach((input) => {
            if (!input.validationRules) {
                return;
            }

            let [ valid, validationError ] =
                this.validateInput(input.name, stateForm[input.name], input.validationRules);

            validationErrors = {
                ...validationErrors,
                ...validationError
            };

            if (!valid) {
                invalid = true;
            }
        });

        if (display) {
            this.setState({
                validationErrors,
            });

            return [ !invalid, validationErrors ];
        }

        return [ !invalid, validationErrors ];
    }

    getInputValidationError(inputName) {
        const { validationErrors } = this.state;
        const { formErrors } = this.props;
      
        const validationError = validationErrors[inputName];
        const propError = formErrors[inputName];
        
        return (validationError && validationError !== true) ? validationError : propError;
    }
    
    submitForm() {
        const { form, inputs } = this.state;
        const { onSubmit } = this.props;

        let input_array = [];
        inputs.forEach((input, i) => {
            if (input.constructor === Array) {
                input.forEach((nest_input, k) => {
                    let obj = {};
                    if (form.hasOwnProperty(nest_input.name)) {
                        obj[nest_input.name] = form[nest_input.name]
                    } else if (nest_input.defaultValue) {
                        obj[nest_input.name] = nest_input.defaultValue;
                    } else {
                        obj[nest_input.name] = 'null';
                    }
                    input_array.push(obj);
                })
            } else {
                let obj = {};
                if (form.hasOwnProperty(input.name)) {
                    obj[input.name] = form[input.name]
                } else if (input.defaultValue) {
                    obj[input.name] = input.defaultValue;
                } else {
                    obj[input.name] = 'null';
                }
                input_array.push(obj);
            }
        })

        if (onSubmit) {
            let [ valid, validationErrors ] = this.validateForm();

            onSubmit({
                valid: valid,
                data: {
                    input_array,
                    validationErrors,
                },
            });
        }
    }

    renderCustomInput(input) {
        const { form } = this.state;

        if (typeof input.render !== 'function') {
            if (!React.isValidElement(input.render)) {
                return input.render;
            }

            return (
                React.cloneElement(
                    input.render,
                    {
                        name: input.name,
                        placeholder: input.placeholder,
                        value: form[input.name] || '',
                        onChange: this.handleBlur.bind(this, input),
                        onBlur: this.handleBlur.bind(this, input),
                        invalid: !!this.getInputValidationError(input.name) || undefined
                    }
                )
            );
        }

        return input.render(
            input,
            form[input.name] || '',
            this.handleInput.bind(this, input),
            this.handleBlur.bind(this, input),
            this.getInputValidationError(input.name),
            this.state
        );
    }

    renderInput(input, colWidth) {
        if (input.constructor === Array) {
            return this.renderInputs(input, colWidth);
        }

        const { form, validationErrors, randomisedFields } = this.state;

        const {
            formErrors,
            classPrefix,
            defaultInputClass,
            invalidInputClass,
            validInputClass,
        } = this.props;

        if (input.render) {
            return this.renderCustomInput(input);
        }

        const props = {
            className: `${classPrefix}-${input.inputClass || defaultInputClass || ''} ${validationErrors[input.name] || formErrors[input.name] ? invalidInputClass : validationErrors[input.name] === false ? validInputClass : ''}`,
            name: randomisedFields[input.name] || input.name,
            value: form[input.name] || input.defaultValue || '',
            placeholder: input.placeholder,
            id: input.name,
            onChange: this.handleInput.bind(this, input),
            onBlur: this.handleBlur.bind(this, input),
            ...input.htmlProps,
        };

        switch (input.type) {
            case("custom"):
                return this.renderCustomInput(input);
            case("date"):
                return (
                    <Grid item xs={colWidth}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            {this.renderLabel(input)}
                            <KeyboardDatePicker
                                fullWidth
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                )
            case("select"):
                return (
                    <Grid item xs={colWidth}>
                        <FormControl
                            fullWidth
                        >
                            {this.renderLabel(input)}
                            <Select
                                disabled={input.disabled || false}
                                inputProps={props}
                            >
                                {(input.options || []).map((option) => {
                                    return (
                                        <MenuItem value={option.value}>{option.text}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                );
            default:
                return (
                        <Grid item xs={colWidth}>
                            <FormControl
                                fullWidth
                            >
                                {this.renderLabel(input)}
                                <Input
                                    disabled={input.defaultValue ? (input.disabled || false) : false}
                                    error={validationErrors[input.name]}
                                    type={input.type}
                                    inputProps={props}
                                    endAdornment={ input.validationRules ?
                                        <InputAdornment position="end">
                                            {validationErrors[input.name] ? <ErrorIcon style={{color: 'red'}} /> : <CheckCircleOutlineIcon style={{color: 'green'}} />}
                                        </InputAdornment> : false
                                    }
                                />
                            </FormControl>
                        </Grid>
                );
        }
    }

    renderLabel(input) {
        if (!input.label) {
            return;
        }

        const { classPrefix, defaultLabelClass } = this.props;
        const props = {
            className: classPrefix + '-' + (input.label.className || defaultLabelClass || ''),
            htmlFor: input.name,
        };

        if (typeof input.label === 'function') {
            return input.label(props);
        }

        if (input.label) {
            return (
                <InputLabel
                    shrink={true}
                    style={{fontSize: 18}}
                    htmlFor={props.htmlFor}
                >
                    {input.label.text || input.label}
                </InputLabel>
            );
        }
    }

    renderValidationErrors(input) {
        const { classPrefix, defaultValidationErrorClass } = this.props;
        const validationError = this.getInputValidationError(input.name);

        if (validationError) {
            return (
                <p className={`${classPrefix}-${defaultValidationErrorClass || ''}`}>
                    {validationError}
                </p>
            );
        }
    }

    renderSubmitButton() {
        const { submitButton, classPrefix, defaultSubmitClass, loading } = this.props;

        if (submitButton) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    className={`${classPrefix}-${submitButton.className || defaultSubmitClass || ''} ${this.validateForm(false) ? '' : 'invalid'} ${loading ? 'loading' : ''}`}
                    onClick={this.submitForm}
                >
                    {this.renderSubmitButtonContents()}
                </Button>
            );
        }
    }

    renderSubmitButtonContents() {
        const { submitButton, loading, loadingElement } = this.props;

        if (loading && loadingElement) {
            return loadingElement;
        }

        return submitButton.text;
    }

    renderInputs(inputs, colWidth = 12) {
        const { canRender } = this.state;
        const { classPrefix, defaultContainerClass } = this.props;

        inputs = inputs.filter(input => (
            canRender.includes(input.name) || input.constructor === Array
        ));

        return (
            <Fragment>
                {inputs.map((input, i) => {
                    const isArray = input.constructor === Array;
                    if (isArray) {
                        if (input.length === 2) {
                            colWidth = 6
                        } else if (input.length === 3) {
                            colWidth = 4
                        }
                    }

                    if (input.name === 'landing url') {
                        colWidth = 12
                    }

                    return (
                        <Fragment key={i}>
                            {this.renderInput(input, colWidth)}
                            {!isArray && this.renderValidationErrors(input)}
                        </Fragment>
                    );
                })}
            </Fragment>
        );
    }

    render() {
        try {
            const { inputs, form: values } = this.state;
            return (
                <Fragment>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={4}
                    >
                        {this.renderInputs(inputs)}
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            {this.renderSubmitButton()}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="h3"
                            >
                                {this.state.longUrl}
                            </Typography>
                        </Grid>
                    </Grid>
                </Fragment>
            );
        } catch (e) {
            console.error(e);

            return (
                <p>Error rendering form</p>
            );
        }
    }
}

CustomFormBuilder.defaultProps = {
    defaultValues: {},
    values: null,
    classPrefix: 'rdf',
    defaultContainerClass: 'container',
    defaultInputClass: 'input',
    defaultValidationErrorClass: 'error-label',
    defaultLabelClass: 'label',
    form: [],
    defaultSubmitClass: 'submit',
    invalidInputClass: 'invalid',
    validInputClass: 'valid',
    loading: false,
    loadingElement: null,
    formErrors: {},
    validationTimeout: 1000,
    onChange: () => null,
};

CustomFormBuilder.propTypes = {
    defaultValues: PropTypes.object,
    values: PropTypes.object,
    defaultInputClass: PropTypes.string,
    defaultLabelClass: PropTypes.string,
    defaultContainerClass: PropTypes.string,
    defaultValidationErrorClass: PropTypes.string,
    form: PropTypes.array.isRequired,
    submitButton: PropTypes.object,
    validationTimeout: PropTypes.number,
    classPrefix: PropTypes.string,
    loading: PropTypes.bool,
    defaultSubmitClass: PropTypes.string,
    invalidInputClass: PropTypes.string,
    validInputClass: PropTypes.string,
    loadingElement: PropTypes.element,
    formErrors: PropTypes.object,
    onChange: PropTypes.func,
};

export default CustomFormBuilder;
