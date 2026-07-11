export interface DeviceInfo {
  id?: string;
  hostname: string;
  os: string;
  arch: string;
  cpu: {
    manufacturer: string;
    brand: string;
    cores: number;
    speed: number;
  };
  memory: {
    total: number;
    free: number;
    used: number;
  };
  storage: {
    total: number;
    free: number;
    used: number;
  };
}

export interface NotificationPayload {
  title: string;
  message: string;
  icon?: string;
}

export interface MemoryStats {
  total: number;
  free: number;
  used: number;
  active: number;
  available: number;
}

export interface DiskStats {
  size: number;
  used: number;
  available: number;
  usePercent: number;
}

export interface MountPoint {
  mount: string;
  type: string;
  size: number;
  used: number;
  available: number;
  usePercent: number;
}

export interface SystemStats {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: MemoryStats;
  diskUsage: DiskStats;
}
