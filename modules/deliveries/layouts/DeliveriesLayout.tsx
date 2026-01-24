interface DeliveriesLayoutProps {
  children: React.ReactNode;
}

export function DeliveriesLayout({ children }: DeliveriesLayoutProps) {
  return <div className='flex flex-col m-4 gap-4'>{children}</div>;
}
