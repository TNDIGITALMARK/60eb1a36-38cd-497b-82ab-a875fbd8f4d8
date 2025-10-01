# GHOULISH - Stealth Messaging Application

**⚠️ CRITICAL: FOR EDUCATIONAL/DEMONSTRATION PURPOSES ONLY**

A comprehensive stealth SMS/MMS messaging application designed for complete privacy and invisibility. This application operates under the radar with multiple layers of security and stealth features.

## 🎯 Core Features

### 🔐 Multi-Layer Security
- **Secret Dialer Codes**: Primary access via `#0666#`, customizable user codes
- **Biometric Authentication**: Fingerprint/face recognition after dialer access
- **End-to-End Encryption**: All messages encrypted with custom security layer
- **Auto-Deletion**: Messages automatically deleted after 72 hours
- **Panic Codes**: `#911#`, `#555#` activate fake conversation mode

### 👻 Stealth Features
- **Complete Invisibility**: No presence in phone's app drawer or system lists
- **Fake Conversations**: Panic mode shows innocent work conversations
- **Anti-Forensics**: Detection of debugging tools and screen recording
- **5-Minute Lockout**: Temporary lockout for fraudulent access attempts
- **Auto-Lock**: Inactivity timeout for enhanced security

### 🎨 User Interface
- **Dark Purple Theme**: Following the design reference aesthetic
- **Minimal Design**: Security-focused, clean interface
- **Mobile-Responsive**: Optimized for smartphone usage
- **Custom Themes**: Multiple dark theme variations
- **Contact Aliases**: Code names and real names for contacts

## 🏗️ Application Architecture

### Page Structure
1. **Dialer Code Access Screen** (`/ghoulish`)
   - Secret code input via custom dialpad
   - Attempt tracking and lockout system
   - Panic code detection

2. **Biometric Authentication Gateway**
   - Simulated biometric scanning
   - Progress indicator and success/failure states
   - Fallback authentication options

3. **Main Messaging Interface**
   - Contact list with online status
   - Real-time messaging with auto-deletion timers
   - Settings panel with security configurations
   - Panic mode toggling

### 🛡️ Security Components

#### `GhoulishSecurity` Class
- Encryption/decryption utilities (XOR-based demo)
- Auto-deletion scheduling
- Panic mode management
- Anti-forensics detection
- Secure storage wrapper
- Access control and inactivity monitoring

#### Stealth Configuration
- Customizable panic codes
- Auto-deletion timing
- Theme selection
- Complete data wipe functionality
- Advanced security settings

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- Next.js 15.5.2
- Modern web browser with JavaScript enabled

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd ghoulish-messaging-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application
1. Navigate to `http://localhost:3006`
2. Automatically redirected to Ghoulish interface
3. Enter secret code `#0666#` to access
4. Complete biometric authentication
5. Access main messaging interface

## 🎮 Usage Guide

### Initial Access
1. **Secret Code Entry**: Use the custom dialpad to enter `#0666#`
2. **Biometric Auth**: Touch the scanning area to simulate fingerprint scan
3. **Main Interface**: Access contacts and messaging features

### Panic Mode Activation
- Enter panic codes `#911#` or `#555#` in the dialer
- Instantly switches to fake work conversations
- Shows innocent contact names and messages
- Maintains appearance of normal business communication

### Contact Management
- Add contacts with both real names and code names
- Online status tracking
- Search functionality for quick access
- Secure contact storage with encryption

### Message Features
- Real-time messaging with contacts
- Auto-deletion countdown visible on each message
- End-to-end encryption indicators
- Search through conversation history

### Security Settings
- Configure auto-deletion timing (1-168 hours)
- Add/remove custom panic codes
- Toggle stealth features on/off
- Complete data wipe functionality
- Theme customization options

## 🔧 Configuration Options

### Security Settings
```typescript
interface SecurityConfig {
  autoDelete: boolean;
  autoDeleteTime: number; // hours (1-168)
  panicCodes: string[];
  stealthMode: boolean;
  biometricAuth: boolean;
  screenRecordingDetection: boolean;
  autoLockTime: number; // minutes (1-60)
  customTheme: 'ghoulish' | 'dark' | 'darker';
}
```

### Default Secret Codes
- **Primary Access**: `#0666#`
- **Panic Codes**: `#911#`, `#555#`
- **Custom codes can be added through settings**

## 🎨 Theme System

### Ghoulish Theme (Default)
- **Background**: Deep dark gray (`220 13% 9%`)
- **Primary**: Bright purple (`260 95% 65%`)
- **Cards**: Slightly lighter dark (`220 13% 11%`)
- **Text**: Light gray (`220 9% 95%`)
- **Borders**: Medium dark (`220 13% 20%`)

### Additional Themes
- **Dark**: Standard dark theme
- **Darker**: Ultra-dark theme for maximum stealth

## ⚠️ Security Considerations

