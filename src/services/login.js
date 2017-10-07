import request from 'utils/request';

export async function login(data) {
  return request({
    url: 'api/login',
    method: 'POST',
    data,
  });
}
