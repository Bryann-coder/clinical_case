// app/learner/chat/layout.tsx
import { AuthProvider } from './AuthProvider';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}