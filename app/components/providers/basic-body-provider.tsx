interface BasicBodyProviderProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;}

const BasicBodyProvider: React.FC<BasicBodyProviderProps> = ({ header, footer, children }) => {
  return (
    <main className="flex flex-col min-h-screen justify-between flex-grow">
      {header}
        <div className="flex-1">{children}</div>
      {footer}
    </main>
  );
};
 
export default BasicBodyProvider;