"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MessageCircle,
  Send,
  Settings,
  LogOut,
  Ghost,
  Shield,
  Clock,
  Plus,
  Search,
  AlertTriangle,
  Eye,
  EyeOff

} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  codeName: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

interface Message {
  id: string;
  contactId: string;
  content: string;
  timestamp: Date;
  isIncoming: boolean;
  expiresAt: Date;
}

interface MainMessagingInterfaceProps {
  isPanicMode: boolean;
  onLogout: () => void;
}

export function MainMessagingInterface({ isPanicMode, onLogout }: MainMessagingInterfaceProps) {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);

  // Mock data - in real app, this would come from encrypted storage
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: isPanicMode ? "Work Group" : "Shadow",
      codeName: isPanicMode ? "Team Lead" : "Agent_X",
      isOnline: true,
      avatar: undefined
    },
    {
      id: "2",
      name: isPanicMode ? "Project Manager" : "Raven",
      codeName: isPanicMode ? "Sarah M." : "Dark_Wing",
      isOnline: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      avatar: undefined
    },
    {
      id: "3",
      name: isPanicMode ? "IT Support" : "Cipher",
      codeName: isPanicMode ? "Tech Team" : "Code_Breaker",
      isOnline: true,
      avatar: undefined
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      contactId: "1",
      content: isPanicMode ? "How's the project going?" : "Package delivered to drop point Alpha",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isIncoming: true,
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000)
    },
    {
      id: "2",
      contactId: "1",
      content: isPanicMode ? "Almost done with the quarterly report" : "Confirmed. Moving to next phase.",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      isIncoming: false,
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000)
    }
  ]);

  // Auto-delete messages after 72 hours
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => prev.filter(msg => msg.expiresAt > new Date()));
    }, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      contactId: selectedContact,
      content: messageInput,
      timestamp: new Date(),
      isIncoming: false,
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000)
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput("");
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.codeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedContactData = contacts.find(c => c.id === selectedContact);
  const contactMessages = messages.filter(m => m.contactId === selectedContact);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeUntilExpiry = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleConfigurePanicMode = () => {
    alert('Panic mode configuration panel would open here. This would allow users to set custom panic codes and emergency contacts.');
  };

  const handleThemeToggle = () => {
    alert('Theme toggle functionality would be implemented here. This would switch between dark and light themes.');
  };

  const handleAddContact = () => {
    const contactName = prompt('Enter contact name or code name:');
    if (contactName && contactName.trim()) {
      alert(`Contact "${contactName}" would be added to your encrypted contact list. In a real implementation, this would involve secure key exchange.`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-screen flex flex-col">
      {/* Header */}
      <Card className="rounded-none border-l-0 border-r-0 border-t-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ghost className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-lg">GHOULISH</CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  {isPanicMode && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Panic Mode
                    </Badge>
                  )}
                  <Shield className="h-3 w-3" />
                  End-to-End Encrypted
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sheet open={showSettings} onOpenChange={setShowSettings}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>
                      Configure your Ghoulish security settings
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-delete messages</span>
                      <Badge variant="secondary">72 hours</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Panic mode codes</span>
                      <Button variant="outline" size="sm" onClick={handleConfigurePanicMode}>Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Theme</span>
                      <Button variant="outline" size="sm" onClick={handleThemeToggle}>Dark</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-1 overflow-hidden">
        {/* Contacts List */}
        <Card className="w-80 rounded-none border-r border-l-0 border-t-0 border-b-0 flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full">
              <div className="space-y-1 p-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedContact === contact.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedContact(contact.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.codeName.slice(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {isPanicMode ? contact.name : contact.codeName}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.isOnline ? "Online" : `Last seen ${contact.lastSeen?.toLocaleTimeString()}`}
                      </p>
                    </div>

                    {contact.isOnline && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  size="sm"
                  onClick={handleAddContact}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Messages Area */}
        <Card className="flex-1 rounded-none border-0 flex flex-col">
          {selectedContactData ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{selectedContactData.codeName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {isPanicMode ? selectedContactData.name : selectedContactData.codeName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        Messages auto-delete in 72h
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {contactMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isIncoming ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isIncoming
                              ? "bg-muted text-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-1 gap-2">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            <span className="text-xs opacity-70">
                              🔥 {getTimeUntilExpiry(message.expiresAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                <p>Select a contact to start messaging</p>
                <p className="text-sm">All messages are end-to-end encrypted</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}