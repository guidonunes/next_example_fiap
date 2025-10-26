'use client';

import { useEffect, useState } from "react";

export default function CSRPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      next: {
        revalidate: 10
      },
    }).then((res) => {
      return res.json();
    }).then((newData) => {
      setData(newData);
    });

  }, []);

  return (<div>
    <h1>
      CSR Example
    </h1>
    <ul>
      {data.map((post: any) => {
       return( <li key={post.id}>
        {post.title}
        </li>)
    })}
    </ul>
  </div>
  )

}
