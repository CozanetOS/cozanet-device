import si from 'systeminformation';
import pino from 'pino';
import { MountPoint } from '../types';

const logger = pino({ name: 'storage-engine' });

export class StorageEngine {
  /**
   * Retrieves available storage space across main mount point (in bytes).
   */
  public async getAvailable(): Promise<number> {
    try {
      const fsSize = await si.fsSize();
      const mainFs = fsSize[0];
      return mainFs ? mainFs.available : 0;
    } catch (error) {
      logger.error({ error }, 'Failed to retrieve available storage');
      throw error;
    }
  }

  /**
   * Retrieves total storage space across main mount point (in bytes).
   */
  public async getTotal(): Promise<number> {
    try {
      const fsSize = await si.fsSize();
      const mainFs = fsSize[0];
      return mainFs ? mainFs.size : 0;
    } catch (error) {
      logger.error({ error }, 'Failed to retrieve total storage');
      throw error;
    }
  }

  /**
   * Lists all available mount points with full disk statistics.
   */
  public async listMounts(): Promise<MountPoint[]> {
    try {
      const fsSize = await si.fsSize();
      return fsSize.map(fs => ({
        mount: fs.mount,
        type: fs.type,
        size: fs.size,
        used: fs.used,
        available: fs.available,
        usePercent: fs.use,
      }));
    } catch (error) {
      logger.error({ error }, 'Failed to list mount points');
      throw error;
    }
  }
}

export const storageEngine = new StorageEngine();
