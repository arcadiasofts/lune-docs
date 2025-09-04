import type React from 'react';

export default function WithUsItem({
  title,
  children,
  description,
  docs,
}: {
  title: string;
  children: React.ReactNode;
  description: string;
  docs: string;
}) {
  return (
    <div className="bg-sidebar flex flex-col justify-between gap-5 rounded-md p-5">
      <div className="flex w-full items-center justify-between gap-5">
        <h3 className="text-xl">{title}</h3>
        {children}
      </div>
      <div>
        <p className="break-keep">{description}</p>
      </div>
      <div className="w-full">
        <a
          href={docs}
          className="bg-accent block w-full rounded-md p-2 text-center"
        >
          문서
        </a>
      </div>
    </div>
  );
}
