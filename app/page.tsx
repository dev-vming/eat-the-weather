import Link from 'next/link';

export default function Home() {
  return (
    <div>
      홈페이지
      <ul>
        <li>
          <Link href="/posts">게시판</Link>
        </li>
        <li>
          <Link href="/weather">weather</Link>
        </li>
        <li>
          <Link href="/login">login</Link>
        </li>
        <li>
          <Link href="/sign-up">weather</Link>
        </li>
        <li>
          <Link href="/my-page">my-page</Link>
        </li>
      </ul>
    </div>
  );
}
