/// <reference types="vite/client" />

interface PendoAgentMetadata {
  agentId: string;
  conversationId: string;
  messageId: string;
  content: string;
  modelUsed?: string;
  suggestedPrompt?: boolean;
  toolsUsed?: string[];
  fileUploaded?: boolean;
}

interface Window {
  pendo?: {
    trackAgent: (eventType: "prompt" | "agent_response" | "user_reaction", metadata: PendoAgentMetadata) => void;
  };
}
