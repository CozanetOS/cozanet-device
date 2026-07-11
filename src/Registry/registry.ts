import pino from 'pino';
import { v4 as uuidv4 } from 'uuid';
import { DeviceInfo } from '../types';

const logger = pino({ name: 'device-registry' });

export class DeviceRegistry {
  public readonly id = 'device:registry';
  private devices: Map<string, DeviceInfo> = new Map();

  /**
   * Registers a new device. Returns its generated/assigned unique ID.
   */
  public register(device: DeviceInfo): string {
    const deviceId = device.id || uuidv4();
    const registeredDevice = { ...device, id: deviceId };
    
    this.devices.set(deviceId, registeredDevice);
    logger.info({ deviceId, hostname: device.hostname }, 'Registered device successfully');
    
    return deviceId;
  }

  /**
   * Fetches registered device information by ID.
   */
  public getDevice(id: string): DeviceInfo | null {
    return this.devices.get(id) || null;
  }

  /**
   * Lists all registered devices in the registry.
   */
  public listDevices(): DeviceInfo[] {
    return Array.from(this.devices.values());
  }
}

export const deviceRegistry = new DeviceRegistry();
