type Options = {
  method: METHOD;
  headers: [string, string][];
  data?: any;
  timeout?: number;
};

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HTTPMethod = <R=unknown>(url: string, options: Options) => Promise<R>

export default class HTTPTransport {
  queryStringify(data: { [key: string]: unknown }) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${
      index < keys.length - 1 ? '&' : ''
    }`, '?');
  }

  get:HTTPMethod = (url, options) => this.request(
    url,
    { ...options, method: METHOD.GET },
    options.timeout,
  );

  put = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHOD.PUT },
    options.timeout,
  );

  post = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHOD.POST },
    options.timeout,
  );

  delete = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHOD.DELETE },
    options.timeout,
  );

  request = <R = unknown>(url: string, options: Options, timeout = 5000): Promise<R> => {
    console.log(timeout);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, options.method === METHOD.GET && !!options.data
        ? `${url}${this.queryStringify(options.data)}`
        : url);
  
      if (options.headers) {
        options.headers.forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }
  
      xhr.onload = () => {
        try {
          const response = JSON.parse(xhr.responseText) as R;
          resolve(response);
        } catch (error) {
          reject(error);
        }
      };
  
      xhr.onerror = () => {
        reject(new Error('Network error')); 
      };
  
      xhr.timeout = timeout;
      xhr.ontimeout = () => {
        reject(new Error('Request timed out')); 
      };
  
      if (options.method === METHOD.GET || !options.data) {
        xhr.send();
      } else if (options.data) {
        xhr.send(JSON.stringify(options.data));
      }
    });
  };
}
