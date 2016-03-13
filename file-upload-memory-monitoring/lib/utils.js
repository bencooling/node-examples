import bytes from 'bytes';

export default {
  logMemory() {
    const heapUsed = process.memoryUsage().heapUsed;
    return `Program is using ${bytes(heapUsed)}.`;
  },
};
