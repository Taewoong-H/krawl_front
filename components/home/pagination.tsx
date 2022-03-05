import Link from 'next/link';

const Pagination = ({ pages }: any) => {
  const totalPage = [];
  for (let i = 0; i < parseInt(pages); i++) {
    totalPage.push(i + 1);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {totalPage.map((page: any) => {
          const pageLink = `/${String(page)}`;
          return (
            <li className="page-item" key={page}>
              <Link href={pageLink}>
                <a className="page-link">{page}</a>
              </Link>
            </li>
          );
        })}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
