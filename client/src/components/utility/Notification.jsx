import { notification } from "antd";
import React, { createContext, useContext } from "react";
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type,param,task) => {
    api[type]({
      message: param,
      description: 
        `${param} ${task} successfully`,
    });
  };

  const value = {
    openNotification: openNotificationWithIcon,
  };

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
