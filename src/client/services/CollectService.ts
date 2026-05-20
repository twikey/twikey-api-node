import {BaseService} from "./BaseService";
import {CollectQueryRequest, CollectRequest, CollectResponse} from "../../models/Collect";

export class CollectService extends BaseService {

  async collect(request: CollectRequest): Promise<CollectResponse> {
    return this.post("/collect", request).then(value => value.data);
  }

  async detail(params: Record<string, string | number | boolean | undefined>): Promise<CollectResponse> {
    return this.get("/collect", params).then(value => value.data);
  }

  async query(params: CollectQueryRequest): Promise<CollectResponse[]> {
    return this.get("/collect/query", params).then(value => value.data);
  }
}
