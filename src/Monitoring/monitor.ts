import si from 'systeminformation';
import pino from 'pino';
import { DeviceInfo, MemoryStats, DiskStats, SystemStats } from '../types';

const logger = pino({ name: 'device-monitor' });

export class DeviceMonitor {
  public readonly id = 'device:monitor';
  private watchers: Map<NodeJS.Timeout, boolean> = new Map();

  /**
   * Generates a fully populated DeviceInfo snapshot of the current host machine.
   */
  public async getSystemInfo(): Promise<DeviceInfo> {
    logger.info('Fetching overall system information');
    try {
      const osInfo = await si.osInfo();
      const cpu = await si.cpu();
      const mem = await si.mem();
      const fsSize = await si.fsSize();

      // Aggregate storage size
      let totalStorage = 0;
      let usedStorage = 0;
      let freeStorage = 0;

      fsSize.forEach(disk => {
        totalStorage += disk.size;
        usedStorage += disk.used;
        freeStorage += disk.available;
      });

      return {
        hostname: osInfo.hostname,
        os: `${osInfo.distro} ${osInfo.release}`,
        arch: osInfo.arch,
        cpu: {
          manufacturer: cpu.manufacturer,
          brand: cpu.brand,
          cores: cpu.cores,
          speed: cpu.speed,
        },
        memory: {
          total: mem.total,
          free: mem.free,
          used: mem.used,
        },
        storage: {
          total: totalStorage,
          used: usedStorage,
          free: freeStorage,
        },
      };
    } catch (error) {
      logger.error({ error }, 'Failed to fetch system info');
      throw error;
    }
  }

  /**
   * Retrieves CPU usage percentage.
   */
  public async getCPUUsage(): Promise<number> {
    try {
      const load = await si.currentLoad();
      return load.currentLoad;
    } catch (error) {
      logger.error({ error }, 'Failed to retrieve CPU load');
      throw error;
    }
  }

  /**
   * Retrieves full Memory statistics.
   */
  public async getMemoryUsage(): Promise<MemoryStats> {
    try {
      const mem = await si.mem();
      return {
        total: mem.total,
        free: mem.free,
        used: mem.used,
        active: mem.active,
        available: mem.available,
      };
    } catch (error) {
      logger.error({ error }, 'Failed to retrieve Memory usage');
      throw error;
    }
  }

  /**
   * Retrieves Primary Disk Storage statistics.
   */
  public async getDiskUsage(): Promise<DiskStats> {
    try {
      const fsSize = await si.fsSize();
      const primary = fsSize[0] || { size: 0, used: 0, available: 0, use: 0 };
      return {
        size: primary.size,
        used: primary.used,
        available: primary.available,
        usePercent: primary.use,
      };
    } catch (error) {
      logger.error({ error }, 'Failed to retrieve Disk usage');
      throw error;
    }
  }

  /**
   * Watches system metrics at a specified interval and fires a handler with current stats.
   */
  public watch(intervalMs: number, handler: (stats: SystemStats) => void): NodeJS.Timeout {
    logger.info({ intervalMs }, 'Starting system monitor watcher');
    
    const interval = setInterval(async () => {
      try {
        const [cpuUsage, memoryUsage, diskUsage] = await Promise.all([
          this.getCPUUsage(),
          this.getMemoryUsage(),
          this.getDiskUsage(),
        ]);

        handler({
          timestamp: new Date().toISOString(),
          cpuUsage,
          memoryUsage,
          diskUsage,
        });
      } catch (error) {
        logger.error({ error }, 'Error during monitor watch cycle');
      }
    }, intervalMs);

    this.watchers.set(interval, true);
    return interval;
  }

  /**
   * Stops an active system monitor watcher.
   */
  public unwatch(intervalId: NodeJS.Timeout): void {
    if (this.watchers.has(intervalId)) {
      clearInterval(intervalId);
      this.watchers.delete(intervalId);
      logger.info('Stopped system monitor watcher');
    }
  }
}

export const deviceMonitor = new DeviceMonitor();
