export default function Layout({ children }: any) {
  return (
    <>
      <div className="container">{children}</div>
      <style jsx>
        {`
          @media (min-width: 768px) {
            .container {
              max-width: 730px;
            }
          }
        `}
      </style>
    </>
  );
}
