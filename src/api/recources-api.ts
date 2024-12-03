import { baseUrl } from '@utils/const';
import HTTP from '../core/http';
import { BaseAPI } from './base-api';

const resourcesApi = new HTTP(`${baseUrl}/resources`);

class ResourcesApi extends BaseAPI {
  request(path: string) {
    return resourcesApi.get(`${path}`, {});
  }
}
export default new ResourcesApi();
