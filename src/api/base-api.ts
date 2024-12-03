export class BaseAPI {
  apiEndpoint: string = 'ya-praktikum.tech/api/v2';

  // In case you forget to override the method and use it, an error will be thrown
  create(args?: unknown) { throw new Error(`Not implemented ${args}`); }

  request(args?: unknown) { throw new Error(`Not implemented ${args}`); }

  update(args?: unknown) { throw new Error(`Not implemented ${args}`); }

  delete(args?: unknown) { throw new Error(`Not implemented ${args}`); }
}
