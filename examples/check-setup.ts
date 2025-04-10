import { TwikeyClient } from '../src';

function checkSetup() {
    const client = new TwikeyClient({
        apiKey: 'A770D5520F1FAF972BEEE9225264B6BA3AC6E3AB',
        environment: 'sandbox'
    });
    
    console.log('Client initialized with:');
    console.log('- Base URL:', client['client'].defaults.baseURL);
    console.log('- Headers:', client['client'].defaults.headers);
}

checkSetup(); 