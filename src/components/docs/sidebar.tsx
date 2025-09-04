import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

interface ProcessedDoc {
  id: string;
  collection: 'docs';
  data: {
    title: string;
    category: string;
    product: string;
    lastUpdate: Date;
    order?: number;
  };
  filePath: string;
}

type Sidebar = Record<string, Record<string, ProcessedDoc[]>>;
export default function DocsSidebar({ sidebar }: { sidebar: Sidebar }) {
  const [currentProduct, setCurrentProduct] = useState<keyof Sidebar>('');
  useEffect(() => {
    const pathProduct = window.location.pathname.split('/')[2];
    if (pathProduct) {
      const normalizedPath = pathProduct.toLowerCase().replace(/-/g, ' ');
      const matchingProduct = Object.keys(sidebar).find(
        product => product.toLowerCase() === normalizedPath
      );
      if (matchingProduct) {
        setCurrentProduct(matchingProduct);
      } else {
        setCurrentProduct(Object.keys(sidebar).sort()[0]);
      }
    } else {
      setCurrentProduct(Object.keys(sidebar).sort()[0]);
    }
  }, []);

  return (
    <>
      <p className="mb-3 text-sm text-gray-500">제품 선택</p>
      <Select
        value={currentProduct}
        onValueChange={e => {
          setCurrentProduct(e);
        }}
      >
        <SelectTrigger className="mb-5 w-full cursor-pointer">
          <SelectValue
            className="cursor-pointer"
            placeholder="문서를 볼 제품을 선택하세요"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.keys(sidebar).map((product, i) => (
              <SelectItem className="cursor-pointer" value={product} key={i}>
                {product}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ul className="space-y-6">
        {Object.entries(sidebar).map(([product, categories]) => {
          if (product !== currentProduct) return;
          return (
            <li>
              <ul className="space-y-2">
                {Object.entries(categories)
                  .sort(([a], [b]) => {
                    if (a === '_noCategory') return -1;
                    if (b === '_noCategory') return 1;

                    // 카테고리 순서 정의
                    const categoryOrder = [
                      'Getting Started',
                      'Application',
                      'Router',
                      'Event',
                      'Types',
                    ];
                    const indexA = categoryOrder.indexOf(a);
                    const indexB = categoryOrder.indexOf(b);

                    if (indexA !== -1 && indexB !== -1) {
                      return indexA - indexB;
                    }
                    if (indexA !== -1) return -1;
                    if (indexB !== -1) return 1;

                    return a.localeCompare(b);
                  })
                  .map(([category, docs]) => (
                    <li>
                      {category !== '_noCategory' && (
                        <h4 className="my-3 text-sm text-gray-500">
                          {category}
                        </h4>
                      )}
                      <ul>
                        {docs
                          .sort((a, b) => {
                            // order 필드가 있으면 우선 정렬
                            const orderA = a.data.order ?? 999;
                            const orderB = b.data.order ?? 999;
                            if (orderA !== orderB) {
                              return orderA - orderB;
                            }
                            // order가 같거나 없으면 제목으로 정렬
                            return a.data.title.localeCompare(b.data.title);
                          })
                          .map(doc => (
                            <li className="w-full">
                              <a
                                href={`/docs/${doc.filePath}`}
                                className="hover:bg-card block w-full space-y-1 rounded-md px-3 py-2 text-sm"
                              >
                                {doc.data.title}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}
