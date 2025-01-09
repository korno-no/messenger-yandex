
import HTTPTransport from './http.ts'
import { expect } from 'chai';
import sinon from 'sinon'
import { METHOD } from './http.ts';
import { baseUrl } from '../utils/const.ts';

describe('HttpTransport', () => {

    

    afterEach(() => {
        sinon.restore();
    })

    it('should do GET request', async () => {

        const http = new HTTPTransport('/test');
        const requestStub = sinon.stub(http, 'request').resolves();

        const url = '';
        await http.get(url, {});

        expect(requestStub.calledWithMatch(baseUrl, { method: METHOD.GET }));
    })


    it('should do POST request', async () => {
        const http = new HTTPTransport('/test');
        const requestStub = sinon.stub(http, 'request').resolves();
        const options: { [key: string]: any } = {
            options: {}
        };
        const url = '';
        await http.post(url, options);

        expect(requestStub.calledWithMatch(baseUrl, {method: METHOD.POST}));
    })

    it('should do PUT request', async () => {
        const http = new HTTPTransport('/test');
        const requestStub = sinon.stub(http, 'request').resolves();
        const options: { [key: string]: any } = {
            options: {}
        };
        const url = '';
        await http.put(url, options);

        expect(requestStub.calledWithMatch(baseUrl, {method: METHOD.PUT}));
    })
    it('should do DELETE request', async () => {
        const http = new HTTPTransport('/test');
        const requestStub = sinon.stub(http, 'request').resolves();
        const options: { [key: string]: any } = {
            options: {}
        };
        const url = '';
        await http.delete(url, options);

        expect(requestStub.calledWithMatch(baseUrl, {method: METHOD.DELETE}));
    })
})
