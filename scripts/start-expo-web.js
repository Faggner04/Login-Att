const { spawn } = require('child_process');
const path = require('path');

process.env.EXPO_HOME = path.join(process.cwd(), '.expo-home');
process.env.EXPO_NO_TELEMETRY = '1';

const cli = path.join(process.cwd(), 'node_modules', 'expo', 'bin', 'cli');
const child = spawn(process.execPath, [cli, 'start', '--web', '--port', '8081'], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => process.exit(code ?? 0));
