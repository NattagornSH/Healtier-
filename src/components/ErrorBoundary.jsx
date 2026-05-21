import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            margin: "2rem",
            border: "2px solid #fc8181",
            borderRadius: "8px",
            background: "#fff5f5",
          }}
        >
          <h2 style={{ color: "#c53030", marginTop: 0 }}>เกิดข้อผิดพลาด</h2>
          <details style={{ whiteSpace: "pre-wrap", color: "#742a2a" }}>
            <summary>รายละเอียด Error</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "#c53030",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            รีโหลดหน้า
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
