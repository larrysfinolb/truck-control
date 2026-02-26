interface DriversLayoutProps {
  children: React.ReactNode;
}

export function DriversLayout({ children }: DriversLayoutProps) {
  return <div className='flex flex-col m-4 gap-4'>{children}</div>;
}
