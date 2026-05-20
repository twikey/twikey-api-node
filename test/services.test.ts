import {FeedOptions, TwikeyClient} from "../src";
import * as process from "node:process";
import {describe, test} from "node:test";
import * as assert from 'assert';
import {faker} from '@faker-js/faker';

const noApiConfigured = !process.env.TWIKEY_API_KEY;

let cachedClient: TwikeyClient;
const getClient = () => {
    if (!cachedClient) {
        let url = "https://api.beta.twikey.com/creditor";
        if (process.env.TWIKEY_API_URL) {
            url = process.env.TWIKEY_API_URL;
        }
        cachedClient = new TwikeyClient({
            apiKey: process.env.TWIKEY_API_KEY || '',
            apiUrl: url,
            userAgent: "twikey-api-node-test"
        });
    }
    return cachedClient;
};

const CT = () => {
    const ct = process.env.CT;
    assert.ok(ct, "CT not defined");
    return Number(ct);
};

const importedMandate = async (client: TwikeyClient, suffix = '') => {
    const mandateNumber = 'IMPORT-SVC-' + suffix + faker.git.commitSha({ length: 8 });
    await client.document.sign({
        ct: CT(),
        method: "import",
        mandateNumber,
        iban: 'NL95BUNQ2025545371',
        bic: 'BUNQNL2A',
        email: faker.internet.email(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        address: faker.location.street(),
        city: faker.location.city(),
        zip: faker.location.zipCode(),
        l: 'nl',
        country: 'BE',
    });
    return mandateNumber;
};

// ---------------------------------------------------------------------------
// Transaction extended
// ---------------------------------------------------------------------------

describe('Transaction extended', { skip: noApiConfigured }, async () => {

    const client = getClient();

    test('authorise creates a reservation transaction', async () => {
        const mndtId = await importedMandate(client, 'AUTH-');
        const tx = await client.transaction.authorise({
            mndtId,
            message: 'Authorise test',
            amount: 100,
        });
        assert.ok(tx, 'no transaction returned');
        assert.ok(tx.id, 'transaction missing id');
    });

    test('query returns transactions from a given id', async () => {
        const result = await client.transaction.query({ fromId: '0' });
        assert.ok(result, 'no result returned');
    });

    test('bulkCreate then bulkStatus round-trip', async () => {
        const mndtId = process.env.MNDTNUMBER!;
        const bulk = await client.transaction.bulkCreate([
            { mndtId, message: 'Bulk test', amount: 50 }
        ]);
        assert.ok(bulk, 'no bulk response');
        assert.ok(bulk.batchId, 'bulk response missing batchId');

        const entries = await client.transaction.bulkStatus(bulk.batchId);
        assert.ok(Array.isArray(entries), 'expected entries array');
        assert.ok(entries.length > 0, 'empty entries');
        assert.ok(entries[0].status, 'entry missing status');
    });

    test('create then remove a transaction', async () => {
        const mndtId = await importedMandate(client, 'DEL-');
        const tx = await client.transaction.create({
            mndtId,
            message: 'To be deleted',
            amount: 75,
        });
        assert.ok(tx.id, 'transaction missing id');
        await client.transaction.remove({ id: tx.id });
    });
});

// ---------------------------------------------------------------------------
// Paylink extended
// ---------------------------------------------------------------------------

describe('Paylink extended', { skip: noApiConfigured }, async () => {

    const client = getClient();

    test('detail returns the created paylink', async () => {
        const link = await client.paylink.create({
            ct: CT(),
            ref: faker.git.commitSha({ length: 8 }),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            message: faker.commerce.productName() + ' ' + Date.now(),
            amount: Number(faker.commerce.price({ min: 1, max: 500 }))
        });
        assert.ok(link.id, 'paylink missing id');

        const detail = await client.paylink.detail(link.id);
        assert.ok(detail, 'no detail returned');
        assert.strictEqual(detail.id, link.id, 'detail id mismatch');
    });

    test('detail with includeRefunds flag', async () => {
        const link = await client.paylink.create({
            ct: CT(),
            ref: faker.git.commitSha({ length: 8 }),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            message: faker.commerce.productName() + ' ' + Date.now(),
            amount: Number(faker.commerce.price({ min: 1, max: 500 }))
        });
        const detail = await client.paylink.detail(link.id, true);
        assert.ok(detail, 'no detail returned');
    });
});

// ---------------------------------------------------------------------------
// Invoice extended
// ---------------------------------------------------------------------------

describe('Invoice extended', { skip: noApiConfigured }, async () => {

    const client = getClient();

    const makeInvoice = () => {
        const today = new Date().toISOString().split('T')[0];
        return client.invoice.create({
            number: 'INV-EXT-' + Date.now(),
            amount: 200,
            date: today,
            duedate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
            customer: {
                l: 'nl',
                email: faker.internet.email(),
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                address: faker.location.street(),
                city: faker.location.city(),
                zip: faker.location.zipCode(),
                country: faker.location.countryCode(),
                companyName: faker.company.name(),
            }
        });
    };

    test('qr returns a qr response', async () => {
        const invoice = await makeInvoice();
        const qr = await client.invoice.qr(invoice.id);
        assert.ok(qr, 'no qr response');
    });

    test('bulkCreate then bulkStatus round-trip', async () => {
        const today = new Date().toISOString().split('T')[0];
        const due = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0];
        const bulk = await client.invoice.bulkCreate([{
            number: 'BULK-' + Date.now(),
            amount: 300,
            date: today,
            duedate: due,
            customer: {
                l: 'nl',
                email: faker.internet.email(),
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                address: faker.location.street(),
                city: faker.location.city(),
                zip: faker.location.zipCode(),
                country: faker.location.countryCode(),
            }
        }]);
        assert.ok(bulk, 'no bulk response');
        assert.ok(bulk.batchId, 'bulk missing batchId');

        const entries = await client.invoice.bulkStatus(bulk.batchId);
        assert.ok(Array.isArray(entries), 'expected entries array');
        assert.ok(entries.length > 0, 'empty entries');
        assert.ok(entries[0].status, 'entry missing status');
    });
});

