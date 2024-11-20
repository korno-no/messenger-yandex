export class BaseAPI {

    apiEndpoint: string = 'ya-praktikum.tech/api/v2'
    // In case you forget to override the method and use it, an error will be thrown
    create(args?: unknown) { throw new Error('Not implemented'); }

    request(args?: unknown) { throw new Error('Not implemented'); }

    update(args?: unknown) { throw new Error('Not implemented'); }

    delete(args?: unknown) { throw new Error('Not implemented'); }
}