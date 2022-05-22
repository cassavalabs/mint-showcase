import { createGlobalStyle } from "styled-components";
import "tippy.js/dist/tippy.css";

export const GlobalStyle = createGlobalStyle`

.nft-grid > div {
  position: relative;
  margin: auto;
}

.tippy-box .tippy-content {
  padding: 0rem;
}

.tippy-box[data-theme~="collection"] {
  background-color: ${({ theme }) => theme.bg600};
  color: ${({ theme }) => theme.text200};
  font-weight: 600;
  border-radius: 0.5rem;
  .tippy-content {
    max-width: 100%;
  }
  .tippy-arrow:before {
    border-top-color: ${({ theme }) => theme.bg600};
  }
}

.tippy-box[data-theme~="tooltip"] {
  background-color: ${({ theme }) => theme.bg600};
  color: ${({ theme }) => theme.text200};
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.5rem;
  .tippy-arrow:before {
    border-top-color: ${({ theme }) => theme.bg600};
  }
}

.tippy-box[data-theme~="facebook"] {
  padding: 0.9rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.facebook};
  color: ${({ theme }) => theme.white};
  .tippy-arrow:before {
    border-top-color: ${({ theme }) => theme.facebook};
  }
}

.tippy-box[data-theme~="twitter"] {
  padding: 0.9rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.twitter};
  color: ${({ theme }) => theme.white};
  .tippy-arrow:before {
    border-top-color: ${({ theme }) => theme.twitter};
  }
}

.tippy-box[data-theme~="instagram"] {
  padding: 0.9rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.instagram};
  color: ${({ theme }) => theme.white};
  .tippy-arrow:before {
    border-top-color: ${({ theme }) => theme.instagram};
  }
}

.tippy-box[data-theme~="discord"] {
  padding: 0.9rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.discord};
  color: ${({ theme }) => theme.white};
  .tippy-arrow:before {
    border-top-color: ${({ theme }) => theme.discord};
  }
}

.tippy-box[data-theme~="telegram"] {
  padding: 0.9rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.telegram};
  color: ${({ theme }) => theme.white};
  .tippy-arrow:before {
    border-top-color: ${({ theme }) => theme.telegram};
  }
}
.d-none {
  display: none !important;
}

#nprogress .spinner {
  display: none !important;
}

*, *::before, *::after{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

* {
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: transparent;
  }
  ::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
}

body {
  overflow-x: hidden;
}

html {
  min-height: 100vh;
  color: ${({ theme }) => theme.text200};
  background-color: ${({ theme }) => theme.bg200};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  ::-webkit-scrollbar {
    width: 5px;
    background: #636975;
}
}

`;
