// Tabs.jsx
import React from 'react';
import {
  Tabs as ShadcnTabs,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
  TabsContent as ShadcnTabsContent,
} from '@/components/ui/tabs';

const Tabs = {
  Root: ({ children, defaultValue, value, onValueChange, className }) => (
    <ShadcnTabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      {children}
    </ShadcnTabs>
  ),
  List: ({ children, className }) => (
    <ShadcnTabsList className={className}>{children}</ShadcnTabsList>
  ),
  Trigger: ({ children, value, className }) => (
    <ShadcnTabsTrigger value={value} className={className}>
      {children}
    </ShadcnTabsTrigger>
  ),
  Content: ({ children, value, className }) => (
    <ShadcnTabsContent value={value} className={className}>
      {children}
    </ShadcnTabsContent>
  ),
};

export default Tabs;