### What This Demo Includes
- ✅ Simulated biometric authentication
- ✅ Basic XOR encryption (demo purposes)
- ✅ Auto-deletion scheduling
- ✅ Panic mode with fake conversations
- ✅ Anti-debugging detection
- ✅ Stealth UI with minimal footprint

### Production Security Requirements
- 🔒 **Real Biometric APIs**: Integrate with device fingerprint/face ID
- 🔒 **AES-256 Encryption**: Replace XOR with proper cryptography
- 🔒 **Secure Key Management**: Hardware security modules
- 🔒 **Certificate Pinning**: Prevent man-in-the-middle attacks
- 🔒 **Obfuscated Code**: Code obfuscation for app binary
- 🔒 **Root/Jailbreak Detection**: Additional device security checks
- 🔒 **Secure Communication**: TLS with perfect forward secrecy

## 📱 Stealth Features

### Invisibility Measures
1. **No App Icon**: Application not visible in app drawer
2. **Secret Access**: Only accessible via dialer codes
3. **Disguised Title**: Shows as "System Diagnostics" in browser
4. **Process Hiding**: Minimal memory footprint
5. **Anti-Screenshot**: Prevents screen capture (production feature)

### Anti-Forensics
1. **Debugging Detection**: Identifies when dev tools are open
2. **Auto-Wipe**: Complete data deletion on security breach
3. **Fake Data**: Panic mode shows innocent conversations
4. **Memory Clearing**: Sensitive data cleared from memory
5. **Audit Trail Removal**: No logs or traces of real conversations

## 🛠️ Development Features

### Tech Stack
- **Frontend**: Next.js 15.5.2 with React 19
- **Styling**: Tailwind CSS with custom Ghoulish theme
- **Components**: Radix UI components
- **TypeScript**: Full type safety
- **Security**: Custom encryption and stealth utilities

### File Structure
```
src/
├── app/
│   ├── ghoulish/
│   │   └── page.tsx          # Main Ghoulish application
│   ├── layout.tsx            # Root layout with stealth metadata
│   ├── page.tsx              # Auto-redirect to Ghoulish
│   └── globals.css           # Ghoulish theme definitions
├── components/
│   ├── ghoulish/
│   │   ├── DialerScreen.tsx          # Secret code entry
│   │   ├── BiometricAuth.tsx         # Biometric authentication
│   │   ├── MainMessagingInterface.tsx # Main messaging UI
│   │   └── StealthConfig.tsx         # Security settings
│   └── ui/                   # Reusable UI components
└── lib/
    └── ghoulish/
        └── security.ts       # Security and encryption utilities
```

## 🔍 Testing Checklist

### Core Functionality
- [ ] Secret code entry works (`#0666#`)
- [ ] Panic codes activate fake mode (`#911#`, `#555#`)
- [ ] Failed attempts trigger lockout (3 attempts → 5 min lock)
- [ ] Biometric authentication simulation
- [ ] Message sending and receiving
- [ ] Auto-deletion countdown visible
- [ ] Contact management (add/search)
- [ ] Settings configuration
- [ ] Theme switching
- [ ] Data wipe functionality

### Security Features
- [ ] Auto-lock after inactivity
- [ ] Panic mode switches to fake conversations
- [ ] No traces in browser history (stealth)
- [ ] Encrypted message storage
- [ ] Security indicators visible
- [ ] Anti-debugging detection

## 📋 Future Enhancements

### Advanced Security
- Hardware-backed encryption
- Signal protocol implementation
- Disappearing messages with burn-after-reading
- Voice message encryption
- File attachment security
- Network traffic obfuscation

### Stealth Features
- GPS location spoofing integration
- VPN/Tor network routing
- Decoy app functionality
- Advanced anti-forensics
- Secure contact discovery
- Anonymous user registration

### User Experience
- Voice control for hands-free operation
- Advanced message scheduling
- Contact verification system
- Backup and restore with encryption
- Multi-device synchronization
- Customizable notification sounds

## ⚖️ Legal & Ethical Notice

**IMPORTANT**: This application is designed for educational and demonstration purposes. Users must comply with all applicable laws and regulations. The developers are not responsible for misuse of this software.

### Legitimate Use Cases
- Privacy education and awareness
- Security research and development
- Demonstration of encryption concepts
- Academic cybersecurity studies
- Personal privacy protection in legal contexts

### Prohibited Uses
- Circumventing legal surveillance when required by law
- Illegal communications or activities
- Corporate espionage or data theft
- Harassment or stalking
- Any activities violating local, state, or federal laws

## 🤝 Contributing

This is a demonstration project. For educational contributions:
1. Fork the repository
2. Create a feature branch
3. Add educational comments and documentation
4. Submit pull request with detailed explanation

## 📧 Support & Documentation

For technical questions about the implementation:
- Review the code comments and documentation
- Check the security utility implementations
- Examine the component architecture
- Understand the stealth design patterns

---

**Remember**: Always use technology responsibly and in compliance with applicable laws and regulations. This demonstration showcases advanced privacy concepts for educational purposes.