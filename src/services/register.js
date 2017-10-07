import request from 'utils/request';

export async function register(data) {
  return request({
    url: 'api/signup',
    method: 'POST',
    data,
  });
}
