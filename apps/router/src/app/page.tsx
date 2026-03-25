export default function Home() {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: 600,
        margin: "80px auto",
        padding: "0 20px",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "1.5rem" }}>next-test-goit.goit.global</h1>
      <p>Available landings:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "12px 0" }}>
          <a
            href="/landing-a"
            style={{ color: "#0070f3", textDecoration: "none", fontSize: "1.1rem" }}
          >
            Landing A
          </a>
        </li>
        <li style={{ margin: "12px 0" }}>
          <a
            href="/landing-b"
            style={{ color: "#0070f3", textDecoration: "none", fontSize: "1.1rem" }}
          >
            Landing B
          </a>
        </li>
      </ul>
    </div>
  );
}
