// Security utilities for Ghoulish messaging app

export interface EncryptedData {
  data: string;
  iv: string;
  timestamp: number;
}

export interface SecureContact {
  id: string;
  name: string;
  codeName: string;
  publicKey?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface SecureMessage {
  id: string;
  contactId: string;
  content: string;
  timestamp: Date;
  isIncoming: boolean;
  expiresAt: Date;
  isEncrypted: boolean;
}

// Simple encryption simulation (in production, use proper cryptography libraries)
export class GhoulishSecurity {
  private static instance: GhoulishSecurity;
  private encryptionKey: string;

  private constructor() {
    // In production, this would be derived from user authentication
    this.encryptionKey = this.generateSecureKey();
  }

  public static getInstance(): GhoulishSecurity {
    if (!GhoulishSecurity.instance) {
      GhoulishSecurity.instance = new GhoulishSecurity();
    }
    return GhoulishSecurity.instance;
  }

  private generateSecureKey(): string {
    return Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join('');
  }

  // Simple XOR encryption for demo (use proper encryption in production)
  public encrypt(data: string): EncryptedData {
    const iv = this.generateSecureKey().substring(0, 16);
    const encrypted = this.xorEncrypt(data, this.encryptionKey + iv);

    return {
      data: encrypted,
      iv,
      timestamp: Date.now()
    };
  }

  public decrypt(encryptedData: EncryptedData): string {
    return this.xorEncrypt(encryptedData.data, this.encryptionKey + encryptedData.iv);
  }

  private xorEncrypt(text: string, key: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(result); // Base64 encode
  }

  // Stealth mode detection
  public static detectAntiForensics(): boolean {
    // Check for debugging tools, screen recording, etc.
    // This is a simplified version - real implementation would be more sophisticated

    const isDebugging = () => {
      let start = new Date().getTime();
      debugger;
      let end = new Date().getTime();
      return end - start > 100;
    };

    return !isDebugging();
  }

  // Auto-deletion scheduler
  public scheduleMessageDeletion(messageId: string, expirationTime: Date): void {
    const timeUntilExpiry = expirationTime.getTime() - Date.now();

    if (timeUntilExpiry > 0) {
      setTimeout(() => {
        this.deleteMessage(messageId);
      }, timeUntilExpiry);
    }
  }

  private deleteMessage(messageId: string): void {
    // Remove from encrypted storage
    const storage = this.getSecureStorage();
    const messages = storage.getItem('ghoulish_messages');

    if (messages) {
      try {
        const parsed = JSON.parse(messages);
        const filtered = parsed.filter((msg: any) => msg.id !== messageId);
        storage.setItem('ghoulish_messages', JSON.stringify(filtered));
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  }

  // Secure storage wrapper
  public getSecureStorage(): Storage {
    // In production, this would use encrypted IndexedDB or similar
    return typeof window !== 'undefined' ? window.localStorage : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null
    } as Storage;
  }

  // Panic mode utilities
  public activatePanicMode(): void {
    const storage = this.getSecureStorage();
    storage.setItem('ghoulish_panic_mode', 'true');

    // Replace real conversations with fake ones
    this.replaceFakeConversations();
  }

  private replaceFakeConversations(): void {
    const fakeMessages = [
      {
        id: 'fake_1',
        contactId: '1',
        content: 'Can you send me the quarterly report?',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        isIncoming: true,
        expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
        isEncrypted: false
      },
      {
        id: 'fake_2',
        contactId: '1',
        content: 'I\'ll have it ready by end of day',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        isIncoming: false,
        expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
        isEncrypted: false
      }
    ];

    const storage = this.getSecureStorage();
    storage.setItem('ghoulish_messages', JSON.stringify(fakeMessages));
  }

  public deactivatePanicMode(): void {
    const storage = this.getSecureStorage();
    storage.removeItem('ghoulish_panic_mode');

    // Restore real conversations (in production, these would be retrieved from secure backup)
  }

  public isPanicModeActive(): boolean {
    const storage = this.getSecureStorage();
    return storage.getItem('ghoulish_panic_mode') === 'true';
  }

  // Access control
  public checkAccess(): boolean {
    const lastActivity = this.getSecureStorage().getItem('ghoulish_last_activity');
    const inactivityTimeout = 5 * 60 * 1000; // 5 minutes

    if (lastActivity) {
      const lastTime = parseInt(lastActivity);
      const now = Date.now();

      if (now - lastTime > inactivityTimeout) {
        return false;
      }
    }

    return true;
  }

  public updateLastActivity(): void {
    this.getSecureStorage().setItem('ghoulish_last_activity', Date.now().toString());
  }

  // Theme and customization
  public setCustomTheme(theme: 'dark' | 'darker' | 'ghoulish'): void {
    const storage = this.getSecureStorage();
    storage.setItem('ghoulish_theme', theme);
  }

  public getCustomTheme(): string {
    const storage = this.getSecureStorage();
    return storage.getItem('ghoulish_theme') || 'ghoulish';
  }

  // Contact management with aliases
  public addSecureContact(contact: SecureContact): void {
    const storage = this.getSecureStorage();
    const contacts = storage.getItem('ghoulish_contacts');

    let contactList: SecureContact[] = [];
    if (contacts) {
      try {
        contactList = JSON.parse(contacts);
      } catch (error) {
        console.error('Error parsing contacts:', error);
      }
    }

    contactList.push(contact);
    storage.setItem('ghoulish_contacts', JSON.stringify(contactList));
  }

  public getSecureContacts(): SecureContact[] {
    const storage = this.getSecureStorage();
    const contacts = storage.getItem('ghoulish_contacts');

    if (contacts) {
      try {
        return JSON.parse(contacts);
      } catch (error) {
        console.error('Error parsing contacts:', error);
      }
    }

    return [];
  }
}

// Export singleton instance
export const ghoulishSecurity = GhoulishSecurity.getInstance();