// ---------------------------------------------------------------------------
// Subscription lifecycle
// ---------------------------------------------------------------------------

describe('Subscription', { skip: noApiConfigured }, async () => {

    const client = getClient();

    test('full lifecycle: create -> detail -> update -> partialUpdate -> cancel', { skip: !process.env.SUBSCRIPTION_CT }, async () => {
        const mndtId = process.env.MNDTNUMBER;
        assert.ok(mndtId, 'MNDTNUMBER not defined');

        const ref = 'SUB-REF-' + faker.git.commitSha({ length: 6 });
        const subscription = await client.subscription.create({
            ct: Number(process.env.SUBSCRIPTION_CT!),
            mndtId,
            ref,
            amount: 99,
            message: 'Monthly test subscription',
            recurrencePeriod: 'monthly',
        });
        assert.ok(subscription, 'no subscription returned');
        assert.ok(subscription.mandateNumber || subscription.ref, 'subscription missing identifier');

        const mandateNumber = subscription.mandateNumber ?? mndtId;

        const detail = await client.subscription.detail(mandateNumber, ref);
        assert.ok(detail, 'no detail returned');

        await client.subscription.update(mandateNumber, ref, { amount: 149 });

        await client.subscription.partialUpdate(mandateNumber, ref, { message: 'Updated message' });

        await client.subscription.cancel(mandateNumber, ref);
    });

    test('query returns subscriptions', async () => {
        const results = await client.subscription.query({});
        assert.ok(Array.isArray(results) || results, 'no query results');
    });
});

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

describe('Reporting', { skip: noApiConfigured }, async () => {

    const client = getClient();

    test('feed returns without error', async () => {
        const result = await client.reporting.feed();
        assert.ok(result !== undefined, 'feed returned undefined');
    });

    test('getFiles returns without error', async () => {
        const files = await client.reporting.getFiles();
        assert.ok(Array.isArray(files) || files !== undefined, 'unexpected files response');
    });
});

// ---------------------------------------------------------------------------
// Customer login
// ---------------------------------------------------------------------------

describe('Customer', { skip: noApiConfigured }, async () => {

    const client = getClient();

    test('login returns a customer access url', async () => {
        const customerNumber = process.env.CUSTOMER_NUMBER;
        if (!customerNumber) {
            return; // skip if no customer configured
        }
        const result = await client.customer.login({ customerNumber });
        assert.ok(result, 'no result returned');
        assert.ok(result.url, 'login missing url');
    });
});
