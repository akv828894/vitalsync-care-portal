function FullScreenLoader({ message = "Loading..." }) {
  return (
    <main className="loader-screen">
      <div className="loader-card">
        <span className="eyebrow">VitalSync</span>
        <div className="loader-dot" />
        <h1>Preparing your secure workspace</h1>
        <p>{message}</p>
      </div>
    </main>
  );
}

export default FullScreenLoader;
