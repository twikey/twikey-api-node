import {BaseService} from "./BaseService";
import {
  Transaction,
  TransactionRequest,
  TransactionResponse,
  TransactionUpdateRequest,
} from "../../models/Transaction";
import {FeedOptions} from "../../models/Document";

export class TransactionService extends BaseService {
  async create(request: TransactionRequest): Promise<Transaction> {
    return this.post("/transaction", request).then(value => value.data.Entries[0]);
  }

  async detail(id: string): Promise<TransactionResponse> {
    return this.get(`/transaction/detail`, { id }).then(value => value.data);
  }

  async *feed(options?: FeedOptions): AsyncGenerator<Transaction> {

    const formData = new URLSearchParams();
    let _headers:any = {};
    if(options){
      if(options.start_position)
        _headers['X-RESUME-AFTER'] = options.start_position;
      if(options.includes){
        for (const include of options.includes) {
          formData.append("include", include);
        }
      }
    }
    else {
      options = {}
    }

    let isEmpty = false;
    while (!isEmpty) {
      const response = await this.get("/transaction", formData, _headers);
      if (!response.data.Entries.length) {
        isEmpty = true;
      } else {
        options.last_position = response.headers['x-last'];
        for (const transaction of response.data.Entries) {
          yield transaction;
        }
      }
    }
  }

  async update(transactionId: string, update: TransactionUpdateRequest): Promise<TransactionResponse> {
    return this.post(`/transaction/${transactionId}`, update).then(value => value.data);
  }
}
