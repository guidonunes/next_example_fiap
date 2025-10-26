export default async function SSRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  const posts = await res.json();
  return (<div>
    <h1>
      SSG Example
    </h1>
    <ul>
      {posts.map((post: any) => {
       return( <li key={post.id}>
        {post.title}
        </li>)
    })}
    </ul>
  </div>
  )

}
