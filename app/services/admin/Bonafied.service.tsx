import AxiosService from "../../libs/axios.service";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";

class AdminBonafiedManagementService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
    // ******************| ADMIN Bonafied Management |***********************
    async getAllBonafied() {
        const URL = getApiRoute(API_ROUTES?.ADMIN?.BONAFIED?.GETALL);
        return await this.AXIOS.get(URL);
      }
}
export default new AdminBonafiedManagementService();