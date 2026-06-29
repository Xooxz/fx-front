interface Notification {
  avatar: string;
  title: string;
  subtitle: string;
}

export const notifications: Notification[] = [
  {
    avatar: "/images/profile/user-2.jpg",
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: "/images/profile/user-3.jpg",
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: "/images/profile/user-4.jpg",
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: "/images/profile/user-5.jpg",
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
  {
    avatar: "/images/profile/user-6.jpg",
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: "/images/profile/user-7.jpg",
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: "/images/profile/user-8.jpg",
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: "/images/profile/user-9.jpg",
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
];

interface Profile {
  href: string;
  title: string;
  subtitle: string;
  icon: string;
}

export const profile: Profile[] = [
  {
    href: "/apps/user-profile/profile",
    title: "My Profile",
    subtitle: "Account Settings",
    icon: "/images/menu/icon-account.svg",
  },
  {
    href: "/apps/email",
    title: "My Inbox",
    subtitle: "Messages & Emails",
    icon: "/images/menu/icon-inbox.svg",
  },
  {
    href: "/apps/kanban",
    title: "My Tasks",
    subtitle: "To-do and Daily Tasks",
    icon: "/images/menu/icon-tasks.svg",
  },
];
