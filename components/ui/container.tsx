interface ContaienrProps {
  children: React.ReactNode;
}

const Container: React.FC<ContaienrProps> = ({ children }) => {
  return <div className='mx-auto max-w-7xl'>{children}</div>;
};

export default Container;
