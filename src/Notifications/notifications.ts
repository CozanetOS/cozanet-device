import notifier from 'node-notifier';
import pino from 'pino';
import { NotificationPayload } from '../types';

const logger = pino({ name: 'notification-engine' });

export class NotificationEngine {
  public readonly id = 'device:notifications';

  /**
   * Sends a system notification using node-notifier.
   */
  public send(payload: NotificationPayload): void {
    logger.info({ payload }, 'Sending system notification');
    try {
      notifier.notify({
        title: payload.title,
        message: payload.message,
        icon: payload.icon,
        sound: true, // Play default sound
        wait: false, // Don't block execution waiting for user dismiss
      }, (err, response, metadata) => {
        if (err) {
          logger.error({ err }, 'Callback error from system notification');
        } else {
          logger.debug({ response, metadata }, 'System notification sent successfully');
        }
      });
    } catch (error) {
      logger.error({ error, payload }, 'Failed to send system notification');
    }
  }

  /**
   * Helper utility to quickly send formatted severities (info, warning, critical).
   */
  public sendAlert(message: string, severity: 'info' | 'warning' | 'critical'): void {
    const titleMap = {
      info: 'ℹ️ Device Info Alert',
      warning: '⚠️ Device Warning Alert',
      critical: '🚨 Device CRITICAL Alert',
    };

    this.send({
      title: titleMap[severity] || 'Device Alert',
      message,
    });
  }
}

export const notificationEngine = new NotificationEngine();
