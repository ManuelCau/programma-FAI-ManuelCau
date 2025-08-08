export type NotificationData = {
  title: string;
  message: string;
};

export type Notification = {
  data: NotificationData;
  id: number;
  readAt?: number;
  createdAt: number;
};

export type NotificationManagerConfig = {
  fetchUrl: string;
  updateUrl: string;
  createUrl: string;
};
export type SubscribeCallback = (notification: Notification) => void;

export interface NotificationManager {
  get: () => Promise<Notification[]>;
  send: (data: { title: string; message: string }) => Promise<Notification>;
  setRead: (id: number) => Promise<void>;
  subscribe: (callback: SubscribeCallback) => void;
  setConfig: (config: NotificationManagerConfig) => void;
  getConfig(): NotificationManagerConfig| null;
}
