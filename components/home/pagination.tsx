import Link from 'next/link';
import { useRouter } from 'next/router';

const Pagination = ({ pages }: any) => {
  const router = useRouter();
  const totalPage = [];
  for (let i = 0; i < parseInt(pages); i++) {
    totalPage.push(i + 1);
  }

  const goPage = (page: any) => {
    router.push(
      {
        pathname: `/${page}`,
        query: {
          userId: '1',
        },
      },
      `/${page}`
    );
  };
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {totalPage.map((page: any) => {
          return (
            <li className="page-item" key={page}>
              <a className="page-link" onClick={() => goPage(page)}>
                {page}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
      <style jsx>
        {`
          .page-item {
            cursor: pointer;
          }
        `}
      </style>
    </nav>
  );
};

export default Pagination;
