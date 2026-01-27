import {BaseService, PdfResponse} from "./BaseService";
import {
  DocumentFeedMessage,
  DocumentRequest,
  DocumentResponse,
  DocumentSignRequest,
  FeedOptions,
} from "../../models/Document";

export class DocumentService extends BaseService {
  async create(request: DocumentRequest): Promise<DocumentResponse> {
    return this.post("/invite", request).then(value => value.data);
  }

  async sign(request: DocumentSignRequest): Promise<DocumentResponse> {
    return this.post("/sign", request).then(value => value.data);
  }

  async detail(mndtId: string): Promise<DocumentResponse> {
    return this.get(`/mandate/detail`, { mndtId }).then(value => value.data);
  }

  async *feed(options?: FeedOptions): AsyncGenerator<DocumentFeedMessage> {

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
      const response = await this.get("/mandate", formData, _headers);
      let data = response.data.Messages
      if (!data.length) {
        isEmpty = true;
      } else {
        options.last_position = response.headers['x-last'];
        for (const document of data) {
          if (!document.AmdmtRsn && !document.CxlRsn) {
            document.IsNew = true;
          }
          if (document.AmdmtRsn) {
            document.IsUpdated = true;
          }
          if (document.CxlRsn) {
            document.IsCancelled = true;
          }
          yield document;
        }
      }
    }
  }

  async updateStatus(mandateId: string, status: string): Promise<void> {
    await this.post(`/mandate/${mandateId}`, { status });
  }

  async pdf(mndtId: string): Promise<PdfResponse> {
    return this.getPdf(`/mandate/pdf?mndtId=${mndtId}`, `${mndtId}.pdf`);
  }

  async uploadPdf(mndtId: string, pdfContent: Buffer): Promise<void> {
    return this.postPdf(`/mandate/pdf?mndtId=${mndtId}`, pdfContent);
  }
}
