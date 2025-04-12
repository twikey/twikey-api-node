import {BaseResponse, BaseService} from "./BaseService";
import {InvoiceRequest, InvoiceResponse, InvoiceUpdateRequest,} from "../../models/Invoice";
import {FeedOptions} from "../../models/Document";


export class InvoiceService extends BaseService {
  async create(request: InvoiceRequest): Promise<InvoiceResponse> {
    return this.post("/invoice", request, { "Content-Type": "application/json" }).then(value => value.data);
  }

  async detail(invoiceId: string): Promise<InvoiceResponse> {
    return this.get(`/invoice/${invoiceId}`).then(value => value.data);
  }

  async *feed(options?: FeedOptions): AsyncGenerator<InvoiceResponse> {

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
      const response = await this.get("/invoice", formData, _headers);
      options.last_position = response.headers['x-last'];
      if (!response.data.Invoices.length) { isEmpty = true; }

      for (const invoice of response.data.Invoices) {
        yield invoice;
      }
    }
  }

  async update(invoiceId: string, update: InvoiceUpdateRequest): Promise<BaseResponse<InvoiceResponse>> {
    return this.post(`/invoice/${invoiceId}`, update);
  }
}
