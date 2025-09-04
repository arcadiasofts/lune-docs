import React, { useState } from 'react';

type Blog = {
  frontmatter: {
    title: string;
    pubDate: string | Date;
    author: string;
  };
  fileName: string;
};

type BlogsListProps = {
  blogs: Blog[];
  pageSize?: number;
};

export function BlogsList({ blogs, pageSize = 10 }: BlogsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalBlogs = blogs.length;
  const totalPages = Math.ceil(totalBlogs / pageSize);

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedBlogs = blogs.slice(startIdx, endIdx);

  const handlePageChange = (pageNum: number) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  return (
    <>
      <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-1 md:px-20">
        {paginatedBlogs.map(({ frontmatter, fileName }) => (
          <>
            <a href={`/blogs/${fileName}`}>
              <img
                src={`/blog/thumbnails/${fileName}.png`}
                alt={`blog-${fileName}-thumbnail`}
                className="rounded-md"
              />
              <div className="flex flex-col gap-2 py-6">
                <h3 className="text-lg font-bold">{frontmatter.title}</h3>
                <div className="text-sm text-gray-500">
                  {frontmatter.author} -{' '}
                  {frontmatter.pubDate
                    ? new Date(frontmatter.pubDate).toLocaleDateString()
                    : null}
                </div>
              </div>
            </a>
          </>
        ))}
      </div>
      {totalPages > 1 && (
        <nav className="mt-10 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded px-3 py-1 ${
              currentPage === 1
                ? 'pointer-events-none text-gray-400'
                : 'hover:bg-gray-100'
            }`}
          >
            이전
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`rounded px-3 py-1 ${
                  currentPage === pageNum
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded px-3 py-1 ${
              currentPage === totalPages
                ? 'pointer-events-none text-gray-400'
                : 'hover:bg-gray-100'
            }`}
          >
            다음
          </button>
        </nav>
      )}
    </>
  );
}
