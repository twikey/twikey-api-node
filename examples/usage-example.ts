import { TwikeyClient } from '../src';  // or '../src/client/TwikeyClient'

async function main() {
  const client = new TwikeyClient({
    apiKey: '487AC20678D5B2278494B358B4E04E0D0B4873BA',
    environment: 'sandbox'
  });

  try {
    // Using document service
    // const templates = await client.documents.getTemplates();
    // console.log('Templates:', templates);

    // Using invoice service
    const invoice = await client.invoices.create({
      number: 'INV-2024-001',
      amount: 9999
    });
    console.log('Invoice:', invoice);

    // Using transaction service
    const transaction = await client.transactions.create({
      mandate: 'MNDT123',
      amount: 5000
    });
    console.log('Transaction:', transaction);

  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error); 