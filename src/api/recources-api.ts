import { baseUrl } from '../utils/const.ts';
import HTTP from '../core/http.ts';
import { BaseAPI } from './base-api.ts';

const resourcesApi = new HTTP(`${baseUrl}/resources`);

class ResourcesApi extends BaseAPI {
  request(path: string) {
    return resourcesApi.get(`${path}`, {});
  }
}
export default new ResourcesApi();
