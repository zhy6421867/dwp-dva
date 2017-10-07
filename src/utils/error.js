import { message } from 'antd';

export function dealError(data) {
  message.error(data.message || '网络异常');
}

export function dealSuccess(data) {
  message.success(data.message || '成功！');
}
