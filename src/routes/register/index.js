import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { logo } from 'utils/config';
import { isPhone, isUserName, isEmail, isPassword, isNum } from 'utils/judge';
import styles from './index.less';
import { Form, Icon, Input, Button, message } from 'antd';
import request from 'utils/request';
import axios from 'axios';

const FormItem = Form.Item;

function validateUserName(value) {
  if (!value || value === '') {
    return {
      validateStatus: 'error',
      errorMsg: '请输入用户名',
    };
  }
  if (!isUserName(value)) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入正确的用户名',
    };
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  };
}

function validateMobile(value) {
  if (!value || value === '') {
    return {
      validateStatus: 'error',
      errorMsg: '请输入手机号码',
    };
  }
  if (!isPhone(value)) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入正确的手机号码',
    };
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  };
}

function validateMobileToken(value) {
  if (!value || value === '') {
    return {
      validateStatus: 'error',
      errorMsg: '请输入验证码',
    };
  }
  if (!isNum(value)) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入正确的验证码',
    };
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  };
}

function validatePassword(value) {
  if (!value || value === '') {
    return {
      validateStatus: 'error',
      errorMsg: '请输入密码',
    };
  }
  if (!isPassword(value)) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入正确的密码',
    };
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  };
}

function validateEmail(value) {
  if (!value || value === '') {
    return {};
  }
  if (value && !isEmail(value)) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入正确的邮箱',
    };
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  };
}

function validateName(value) {
  if (!value || value === '') {
    return {};
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  };
}

function validateCompany(value) {
  if (!value || value === '') {
    return {};
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  };
}

function validatePosition(value) {
  if (!value || value === '') {
    return {};
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  };
}

class WrappedRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: null,
      },
      mobile: {
        value: null,
      },
      mobileToken: {
        value: null,
      },
      password: {
        value: null,
      },
      email: {
        value: null,
      },
      name: {
        value: null,
      },
      company: {
        value: null,
      },
      position: {
        value: null,
      },
      sendAb: false,
      sendText: '发送验证码',
      sendToken: null,
    };
  }
  handleUserNameChange = (e) => {
    this.setState({
      username: {
        ...validateUserName(e.target.value),
        value: e.target.value,
      },
    });
  };
  handleMobileChange = (e) => {
    this.setState({
      mobile: {
        ...validateMobile(e.target.value),
        value: e.target.value,
      },
    });
  };
  handleMobileTokenChange = (e) => {
    this.setState({
      mobileToken: {
        ...validateMobileToken(e.target.value),
        value: e.target.value,
      },
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: {
        ...validatePassword(e.target.value),
        value: e.target.value,
      },
    });
  };
  handleEmailChange = (e) => {
    this.setState({
      email: {
        ...validateEmail(e.target.value),
        value: e.target.value,
      },
    });
  };
  handleNameChange = (e) => {
    this.setState({
      name: {
        ...validateName(e.target.value),
        value: e.target.value,
      },
    });
  };
  handleCompanyChange = (e) => {
    this.setState({
      company: {
        ...validateCompany(e.target.value),
        value: e.target.value,
      },
    });
  };
  handlePositionChange = (e) => {
    this.setState({
      position: {
        ...validatePosition(e.target.value),
        value: e.target.value,
      },
    });
  };
  handleSend = () => {
    if (!this.state.mobile.value || this.state.mobile.value === '') {
      this.setState({
        mobile: {
          validateStatus: 'error',
          errorMsg: '手机号码不能为空',
        },
      });
      return;
    }
    if (!isPhone(this.state.mobile.value)) {
      this.setState({
        mobile: {
          validateStatus: 'error',
          errorMsg: '请输入正确的手机号码',
        },
      });
      return;
    }
    this.setState({
      sendAb: true,
    });
    let sendCount = 60;
    this.time = setInterval(() => {
      if (sendCount > 0) {
        sendCount--;
        this.setState({
          sendText: `（${sendCount}）秒`,
        });
      } else {
        this.setState({
          sendAb: false,
          sendText: '发送验证码',
        });
        clearInterval(this.time);
      }
    }, 1000);
    if (this.state.sendToken) {
      axios.defaults.headers.common['Registration-Token'] = this.state.sendToken;
    }
    request({
      url: 'api/verification/mobile',
      method: 'POST',
      data: {
        mobile: this.state.mobile.value,
      },
    }).then((res) => {
      const { success, body } = res;
      if (success) {
        this.setState({
          sendToken: body['Registration-Token'],
        });
        message.success('发送成功！');
      }
    }).catch((err) => {
      message.error(err.message || '网络异常！');
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.email.value && this.state.email.validateStatus === 'error') {
      return;
    }
    if (this.state.sendToken) {
      axios.defaults.headers.common['Registration-Token'] = this.state.sendToken;
    }
    const b = this.state.username.validateStatus === 'success' &&
      this.state.mobile.validateStatus === 'success' &&
      this.state.mobileToken.validateStatus === 'success' &&
      this.state.password.validateStatus === 'success';
    if (b) {
      this.props.dispatch({
        type: 'register/registerAction',
        payload: {
          username: this.state.username.value,
          mobile: this.state.mobile.value,
          mobileToken: this.state.mobileToken.value,
          password: this.state.password.value,
          name: this.state.name.value ? this.state.name.value : null,
          company: this.state.company.value ? this.state.company.value : null,
          position: this.state.position.value ? this.state.position.value : null,
          email: this.state.email.value ? this.state.email.value : null,
        },
      });
    }
  };
  componentWillUnmount() {
    clearInterval(this.time);
  }
  render() {
    const {
      username,
      mobile,
      mobileToken,
      password,
      email,
      name,
      company,
      position,
      sendAb,
      sendText,
    } = this.state;
    const tokenBtn = (
      <Button type="primary" onClick={this.handleSend} disabled={sendAb}>{sendText}</Button>
    );
    return (
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className="form">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              hasFeedback
              validateStatus={username.validateStatus}
              help={username.errorMsg}
            >
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="用户名"
                type="text"
                maxLength="20"
                value={username.value}
                onChange={this.handleUserNameChange}
              />
            </FormItem>
            <FormItem
              hasFeedback
              validateStatus={mobile.validateStatus}
              help={mobile.errorMsg}
            >
              <Input
                prefix={<Icon type="mobile" style={{ fontSize: 13 }} />}
                placeholder="手机号码"
                type="num"
                maxLength="11"
                value={mobile.value}
                onChange={this.handleMobileChange}
              />
            </FormItem>
            <FormItem
              className="z-code-box"
              hasFeedback
              validateStatus={mobileToken.validateStatus}
              help={mobileToken.errorMsg}
            >
              <Input
                prefix={<Icon type="code" style={{ fontSize: 13 }} />}
                placeholder="验证码"
                type="num"
                maxLength="4"
                value={mobileToken.value}
                onChange={this.handleMobileTokenChange}
                addonAfter={tokenBtn}
              />
            </FormItem>
            <FormItem
              hasFeedback
              validateStatus={password.validateStatus}
              help={password.errorMsg}
            >
              <Input
                prefix={<Icon type="key" style={{ fontSize: 13 }} />}
                placeholder="密码"
                type="password"
                maxLength="20"
                value={password.value}
                onChange={this.handlePasswordChange}
              />
            </FormItem>
            <FormItem
              hasFeedback
              validateStatus={name.validateStatus}
              help={name.errorMsg}
            >
              <Input
                prefix={<Icon type="user-add" style={{ fontSize: 13 }} />}
                placeholder="姓名"
                type="text"
                maxLength="20"
                value={name.value}
                onChange={this.handleNameChange}
              />
            </FormItem>
            <FormItem
              hasFeedback
              validateStatus={company.validateStatus}
              help={company.errorMsg}
            >
              <Input
                prefix={<Icon type="compass" style={{ fontSize: 13 }} />}
                placeholder="公司"
                type="text"
                maxLength="40"
                value={company.value}
                onChange={this.handleCompanyChange}
              />
            </FormItem>
            <FormItem
              hasFeedback
              validateStatus={position.validateStatus}
              help={position.errorMsg}
            >
              <Input
                prefix={<Icon type="flag" style={{ fontSize: 13 }} />}
                placeholder="职位"
                type="text"
                maxLength="40"
                value={position.value}
                onChange={this.handlePositionChange}
              />
            </FormItem>
            <FormItem
              hasFeedback
              validateStatus={email.validateStatus}
              help={email.errorMsg}
            >
              <Input
                prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                placeholder="邮箱"
                type="email"
                maxLength="100"
                value={email.value}
                onChange={this.handleEmailChange}
              />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className={styles.btn}>注  册</Button>
            </FormItem>
          </Form>
        </div>
        <Link to="login" className={styles.link}>登录</Link>
      </div>
    );
  }
}

export default connect(({ register }) => ({ register }))(WrappedRegister);
