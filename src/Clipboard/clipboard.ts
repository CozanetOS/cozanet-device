import pino from 'pino';

const logger = pino({ name: 'clipboard-manager' });

export class ClipboardManager {
  /**
   * Reads from system clipboard. (Placeholder stub)
   */
  public async readText(): Promise<string> {
    logger.info('Reading system clipboard text (Stub)');
    return 'Clipboard stub text';
  }

  /**
   * Writes text content to the system clipboard. (Placeholder stub)
   */
  public async writeText(text: string): Promise<boolean> {
    logger.info({ text }, 'Writing text to system clipboard (Stub)');
    return true;
  }
}

export const clipboardManager = new ClipboardManager();
