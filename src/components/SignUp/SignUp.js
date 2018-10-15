import React, {Component} from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'
import * as restaurantAction from  '../../store/modules/restaurant'
import Title from '../Title/Title'
import './SignUp.css'



const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class SignUpForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                span: 24,
                offset: 0,
                },
                sm: {
                span: 16,
                offset: 8,
                },
            },
        }

        return (

            <div>
                <Title />
                <div className='login-form'>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                        {...formItemLayout}
                        label="Email"
                        >
                        {getFieldDecorator('email', {
                            rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                            required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Password"
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                required: true, message: 'Please input your password!',
                                }, {
                                validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Confirm Password"
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                required: true, message: 'Please confirm your password!',
                                }, {
                                validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>
                    
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

const WrappedSignUpForm = Form.create()(SignUpForm)

export default connect(
    (state) => ({
        selectedCityID : state.restaurant.selectedCityID
        
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)( WrappedSignUpForm )