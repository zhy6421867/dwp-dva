import React from 'react';

class SearchAccounts extends React.Component {
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
  render() {
    return (
      <div>账号搜索</div>
    );
  }
}

SearchAccounts.propTypes = {
};

export default SearchAccounts;
