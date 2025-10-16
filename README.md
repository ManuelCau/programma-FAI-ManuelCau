# Notification Manager Library

I developed this notification library as part of the **Incentivized Training Program** in collaboration with **VLK Studio**.

The goal was to implement a **Singleton design pattern**, ensuring that only one instance exists across the entire application.  
This single instance provides **global access** while keeping the internal logic **encapsulated and protected**.

Example usage with a React hook:

```ts
const manager = createNotificationManager();
