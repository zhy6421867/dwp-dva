import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { logo } from 'utils/config';
import { isPhone, isUserName, isEmail, isPassword } from 'utils/judge';
import styles from './index.less';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

function validateToken(value) {
  if (!value || value === '') {
    return {
      validateStatus: 'error',
      errorMsg: '请输入用户名',
    };
  }
  if (!isUserName(value) && !isUserName(value) && !isEmail(value)) {
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

function validatePsw(value) {
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

class WrappedLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: {
        value: null,
      },
      password: {
        value: null,
      },
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.token.validateStatus === 'success' && this.state.password.validateStatus) {
      this.props.dispatch({
        type: 'login/loginAction',
        payload: {
          token: this.state.token.value,
          password: this.state.password.value,
        },
      });
    }
  };
  handleTokenChange = (e) => {
    this.setState({
      token: {
        ...validateToken(e.target.value),
        value: e.target.value,
      },
    });
  };
  handlePswChange = (e) => {
    this.setState({
      password: {
        ...validatePsw(e.target.value),
        value: e.target.value,
      },
    });
  };
  render() {
    const { token, password } = this.state
    return (
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className="form">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              hasFeedback
              validateStatus={token.validateStatus}
              help={token.errorMsg}
            >
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="用户名"
                type="text"
                maxLength="20"
                value={token.value}
                onChange={this.handleTokenChange}
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
                onChange={this.handlePswChange}
              />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className={styles.btn}>登  录</Button>
            </FormItem>
          </Form>
        </div>
        <Link to="register" className={styles.link}>注册</Link>
      </div>
    );
  }
}

WrappedLogin.propTypes = {
};

export default connect(({ login }) => ({ login }))(WrappedLogin);
