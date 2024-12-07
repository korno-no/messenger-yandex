type Options = {
  method?: METHOD;
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
};

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
type HTTPMethod = <R=unknown>(url: string, options: Options) => Promise<R>

export default class HTTPTransport {
  protected url: string;
  
  constructor(url: string = ""){
		this.url = url;
	}


  queryStringify(data: { [key: string]: unknown }) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${
      index < keys.length - 1 ? '&' : ''
    }`, '?');
  }
 

  get:HTTPMethod = (url, options?:Options) => this.request(
    `${this.url}${url}`,
    { ...options, method: METHOD.GET },
    options?.timeout,
  );

  put = (url: string, options: Options) => this.request(
    `${this.url}${url}`,
    { ...options, method: METHOD.PUT },
    options.timeout,
  );

  post = (url: string, options: Options) => this.request(
    `${this.url}${url}`,
    { ...options, method: METHOD.POST },
    options.timeout,
  );

  delete = (url: string, options: Options) => this.request(
    `${this.url}${url}`,
    { ...options, method: METHOD.DELETE },
    options.timeout,
  );

  request = <R = unknown>(url: string, options: Options, timeout = 5000): Promise<R> => {
    const withCredentials = true;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if(options.method){

        xhr.open(options.method, options.method === METHOD.GET && !!options.data
          ? `${url}${this.queryStringify(options.data)}`
          : url);
    
        if (options.headers) {
          Object.keys(options.headers).forEach((key) => {
            xhr.setRequestHeader(key, options.headers![key]);
          });
        }

    
        xhr.timeout = timeout;
        xhr.withCredentials = withCredentials;

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              
              if (xhr.responseText === 'OK') {
                resolve({ message: 'OK' } as R);
              } else {
                // Attempt to parse JSON response
                const response = JSON.parse(xhr.responseText) as R;
                resolve(response);
              }
            } catch (error: any) {
              reject( new Error(error));
            }
          }else {
            reject(new Error(xhr.responseText));
          }
        };

        xhr.onerror = () => {
          reject(new Error('Network error')); 
        };

        xhr.ontimeout = () => {
          reject(new Error('Request timed out')); 
        };
    
        if (options.method === METHOD.GET || !options.data) {
          xhr.send();
        } else if(options.data instanceof FormData){
          xhr.send(options.data);
        } 
        else if (options.data) {
          xhr.send(JSON.stringify(options.data));
        }
      }
      
    });
  };
}
