interface ExpensesLayoutProps {
  children: React.ReactNode;
}

export function ExpensesLayout({ children }: ExpensesLayoutProps) {
  return <div className='flex flex-col m-4 gap-4'>{children}</div>;
}
