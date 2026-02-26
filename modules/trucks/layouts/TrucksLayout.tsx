interface TrucksLayoutProps {
  children: React.ReactNode;
}

export function TrucksLayout({ children }: TrucksLayoutProps) {
  return <div className='flex flex-col m-4 gap-4'>{children}</div>;
}
