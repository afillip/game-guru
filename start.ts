import DemoServer from './server';

// Start the server or run tests
if (process.argv[2] !== 'test') {
    let server = new DemoServer();
    server.start(3000);
} else {}