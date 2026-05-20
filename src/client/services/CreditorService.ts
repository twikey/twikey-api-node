import { BaseService } from "./BaseService";
import {
    CustomerRequest,
    CustomerResponse,
} from "../../models/Creditor";

export class CreditorService extends BaseService {

    async getCustomer(ref: string): Promise<CustomerResponse> {
        return this.get(`/customer/${encodeURIComponent(ref)}`).then(r => r.data);
    }

    async replaceCustomer(ref: string, request: CustomerRequest): Promise<void> {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(request)) {
            if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        }
        await this.put(`/customer/${encodeURIComponent(ref)}`, formData);
    }

    async removeCustomer(ref: string): Promise<void> {
        await this.delete(`/customer/${encodeURIComponent(ref)}`);
    }

    async updateCustomer(ref: string, request: Partial<CustomerRequest>): Promise<void> {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(request)) {
            if (value !== undefined && value !== null) {
                params.append(key, String(value));
            }
        }
        await this.patch(`/customer/${encodeURIComponent(ref)}?${params.toString()}`);
    }
}
