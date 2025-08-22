export type NotificationData = {
  title: string;
  message: string;
};

export type SendPayload = NotificationData & { channels?: string[] };

export type Notification = {
  data: NotificationData;
  id: number;
  readAt?: number;
  createdAt: number;
  channels?: string[];
};

export type NotificationManagerConfig = {
  fetchUrl: string;
  updateUrl: string;
  createUrl: string;
  channels?: {
    [k: string]: string;
  };
};
export type SubscribeCallback = (notification: Notification) => void;

export interface NotificationManager {
  get: () => Promise<Notification[]>;
  send: (data: SendPayload) => Promise<Notification>;
  setRead: (id: number) => Promise<void>;
  subscribe: (callback: SubscribeCallback) => () => void;
  setConfig: (config: NotificationManagerConfig) => void;
  getConfig(): NotificationManagerConfig | null;
}
